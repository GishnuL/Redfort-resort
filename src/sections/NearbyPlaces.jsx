import { useState } from 'react';
import { m } from 'framer-motion';
import { NEARBY_PLACES } from '../utils/constants';
import SectionHeading from '../components/ui/SectionHeading';
import IconMap from '../components/ui/IconMap';

const INITIAL_VISIBLE = 8;

export default function NearbyPlaces() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? NEARBY_PLACES : NEARBY_PLACES.slice(0, INITIAL_VISIBLE);

  return (
    <section id="nearby" className="section-padding bg-dark overflow-hidden">
      <div
        className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(184,122,28,0.055) 0%, transparent 68%)' }}
        aria-hidden="true"
      />

      <div className="section-container">
        <SectionHeading
          label="Explore"
          title="Nearby Attractions"
          subtitle="Discover the natural wonders and cultural gems surrounding Red Fort Resort."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {visible.map((place, idx) => (
            <m.div
              key={place.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.38, ease: 'easeOut', delay: Math.min(idx % 4, 3) * 0.07 }}
              className="group glass-card rounded-2xl overflow-hidden min-w-0 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_56px_rgba(45,34,24,0.12)]"
            >
              {/* Image */}
              <div className="relative h-40 sm:h-44 overflow-hidden bg-dark-soft">
                <img
                  src={place.image}
                  alt={place.name}
                  loading={idx < 4 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />

                {/* Distance badge — top right */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/45 backdrop-blur-sm text-white/90 text-[10px] font-semibold">
                  <IconMap name="MapPin" size={10} className="text-secondary-pale" />
                  {place.distance}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <h3 className="font-display text-base sm:text-[17px] font-semibold text-cream leading-snug line-clamp-2 group-hover:text-secondary transition-colors duration-200">
                  {place.name}
                </h3>

                <div className="flex items-center gap-3 mt-2.5 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <IconMap name="Clock" size={12} className="text-secondary shrink-0" />
                    {place.time}
                  </span>
                  <span className="text-border">•</span>
                  <span className="flex items-center gap-1">
                    <IconMap name="Navigation" size={12} className="text-secondary shrink-0" />
                    {place.distance}
                  </span>
                </div>

                <a
                  href={place.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-secondary-light transition-colors group/link"
                >
                  Get Directions
                  <IconMap
                    name="ArrowRight"
                    size={12}
                    className="transition-transform duration-200 group-hover/link:translate-x-0.5"
                  />
                </a>
              </div>
            </m.div>
          ))}
        </div>

        {/* Show more / less */}
        {NEARBY_PLACES.length > INITIAL_VISIBLE && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm font-semibold text-cream hover:text-secondary hover:border-secondary/35 transition-all duration-250"
            >
              {showAll ? (
                <>
                  <IconMap name="ChevronUp" size={16} />
                  Show Less
                </>
              ) : (
                <>
                  <IconMap name="ChevronDown" size={16} />
                  Show {NEARBY_PLACES.length - INITIAL_VISIBLE} More Attractions
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
