import { useContext, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { ThemeContext } from '@/context';
import { cn } from '@/lib/utils';

interface GradientOrb {
  className: string;
  duration: number;
  delay: number;
  mouseFactor: number;
  scrollFactor: number;
  animate: {
    x: number[];
    y: number[];
    scale: number[];
  };
}

const darkOrbs: GradientOrb[] = [
  {
    animate: { scale: [1, 1.08, 0.96, 1], x: [0, 48, -24, 0], y: [0, -32, 24, 0] },
    className: 'left-[-14%] top-[-10%] size-[540px] bg-violet-500/18',
    delay: 0,
    duration: 22,
    mouseFactor: 1.2,
    scrollFactor: 0.8,
  },
  {
    animate: { scale: [1, 0.94, 1.06, 1], x: [0, -40, 28, 0], y: [0, 44, -20, 0] },
    className: 'right-[-12%] top-[14%] size-[480px] bg-sky-500/16',
    delay: 2,
    duration: 26,
    mouseFactor: 0.9,
    scrollFactor: 1.1,
  },
  {
    animate: { scale: [1, 1.05, 0.97, 1], x: [0, 32, -40, 0], y: [0, -24, 36, 0] },
    className: 'bottom-[-16%] left-[18%] size-[560px] bg-indigo-500/17',
    delay: 4,
    duration: 24,
    mouseFactor: 1.4,
    scrollFactor: 1.3,
  },
  {
    animate: { scale: [1, 0.98, 1.04, 1], x: [0, -28, 20, 0], y: [0, 28, -32, 0] },
    className: 'bottom-[6%] right-[12%] size-[400px] bg-fuchsia-500/14',
    delay: 1,
    duration: 20,
    mouseFactor: 0.7,
    scrollFactor: 0.9,
  },
  {
    animate: { scale: [1, 1.04, 0.98, 1], x: [0, 24, -18, 0], y: [0, -18, 22, 0] },
    className: 'left-[34%] top-[40%] size-[420px] bg-teal-400/12',
    delay: 3,
    duration: 28,
    mouseFactor: 1,
    scrollFactor: 1.2,
  },
];

const lightOrbs: GradientOrb[] = [
  {
    animate: { scale: [1, 1.06, 0.98, 1], x: [0, 40, -20, 0], y: [0, -28, 18, 0] },
    className: 'left-[-12%] top-[-8%] size-[520px] bg-violet-400/30',
    delay: 0,
    duration: 22,
    mouseFactor: 1.2,
    scrollFactor: 0.8,
  },
  {
    animate: { scale: [1, 0.96, 1.04, 1], x: [0, -32, 24, 0], y: [0, 36, -16, 0] },
    className: 'right-[-10%] top-[18%] size-[460px] bg-sky-400/28',
    delay: 2,
    duration: 26,
    mouseFactor: 0.9,
    scrollFactor: 1.1,
  },
  {
    animate: { scale: [1, 1.04, 0.97, 1], x: [0, 28, -36, 0], y: [0, -20, 32, 0] },
    className: 'bottom-[-14%] left-[20%] size-[540px] bg-indigo-300/26',
    delay: 4,
    duration: 24,
    mouseFactor: 1.4,
    scrollFactor: 1.3,
  },
  {
    animate: { scale: [1, 0.98, 1.03, 1], x: [0, -24, 16, 0], y: [0, 24, -28, 0] },
    className: 'bottom-[8%] right-[14%] size-[380px] bg-fuchsia-300/24',
    delay: 1,
    duration: 20,
    mouseFactor: 0.7,
    scrollFactor: 0.9,
  },
  {
    animate: { scale: [1, 1.03, 0.99, 1], x: [0, 18, -14, 0], y: [0, -14, 18, 0] },
    className: 'left-[32%] top-[42%] size-[400px] bg-teal-300/22',
    delay: 3,
    duration: 28,
    mouseFactor: 1,
    scrollFactor: 1.2,
  },
];

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  mouseFactor?: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollProgress: MotionValue<number>;
  scrollFactor?: number;
}

const ParallaxLayer = ({
  children,
  className,
  mouseFactor = 1,
  mouseX,
  mouseY,
  scrollFactor = 1,
  scrollProgress,
}: ParallaxLayerProps) => {
  const x = useTransform(mouseX, (value) => value * 42 * mouseFactor);
  const mouseYOffset = useTransform(mouseY, (value) => value * 30 * mouseFactor);
  const scrollYOffset = useTransform(scrollProgress, (value) => value * -140 * scrollFactor);
  const y = useTransform(
    [mouseYOffset, scrollYOffset],
    ([mouseYValue, scrollYValue]: number[]) => mouseYValue + scrollYValue,
  );

  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
};

const BackgroundGradient = () => {
  const theme = useContext(ThemeContext);
  const reduceMotion = useReducedMotion();
  const isDark = theme === 'dark';
  const orbs = isDark ? darkOrbs : lightOrbs;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const scrollProgress = useMotionValue(0);
  const springX = useSpring(pointerX, { damping: 28, stiffness: 120 });
  const springY = useSpring(pointerY, { damping: 28, stiffness: 120 });
  const springScroll = useSpring(scrollProgress, { damping: 32, stiffness: 90 });

  useEffect(() => {
    if (reduceMotion) {
      return undefined;
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / globalThis.innerWidth - 0.5) * 2);
      pointerY.set((event.clientY / globalThis.innerHeight - 0.5) * 2);
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - globalThis.innerHeight;
      scrollProgress.set(maxScroll > 0 ? globalThis.scrollY / maxScroll : 0);
    };

    handleScroll();
    globalThis.addEventListener('pointermove', handlePointerMove, { passive: true });
    globalThis.addEventListener('scroll', handleScroll, { passive: true });
    globalThis.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      globalThis.removeEventListener('pointermove', handlePointerMove);
      globalThis.removeEventListener('scroll', handleScroll);
      globalThis.removeEventListener('resize', handleScroll);
    };
  }, [pointerX, pointerY, reduceMotion, scrollProgress]);

  const conicX = useTransform(springX, (value) => value * 28);
  const conicMouseY = useTransform(springY, (value) => value * 20);
  const conicScrollY = useTransform(springScroll, (value) => value * -90);
  const conicY = useTransform(
    [conicMouseY, conicScrollY],
    ([mouseYValue, scrollYValue]: number[]) => mouseYValue + scrollYValue,
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div
        className={cn(
          'absolute inset-0',
          isDark
            ? 'bg-[linear-gradient(135deg,rgba(124,58,237,0.09)_0%,rgba(14,165,233,0.07)_42%,rgba(20,184,166,0.05)_72%,rgba(192,132,252,0.08)_100%)]'
            : 'bg-[linear-gradient(135deg,rgba(167,139,250,0.18)_0%,rgba(125,211,252,0.15)_42%,rgba(94,234,212,0.12)_72%,rgba(216,180,254,0.16)_100%)]',
        )}
      />
      <ParallaxLayer
        className="absolute inset-0"
        mouseFactor={0.5}
        mouseX={springX}
        mouseY={springY}
        scrollFactor={0.4}
        scrollProgress={springScroll}
      >
        <div
          className={cn(
            'absolute inset-0',
            isDark
              ? 'bg-[radial-gradient(ellipse_90%_60%_at_50%_-15%,rgba(139,92,246,0.14),transparent)]'
              : 'bg-[radial-gradient(ellipse_90%_60%_at_50%_-15%,rgba(129,140,248,0.22),transparent)]',
          )}
        />
      </ParallaxLayer>
      {!reduceMotion && (
        <motion.div className="absolute inset-[-40%]" style={{ x: conicX, y: conicY }}>
          <motion.div
            className={cn(
              'size-full opacity-30 blur-3xl',
              isDark
                ? 'bg-[conic-gradient(from_0deg,rgba(139,92,246,0.22),rgba(34,211,238,0.16),rgba(45,212,191,0.12),rgba(192,132,252,0.18),rgba(139,92,246,0.22))]'
                : 'bg-[conic-gradient(from_0deg,rgba(167,139,250,0.28),rgba(56,189,248,0.22),rgba(94,234,212,0.18),rgba(196,181,253,0.24),rgba(167,139,250,0.28))]',
            )}
            animate={{ rotate: 360 }}
            transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
          />
        </motion.div>
      )}
      {orbs.map((orb, index) => (
        <ParallaxLayer
          key={`${isDark ? 'dark' : 'light'}-${index}`}
          className="absolute inset-0"
          mouseFactor={orb.mouseFactor}
          mouseX={springX}
          mouseY={springY}
          scrollFactor={orb.scrollFactor}
          scrollProgress={springScroll}
        >
          <motion.div
            className={cn(
              'absolute rounded-full blur-3xl will-change-transform',
              isDark ? 'mix-blend-screen' : 'mix-blend-multiply',
              orb.className,
            )}
            initial={{ scale: 1, x: 0, y: 0 }}
            animate={reduceMotion ? { scale: 1, x: 0, y: 0 } : orb.animate}
            transition={
              reduceMotion
                ? undefined
                : {
                    delay: orb.delay,
                    duration: orb.duration,
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }
            }
          />
        </ParallaxLayer>
      ))}
      <div
        className={cn(
          'absolute inset-0',
          isDark
            ? 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,0.22)_100%)]'
            : 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(250,250,250,0.32)_100%)]',
        )}
      />
    </div>
  );
};

export default BackgroundGradient;
