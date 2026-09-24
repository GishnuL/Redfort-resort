import { useState, useCallback, useEffect, useMemo, memo } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { m, AnimatePresence } from 'framer-motion';
import IconMap from '../components/ui/IconMap';
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from '../utils/constants';
import SectionHeading from '../components/ui/SectionHeading';

const INITIAL_VISIBLE = 6;
const HEIGHTS = ['h-48 sm:h-56', 'h-40 sm:h-48', 'h-56 sm:h-64'];

/* Image tile with blur-to-sharp reveal */
const GalleryItem = memo(function GalleryItem({ src, srcSet, sizes, width, height, alt, category, className, onClick, priority }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-xl sm:rounded-2xl bg-dark-soft group cursor-zoom-in ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View ${alt}`}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-dark-soft via-border-soft to-dark-soft" />
      )}

      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? undefined : 'low'}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.06] ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {loaded && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-between p-3 sm:p-4">
          <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
            <IconMap name="ZoomIn" size={14} className="text-white" />
          </div>
          <span className="text-xs font-medium text-white/80 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
            {category}
          </span>
        </div>
      )}
    </div>
  );
});

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Recomputed only when the active filter changes — not on every lightbox
  // open/close/navigate, which also re-render this component. (The 'All' branch
  // is an O(n²) de-dupe.)
  const allFiltered = useMemo(
    () =>
      filter === 'All'
        ? GALLERY_IMAGES.filter((img, index, self) =>
            self.findIndex((t) => t.src === img.src) === index
          )
        : GALLERY_IMAGES.filter((img) => img.category === filter),
    [filter]
  );

  const visible = showAll ? allFiltered : allFiltered.slice(0, INITIAL_VISIBLE);
  const hasMore = !showAll && allFiltered.length > INITIAL_VISIBLE;
  const currentImg = lightboxIdx !== null ? allFiltered[lightboxIdx] : null;

  const closeModal = useCallback(() => setLightboxIdx(null), []);
  const goPrev = useCallback(() =>
    setLightboxIdx((i) => (i - 1 + allFiltered.length) % allFiltered.length),
  [allFiltered.length]);
  const goNext = useCallback(() =>
    setLightboxIdx((i) => (i + 1) % allFiltered.length),
  [allFiltered.length]);

  /* Arrow key navigation */
  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, goPrev, goNext]);

  const handleFilter = useCallback((cat) => {
    setFilter(cat);
    setShowAll(false);
    setLightboxIdx(null);
  }, []);

  return (
    <section id="gallery" className="section-padding bg-dark overflow-hidden">
      <div className="section-container">
        <SectionHeading
          label="Gallery"
          title="Moments Captured in Time"
          subtitle="Explore the beauty and elegance of Red Fort Resort through our lens."
        />

        {/* Filter pills */}
        <div
          className="flex overflow-x-auto no-scrollbar gap-2 mb-6 sm:mb-10 pb-0.5 sm:flex-wrap sm:justify-center -mx-4 px-4 sm:mx-0 sm:px-0"
          role="group"
          aria-label="Filter gallery"
        >
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleFilter(cat)}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-250 whitespace-nowrap ${
                filter === cat
                  ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-[0_4px_16px_rgba(130,21,16,0.25)]'
                  : 'glass text-muted hover:text-cream hover:bg-secondary/5'
              }`}
              aria-pressed={filter === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <m.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((img, i) => (
              <m.div
                key={`${img.category}-${img.alt}`}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.28, ease: 'easeOut', delay: Math.min(i, 5) * 0.05 }}
                className="break-inside-avoid mb-3 sm:mb-4"
              >
                <GalleryItem
                  src={img.src}
                  srcSet={img.srcSet}
                  sizes={img.sizes}
                  width={img.width}
                  height={img.height}
                  alt={img.alt}
                  category={img.category}
                  className={HEIGHTS[i % HEIGHTS.length]}
                  priority={i < 2}
                  onClick={() => setLightboxIdx(i)}
                />
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>

        {/* Load more */}
        {hasMore && (
          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex justify-center mt-8 sm:mt-10"
          >
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 glass text-muted hover:text-cream"
              style={{ border: '1px solid rgba(184,122,28,0.22)' }}
            >
              <IconMap name="Plus" size={14} className="text-secondary" />
              View All Photos ({allFiltered.length})
            </button>
          </m.div>
        )}
      </div>

      {/* ── Gallery Modal (Radix Dialog — renders in document.body portal) ── */}
      <Dialog.Root open={lightboxIdx !== null} onOpenChange={(open) => !open && closeModal()}>
        <Dialog.Portal>

          {/* Overlay — covers everything including navbar */}
          <Dialog.Overlay asChild>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0"
              style={{
                background: 'rgba(4,2,1,0.92)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                zIndex: 9998,
              }}
            />
          </Dialog.Overlay>

          {/* Dialog content */}
          <Dialog.Content asChild onOpenAutoFocus={(e) => e.preventDefault()}>
            <m.div
              initial={{ opacity: 0, scale: 0.93, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 28 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 flex items-center justify-center p-3 sm:p-5"
              style={{ zIndex: 9999 }}
            >
              {currentImg && (
                <div
                  className="w-full flex flex-col overflow-hidden"
                  style={{
                    maxWidth: 'min(96vw, 880px)',
                    borderRadius: '16px',
                    background: '#0d0906',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 32px 100px rgba(0,0,0,0.92)',
                  }}
                >
                  {/* Header */}
                  <div
                    className="shrink-0 flex items-center justify-between px-4 sm:px-5 py-3"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/28">
                        Gallery
                      </span>
                      <span className="w-px h-3 bg-white/10" />
                      <span
                        className="text-[9px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(184,122,28,0.14)',
                          border: '1px solid rgba(184,122,28,0.26)',
                          color: '#d4a843',
                        }}
                      >
                        {currentImg.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] text-white/25 font-medium">
                        {lightboxIdx + 1} / {allFiltered.length}
                      </span>
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          aria-label="Close gallery"
                          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/12 transition-colors"
                          style={{ border: '1px solid rgba(255,255,255,0.10)' }}
                        >
                          <IconMap name="X" size={13} className="text-white/60" />
                        </button>
                      </Dialog.Close>
                    </div>
                  </div>

                  {/* Image — 16:9, full card width, object-cover */}
                  <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                    <AnimatePresence mode="wait">
                      <m.img
                        key={lightboxIdx}
                        src={currentImg.src}
                        srcSet={currentImg.srcSet}
                        sizes="(min-width: 880px) 880px, 96vw"
                        alt={currentImg.alt}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </AnimatePresence>

                    {/* Bottom gradient for readability */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />

                    {/* Prev */}
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                      style={{
                        background: 'rgba(6,3,1,0.70)',
                        border: '1px solid rgba(255,255,255,0.14)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <IconMap name="ChevronLeft" size={17} className="text-white/85" />
                    </button>

                    {/* Next */}
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                      style={{
                        background: 'rgba(6,3,1,0.70)',
                        border: '1px solid rgba(255,255,255,0.14)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <IconMap name="ChevronRight" size={17} className="text-white/85" />
                    </button>
                  </div>

                  {/* Footer */}
                  <div
                    className="shrink-0 flex items-center justify-between px-4 sm:px-5 py-3"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <p className="text-xs sm:text-sm text-white/45 truncate pr-4">
                      {currentImg.alt}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {allFiltered.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setLightboxIdx(i)}
                          aria-label={`Go to image ${i + 1}`}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: i === lightboxIdx ? '16px' : '4px',
                            height: '3px',
                            background:
                              i === lightboxIdx ? '#d4a843' : 'rgba(255,255,255,0.16)',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </m.div>
          </Dialog.Content>

        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
