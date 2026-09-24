import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { RESORT } from '../../utils/constants';
import Logo from '../ui/Logo';

const DISPLAY_MS = 300;  // how long loader stays visible before exiting
const EXIT_MS    = 480;  // panel slide duration

export default function PageLoader({ onComplete }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setDone(true), DISPLAY_MS);
    return () => clearTimeout(id);
  }, []);

  return (
    // onExitComplete fires after ALL motion children finish — reliable in Framer Motion v12
    <AnimatePresence onExitComplete={() => onComplete?.()}>
      {!done && (
        <div
          key="page-loader"
          className="fixed inset-0 z-[9999] overflow-hidden"
        >
          {/* Left panel slides out left */}
          <m.div
            className="absolute inset-y-0 left-0 w-1/2 bg-dark"
            initial={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: EXIT_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Right panel slides out right */}
          <m.div
            className="absolute inset-y-0 right-0 w-1/2 bg-dark"
            initial={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: EXIT_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Center branding — fades out during the exit so it doesn't ghost over hero */}
          <m.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: EXIT_MS / 1000 * 0.5, ease: 'easeOut' }}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 55% 50% at 50% 50%, rgba(198,138,31,0.08) 0%, transparent 68%)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-20 flex flex-col items-center w-full max-w-xs px-4 text-center">
              {/* Ring + logo */}
              <div className="relative flex items-center justify-center mb-5">
                <svg
                  className="absolute w-36 h-36 sm:w-44 sm:h-44 -rotate-90 pointer-events-none"
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                >
                  <circle
                    cx="50" cy="50" r="46"
                    stroke="rgba(232,221,208,0.30)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <circle
                    cx="50" cy="50" r="46"
                    stroke="url(#loaderGold)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray="289"
                    strokeDashoffset="289"
                    style={{
                      animation: `loader-fill ${DISPLAY_MS}ms cubic-bezier(0.4,0,0.2,1) forwards`,
                    }}
                  />
                  <defs>
                    <linearGradient id="loaderGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%"   stopColor="#a17013" />
                      <stop offset="50%"  stopColor="#f4cb6c" />
                      <stop offset="100%" stopColor="#c68a1f" />
                    </linearGradient>
                  </defs>
                </svg>

                <div
                  className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-secondary/12"
                  aria-hidden="true"
                />
                <Logo size="loader" className="scale-[0.58] sm:scale-[0.70]" glow />
              </div>

              {/* Resort name */}
              <p className="font-display text-lg font-semibold text-gradient-gold tracking-wide mb-1 mt-2">
                {RESORT.name}
              </p>
              <p className="text-[10px] uppercase text-cream/50 font-semibold tracking-[0.22em]">
                {RESORT.tagline}
              </p>

              {/* Loading dots */}
              <div className="flex items-center gap-1.5 mt-5" aria-label="Loading">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-secondary/45"
                    style={{
                      animation: `fade-in 0.55s ease-in-out ${i * 0.18}s infinite alternate`,
                    }}
                  />
                ))}
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
