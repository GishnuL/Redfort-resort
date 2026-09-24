import { useState } from 'react';
import { useThrottledCallback } from '../../hooks/useThrottledCallback';
import IconMap from '../ui/IconMap';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useThrottledCallback(() => {
    const show = window.scrollY > 600;
    setVisible((prev) => (prev === show ? prev : show));
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed z-50 w-9 h-9 sm2:w-11 sm2:h-11 rounded-full glass flex items-center justify-center text-secondary hover:bg-secondary/20 transition-all duration-200 hover:scale-105 right-2.5 sm2:right-4 sm:right-8.5 bottom-[calc(max(0.75rem,env(safe-area-inset-bottom))+3.75rem)] sm2:bottom-26"
      aria-label="Back to top"
    >
      <IconMap name="ArrowUp" size={18} />
    </button>
  );
}
