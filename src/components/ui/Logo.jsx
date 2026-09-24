import { m } from 'framer-motion';

const sizes = {
  sm: 'h-7 w-7 sm2:h-8 sm2:w-8',
  md: 'h-8 w-8 sm2:h-10 sm2:w-10 md:h-12 md:w-12',
  lg: 'h-11 w-11 sm2:h-14 sm2:w-14 md:h-16 md:w-16',
  xl: 'h-14 w-14 sm2:h-20 sm2:w-20 md:h-24 md:w-24',
  loader: 'h-20 w-20 sm2:h-28 sm2:w-28 md:h-36 md:w-36',
};

// SVG Path and Shape variants for staggered drawing/blooming animation
const drawVariant = (delay = 0, duration = 1.2) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration, ease: [0.22, 1, 0.36, 1] },
      opacity: { delay, duration: 0.2 }
    }
  }
});

const fadeVariant = (delay = 0, duration = 0.8) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay, duration, ease: 'easeOut' }
  }
});

const bloomVariant = (delay = 0.8, duration = 1.0) => ({
  hidden: { opacity: 0, scale: 0.7, originY: 0.72 },
  visible: {
    opacity: 1,
    scale: 1,
    originY: 0.72,
    transition: {
      delay,
      duration,
      ease: [0.34, 1.56, 0.64, 1] // bouncy springy ease for blooming
    }
  }
});

export default function Logo({
  size = 'md',
  className = '',
  showText = false,
  animated = false,
  glow = false
}) {
  const motionProps = (variants, customDelay) => {
    if (!animated) return {};
    return {
      variants: variants,
      initial: 'hidden',
      animate: 'visible',
      custom: customDelay
    };
  };

  const isLoader = size === 'loader';

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <div
        className={`${sizes[size]} relative select-none transition-transform duration-300 hover:scale-105`}
      >
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full ${glow ? 'drop-shadow-[0_0_12px_rgba(198,138,31,0.4)]' : 'drop-shadow-md'}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Defs for Premium Gradients and Filters */}
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c68a1f" />
              <stop offset="30%" stopColor="#f4cb6c" />
              <stop offset="70%" stopColor="#d4a02a" />
              <stop offset="100%" stopColor="#a17013" />
            </linearGradient>

            <linearGradient id="redGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b02821" />
              <stop offset="40%" stopColor="#821510" />
              <stop offset="100%" stopColor="#590602" />
            </linearGradient>

            <radialGradient id="sunGlow" cx="50%" cy="36%" r="35%">
              <stop offset="0%" stopColor="#f4cb6c" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f4cb6c" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ambient Sun Glow behind the Arch (Always subtle) */}
          <m.circle
            cx="50"
            cy="36"
            r="20"
            fill="url(#sunGlow)"
            {...motionProps(fadeVariant(0.6, 1.2))}
          />

          {/* 1. Outer Frame: Royal Dual-Rings */}
          <m.circle
            cx="50"
            cy="50"
            r="46"
            stroke="url(#goldGrad)"
            strokeWidth="1.2"
            {...motionProps(drawVariant(0, 1.2))}
          />
          <m.circle
            cx="50"
            cy="50"
            r="43"
            stroke="url(#goldGrad)"
            strokeWidth="0.8"
            strokeDasharray="1.5 2.5"
            opacity="0.7"
            {...motionProps(drawVariant(0.2, 1.0))}
          />

          {/* 2. Rising Sun and Sunbeams (Behind the Dome Arch) */}
          <g>
            <m.circle
              cx="50"
              cy="36"
              r="6"
              fill="url(#goldGrad)"
              {...motionProps(fadeVariant(0.8, 0.8))}
            />
            {/* Sun Rays */}
            <m.path
              d="M 50,28 L 50,14"
              stroke="url(#goldGrad)"
              strokeWidth="0.8"
              strokeLinecap="round"
              {...motionProps(drawVariant(0.8, 0.8))}
            />
            <m.path
              d="M 44,31 L 37,20"
              stroke="url(#goldGrad)"
              strokeWidth="0.8"
              strokeLinecap="round"
              {...motionProps(drawVariant(0.85, 0.8))}
            />
            <m.path
              d="M 56,31 L 63,20"
              stroke="url(#goldGrad)"
              strokeWidth="0.8"
              strokeLinecap="round"
              {...motionProps(drawVariant(0.85, 0.8))}
            />
            <m.path
              d="M 39,36 L 29,31"
              stroke="url(#goldGrad)"
              strokeWidth="0.8"
              strokeLinecap="round"
              {...motionProps(drawVariant(0.9, 0.8))}
            />
            <m.path
              d="M 61,36 L 71,31"
              stroke="url(#goldGrad)"
              strokeWidth="0.8"
              strokeLinecap="round"
              {...motionProps(drawVariant(0.9, 0.8))}
            />
            <m.path
              d="M 46,24 L 38,13"
              stroke="url(#goldGrad)"
              strokeWidth="0.8"
              strokeLinecap="round"
              {...motionProps(drawVariant(0.95, 0.8))}
            />
            <m.path
              d="M 54,24 L 62,13"
              stroke="url(#goldGrad)"
              strokeWidth="0.8"
              strokeLinecap="round"
              {...motionProps(drawVariant(0.95, 0.8))}
            />
          </g>

          {/* 3. Heritage Double pointed Sandstone Archway */}
          <m.path
            d="M 33,70 L 33,52 C 33,48 35,46 37,45 C 36,39 43,33 50,23 C 57,33 64,39 63,45 C 65,46 67,48 67,52 L 67,70"
            stroke="url(#goldGrad)"
            strokeWidth="1.2"
            strokeLinecap="round"
            {...motionProps(drawVariant(0.4, 1.2))}
          />
          <m.path
            d="M 36,70 L 36,53 C 36,50 38,49 39,48 C 38,43 44,38 50,28 C 56,38 62,43 61,48 C 62,49 64,50 64,53 L 64,70"
            stroke="url(#goldGrad)"
            strokeWidth="0.75"
            strokeLinecap="round"
            opacity="0.6"
            {...motionProps(drawVariant(0.55, 1.2))}
          />

          {/* 4. Layered Lotus Blossom (Blooming Animation) */}
          <g>
            {/* Bottom Flare Petals */}
            <m.path
              d="M 50,64 C 23,62 26,75 50,73 C 36,72 38,66 50,64 Z"
              fill="url(#redGrad)"
              stroke="url(#goldGrad)"
              strokeWidth="0.6"
              {...motionProps(bloomVariant(1.0, 0.9))}
            />
            <m.path
              d="M 50,64 C 77,62 74,75 50,73 C 64,72 62,66 50,64 Z"
              fill="url(#redGrad)"
              stroke="url(#goldGrad)"
              strokeWidth="0.6"
              {...motionProps(bloomVariant(1.0, 0.9))}
            />

            {/* Left & Right Outer Petals */}
            <m.path
              d="M 50,56 C 28,52 30,68 50,72 C 34,68 38,60 50,56 Z"
              fill="url(#redGrad)"
              stroke="url(#goldGrad)"
              strokeWidth="0.75"
              {...motionProps(bloomVariant(1.1, 0.9))}
            />
            <m.path
              d="M 50,56 C 72,52 70,68 50,72 C 66,68 62,60 50,56 Z"
              fill="url(#redGrad)"
              stroke="url(#goldGrad)"
              strokeWidth="0.75"
              {...motionProps(bloomVariant(1.1, 0.9))}
            />

            {/* Left & Right Inner Petals */}
            <m.path
              d="M 50,48 C 38,48 38,65 50,72 C 44,62 45,54 50,48 Z"
              fill="url(#redGrad)"
              stroke="url(#goldGrad)"
              strokeWidth="0.75"
              {...motionProps(bloomVariant(1.2, 0.9))}
            />
            <m.path
              d="M 50,48 C 62,48 62,65 50,72 C 56,62 55,54 50,48 Z"
              fill="url(#redGrad)"
              stroke="url(#goldGrad)"
              strokeWidth="0.75"
              {...motionProps(bloomVariant(1.2, 0.9))}
            />

            {/* Center Petal */}
            <m.path
              d="M 50,42 C 46,50 46,67 50,72 C 54,67 54,50 50,42 Z"
              fill="url(#redGrad)"
              stroke="url(#goldGrad)"
              strokeWidth="0.9"
              {...motionProps(bloomVariant(1.3, 0.9))}
            />
          </g>

          {/* 5. Royal Swirl Flourishes (Water/Mist Base) */}
          <m.path
            d="M 50,74 C 38,74 27,80 20,73 C 16,69 13,74 17,79 C 21,84 29,82 36,78 C 43,74 48,74 50,74"
            stroke="url(#goldGrad)"
            strokeWidth="0.9"
            strokeLinecap="round"
            {...motionProps(drawVariant(1.2, 1.2))}
          />
          <m.path
            d="M 50,74 C 62,74 73,80 80,73 C 84,69 87,74 83,79 C 79,84 71,82 64,78 C 57,74 52,74 50,74"
            stroke="url(#goldGrad)"
            strokeWidth="0.9"
            strokeLinecap="round"
            {...motionProps(drawVariant(1.2, 1.2))}
          />
        </svg>
      </div>

      {showText && (
        <div className={`flex flex-col leading-tight ${isLoader ? 'items-center' : 'items-start'}`}>
          <span className={`font-display text-gradient-gold font-bold tracking-wider ${
            isLoader ? 'text-2xl md:text-3xl mt-4' : 'text-lg md:text-xl'
          }`}>
            Red Fort
          </span>
          <span className={`tracking-[0.25em] uppercase text-muted font-medium ${
            isLoader ? 'text-xs md:text-sm mt-1' : 'text-[9px]'
          }`}>
            Resort
          </span>
        </div>
      )}
    </div>
  );
}
