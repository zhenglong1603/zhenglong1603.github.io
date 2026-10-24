import { type VisitedEntry } from '@/services/api';

export const WORLD_GEOJSON_URL =
  'https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@master/geojson/ne_110m_admin_0_countries.geojson';

export interface CountryProperties {
  ISO_A2?: string;
  ISO_A2_EH?: string;
  ADMIN?: string;
  NAME?: string;
  NAME_EN?: string;
  CONTINENT?: string;
  [key: string]: unknown;
}

export interface CountryFeature {
  type: 'Feature';
  properties: CountryProperties;
  geometry: {
    type: string;
    coordinates: unknown;
  };
}

interface CountryFeatureCollection {
  features: CountryFeature[];
}

export interface GlobePoint {
  lat: number;
  lng: number;
  name: string;
  note: string;
}

const isCountryProperties = (value: unknown): value is CountryProperties =>
  Boolean(value) && typeof value === 'object';

export const toCountryCode = (properties?: CountryProperties): string => {
  if (!properties) {
    return '';
  }
  const primaryCode = properties.ISO_A2?.toUpperCase();
  if (primaryCode && primaryCode !== '-99') {
    if (primaryCode.length === 2) {
      return primaryCode;
    }
    // Some datasets use compound forms like CN-TW.
    const compoundSuffix = primaryCode.split('-').at(-1);
    if (compoundSuffix && compoundSuffix.length === 2) {
      return compoundSuffix;
    }
  }
  return properties.ISO_A2_EH?.toUpperCase() ?? '';
};

export const toCountryName = (properties?: CountryProperties): string =>
  properties ? (properties.ADMIN ?? properties.NAME_EN ?? properties.NAME ?? '') : '';

export const countryPropertiesFromPolygon = (polygon: object): CountryProperties | undefined => {
  if (!('properties' in polygon)) {
    return undefined;
  }
  const { properties } = polygon as { properties?: unknown };
  return isCountryProperties(properties) ? properties : undefined;
};

const isCountryFeatureCollection = (value: unknown): value is CountryFeatureCollection => {
  if (!value || typeof value !== 'object' || !('features' in value)) {
    return false;
  }
  const candidate = value as { features?: unknown };
  return Array.isArray(candidate.features);
};

export const fetchWorldPolygons = async (): Promise<CountryFeature[]> => {
  const response = await fetch(WORLD_GEOJSON_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch world polygons: ${response.statusText}`);
  }
  const data: unknown = await response.json();
  if (!isCountryFeatureCollection(data)) {
    throw new Error('World polygons response is invalid');
  }
  return data.features;
};

export const buildVisitedSet = (visited: VisitedEntry[]) =>
  new Set(visited.map((item) => item.code.toUpperCase()));

export const markersToPoints = (visited: VisitedEntry[]): GlobePoint[] =>
  visited
    .filter(
      (
        item,
      ): item is VisitedEntry & {
        marker: { latLng: [number, number]; name: string };
      } => Boolean(item.marker),
    )
    .map((item) => ({
      lat: item.marker.latLng[0],
      lng: item.marker.latLng[1],
      name: item.marker.name,
      note: '',
    }));

export const buildContinentByCode = (countryPolygons: CountryFeature[]): Record<string, string> => {
  const map: Record<string, string> = {};
  countryPolygons.forEach((feature) => {
    const code = toCountryCode(feature.properties);
    const continent = feature.properties.CONTINENT;
    if (code && typeof continent === 'string' && continent.length > 0) {
      map[code] = continent;
    }
  });
  return map;
};

export const countVisitedContinents = (
  visitedSet: Set<string>,
  continentByCode: Record<string, string>,
): number => {
  const continents = new Set<string>();
  visitedSet.forEach((countryCode) => {
    const continent = continentByCode[countryCode];
    if (continent) {
      continents.add(continent);
    }
  });
  return continents.size;
};
