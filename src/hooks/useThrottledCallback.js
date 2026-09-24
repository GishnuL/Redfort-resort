import { useEffect, useRef } from 'react';

/** Runs callback on scroll at most once per throttleMs (default 150ms). */
export function useThrottledCallback(callback, deps = [], throttleMs = 150) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let lastRun = 0;
    let rafId = null;

    const onScroll = () => {
      const now = Date.now();
      if (rafId) return; // already scheduled
      if (now - lastRun < throttleMs) {
        // Schedule for when throttle window expires
        rafId = requestAnimationFrame(() => {
          rafId = null;
          lastRun = Date.now();
          callbackRef.current();
        });
      } else {
        lastRun = now;
        callbackRef.current();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount
    callbackRef.current();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
