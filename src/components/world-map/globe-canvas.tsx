import React, { useContext, useMemo, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import R3fGlobe from 'r3f-globe';
import { type RaycasterParameters } from 'three';
import {
  countryPropertiesFromPolygon,
  toCountryCode,
  toCountryName,
  type CountryFeature,
  type CountryProperties,
  type GlobePoint,
} from './utils';
import { ThemeContext } from '@/context';
import { glassSubtle } from '@/lib/glass';
import { cn } from '@/lib/utils';

interface GlobeCanvasProps {
  countryPolygons: CountryFeature[];
  visitedSet: Set<string>;
  points: GlobePoint[];
}

type HoverData =
  | { type: 'country'; properties: CountryProperties; code: string }
  | { type: 'point'; point: GlobePoint }
  | null;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object';

const parseHoveredPoint = (value: unknown): GlobePoint | null => {
  if (!isRecord(value)) {
    return null;
  }
  const { lat, lng, name, note } = value;
  if (typeof lat !== 'number' || typeof lng !== 'number' || typeof name !== 'string') {
    return null;
  }
  return {
    lat,
    lng,
    name,
    note: typeof note === 'string' ? note : '',
  };
};

const GLOBE_PALETTE = {
  default: 'rgba(56, 189, 248, 1)',
  sideDefault: 'rgba(56, 189, 248, 0.3)',
  sideHover: 'rgba(125, 211, 252, 0.5)',
  unvisited: 'rgba(198, 198, 198, 0.8)',
  unvisitedHover: 'rgba(225, 225, 225, 0.9)',
  visited: 'rgba(56, 189, 248, 1)',
  visitedHover: 'rgba(143, 221, 255, 0.9)',
};

const GlobeCanvas: React.FC<GlobeCanvasProps> = ({ countryPolygons, visitedSet, points }) => {
  const isDarkMode = useContext(ThemeContext) === 'dark';
  const [hoverData, setHoverData] = useState<HoverData>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const raycaster = useMemo(() => {
    const params: RaycasterParameters = {
      LOD: {},
      Line: { threshold: 1 },
      Mesh: {},
      Points: { threshold: 0.5 },
      Sprite: {},
    };
    return { params };
  }, []);

  const hoveredCountryCode = hoverData?.type === 'country' ? hoverData.code : '';

  const getPolygonColor = (polygon: object) => {
    const countryCode = toCountryCode(countryPropertiesFromPolygon(polygon));
    if (!countryCode) {
      return GLOBE_PALETTE.default;
    }
    const isVisited = visitedSet.has(countryCode);
    if (countryCode === hoveredCountryCode) {
      return isVisited ? GLOBE_PALETTE.visitedHover : GLOBE_PALETTE.unvisitedHover;
    }
    return isVisited ? GLOBE_PALETTE.visited : GLOBE_PALETTE.unvisited;
  };

  const getPolygonAltitude = (polygon: object) => {
    const countryCode = toCountryCode(countryPropertiesFromPolygon(polygon));
    if (!countryCode) {
      return 0.006;
    }
    if (countryCode === hoveredCountryCode) {
      return visitedSet.has(countryCode) ? 0.028 : 0.016;
    }
    return visitedSet.has(countryCode) ? 0.02 : 0.008;
  };

  const handleGlobeHover = (layer: string | undefined, data: unknown) => {
    if ((layer === 'polygon' || layer === 'polygons') && data && typeof data === 'object') {
      const countryProperties = countryPropertiesFromPolygon(data);
      const countryCode = toCountryCode(countryProperties);
      if (!countryProperties) {
        setHoverData(null);
        return;
      }
      setHoverData({
        code: countryCode,
        properties: countryProperties,
        type: 'country',
      });
      return;
    }
    if ((layer === 'point' || layer === 'points') && data && typeof data === 'object') {
      const point = parseHoveredPoint(data);
      setHoverData(point ? { point, type: 'point' } : null);
      return;
    }
    setHoverData(null);
  };

  return (
    <div
      className={cn(glassSubtle, 'relative h-[520px] w-full overflow-hidden rounded-2xl')}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setMouse({ x: event.clientX - rect.left, y: event.clientY - rect.top });
      }}
    >
      <Canvas camera={{ fov: 45, position: [0, 0, 300] }} raycaster={raycaster}>
        <ambientLight intensity={0.9} />
        <directionalLight intensity={1.2} position={[180, 140, 160]} />

        <R3fGlobe
          globeImageUrl={
            isDarkMode
              ? '//unpkg.com/three-globe/example/img/earth-night.jpg'
              : '//unpkg.com/three-globe/example/img/earth-day.jpg'
          }
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          polygonsData={countryPolygons}
          polygonCapColor={getPolygonColor}
          polygonAltitude={getPolygonAltitude}
          polygonSideColor={(polygon: object) =>
            toCountryCode(countryPropertiesFromPolygon(polygon)) === hoveredCountryCode
              ? GLOBE_PALETTE.sideHover
              : GLOBE_PALETTE.sideDefault
          }
          polygonsTransitionDuration={180}
          onHover={handleGlobeHover}
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointColor={() => GLOBE_PALETTE.default}
          pointAltitude={0.025}
          pointRadius={0.25}
          pointResolution={12}
        />

        <OrbitControls enablePan={false} minDistance={140} maxDistance={420} />
      </Canvas>

      {hoverData && (
        <div
          className="pointer-events-none absolute z-[9999] whitespace-nowrap rounded-lg border border-border/80 bg-slate-900/90 p-2 text-[13px] leading-relaxed text-white shadow-lg"
          style={{ left: `${mouse.x + 12}px`, top: `${mouse.y + 12}px` }}
        >
          <div className="font-medium">
            {hoverData.type === 'country'
              ? toCountryName(hoverData.properties) || hoverData.code || ''
              : hoverData.point.name}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeCanvas;
