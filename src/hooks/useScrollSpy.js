import { useState } from 'react';
import { useThrottledCallback } from './useThrottledCallback';

export function useScrollSpy(sectionIds, offset = 120) {
  const [activeId, setActiveId] = useState(sectionIds[0] || '');

  useThrottledCallback(() => {
    const scrollY = window.scrollY + offset;
    let nextId = sectionIds[0] || '';

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i]);
      if (el && el.offsetTop <= scrollY) {
        nextId = sectionIds[i];
        break;
      }
    }

    setActiveId((prev) => (prev === nextId ? prev : nextId));
  }, [sectionIds, offset]);

  return activeId;
}
