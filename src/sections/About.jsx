import { m } from 'framer-motion';
import { STATS, ABOUT_IMAGES } from '../utils/constants';
import { useCounter } from '../hooks/useCounter';
import SectionHeading from '../components/ui/SectionHeading';
import IconMap from '../components/ui/IconMap';
import { staggerContainer, fadeInUp, slideInLeft, slideInRight } from '../animations/variants';

const FEATURE_LIST = [
  { icon: 'Check', text: 'Private event venues for up to 300 guests' },
  { icon: 'Check', text: 'Eco-conscious luxury practices' },
  { icon: 'Check', text: 'Spacious car parking' },
  { icon: 'Check', text: 'High-speed WiFi throughout the property' },
];

const STAT_ICONS = ['Users', 'Bed', 'Star', 'CalendarDays'];

const CORNER_CLASSES = [
  'top-3 left-3 border-t-2 border-l-2 rounded-tl-sm',
  'top-3 right-3 border-t-2 border-r-2 rounded-tr-sm',
  'bottom-3 left-3 border-b-2 border-l-2 rounded-bl-sm',
  'bottom-3 right-3 border-b-2 border-r-2 rounded-br-sm',
];

function StatCard({ label, value, suffix, icon }) {
  const { count, ref } = useCounter(value, 2000);
  return (
    <div
      ref={ref}
      className="group flex flex-col items-center justify-center text-center py-7 sm:py-8 px-4 cursor-default transition-colors duration-300"
      style={{ background: 'linear-gradient(165deg, #ffffff 0%, #fdf6ea 100%)' }}
    >
      <div
        className="mb-3.5 w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{
          background: 'rgba(184,122,28,0.10)',
          border: '1px solid rgba(184,122,28,0.22)',
        }}
      >
        <IconMap name={icon} size={17} style={{ color: '#b87a1c' }} />
      </div>

      <p
        className="font-display font-bold leading-none mb-1.5"
        style={{
          fontSize: 'clamp(2rem, 3vw + 0.5rem, 3rem)',
          background: 'linear-gradient(135deg, #c68a1f 0%, #f4cb6c 50%, #a17013 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-xs sm:text-sm text-muted font-medium tracking-wide">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding bg-dark-soft relative overflow-hidden">

      {/* Ambient glows */}
      <div
        className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(130,21,16,0.055) 0%, transparent 65%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(184,122,28,0.07) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="section-container relative">
        <SectionHeading
          label="Our Story"
          title="A Legacy of Luxury Hospitality"
          subtitle="Nestled among misty hills and lush gardens, Red Fort Resort has been redefining luxury retreats since 2019."
        />

        {/* ── Main content grid ────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 xl:gap-20 items-start">

          {/* ── Left: Image collage ─────────────────────────── */}
          <m.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative min-w-0"
          >
            {/* Primary image with gold corner brackets */}
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ boxShadow: '0 20px 72px rgba(45,34,24,0.18)' }}
            >
              <img
                src={ABOUT_IMAGES[0].src}
                srcSet={ABOUT_IMAGES[0].srcSet}
                sizes={ABOUT_IMAGES[0].sizes}
                width={ABOUT_IMAGES[0].width}
                height={ABOUT_IMAGES[0].height}
                alt={ABOUT_IMAGES[0].alt}
                loading="lazy"
                decoding="async"
                className="w-full h-[280px] sm:h-[320px] md:h-[380px] object-cover hover:scale-[1.04] transition-transform duration-700"
              />

              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

              {/* Bottom info bar inside image */}
              <div
                className="absolute bottom-4 left-4 right-4 flex items-center justify-between"
              >
                <div>
                  <p
                    className="text-[9px] font-bold tracking-[0.25em] uppercase mb-0.5"
                    style={{ color: 'rgba(212,168,67,0.90)' }}
                  >
                    Est. 2019
                  </p>
                  <p className="text-white/80 text-[11px] font-medium">Siruvani Hills, Coimbatore</p>
                </div>
                <div
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(212,168,67,0.18)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(212,168,67,0.35)',
                  }}
                >
                  <IconMap name="Star" size={10} style={{ color: '#f4cb6c' }} />
                  <span className="text-[11px] font-bold text-white">4.9</span>
                </div>
              </div>

              {/* Gold corner brackets */}
              {CORNER_CLASSES.map((cls, i) => (
                <div
                  key={i}
                  className={`absolute w-5 h-5 pointer-events-none ${cls}`}
                  style={{ borderColor: 'rgba(212,168,67,0.72)' }}
                  aria-hidden="true"
                />
              ))}
            </div>

            {/* Second image + badge row */}
            <div className="grid grid-cols-[1fr_auto] gap-4 mt-4 items-center">
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{ boxShadow: '0 8px 36px rgba(45,34,24,0.12)' }}
              >
                <img
                  src={ABOUT_IMAGES[1].src}
                  srcSet={ABOUT_IMAGES[1].srcSet}
                  sizes={ABOUT_IMAGES[1].sizes}
                  width={ABOUT_IMAGES[1].width}
                  height={ABOUT_IMAGES[1].height}
                  alt={ABOUT_IMAGES[1].alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-36 sm:h-44 object-cover hover:scale-[1.04] transition-transform duration-700"
                />
                {/* Corner brackets on second image */}
                {CORNER_CLASSES.map((cls, i) => (
                  <div
                    key={i}
                    className={`absolute w-4 h-4 pointer-events-none ${cls}`}
                    style={{ borderColor: 'rgba(212,168,67,0.55)' }}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Award medallion */}
              <m.div
                initial={{ opacity: 0, scale: 0.75, rotate: -8 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6, type: 'spring', stiffness: 170 }}
                className="shrink-0"
              >
                <div
                  className="relative w-[110px] h-[110px] sm:w-[124px] sm:h-[124px] rounded-full flex flex-col items-center justify-center text-center"
                  style={{
                    background: 'linear-gradient(145deg, #fffdf7 0%, #fdf3e1 100%)',
                    border: '2px solid rgba(184,122,28,0.32)',
                    boxShadow: '0 6px 36px rgba(45,34,24,0.14), 0 0 0 8px rgba(184,122,28,0.06)',
                  }}
                >
                  {/* Dashed inner ring */}
                  <div
                    className="absolute inset-[8px] rounded-full pointer-events-none"
                    style={{ border: '1px dashed rgba(184,122,28,0.25)' }}
                    aria-hidden="true"
                  />
                  <div className="opacity-65 mb-0.5">
                    <IconMap name="Star" size={12} style={{ color: '#c68a1f' }} />
                  </div>
                  <p
                    className="font-display font-bold leading-none"
                    style={{
                      fontSize: '2rem',
                      background: 'linear-gradient(135deg, #c68a1f 0%, #f4cb6c 50%, #a17013 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    7+
                  </p>
                  <p className="text-[8.5px] font-bold tracking-wider uppercase text-muted mt-0.5 leading-snug">
                    Years of<br />Excellence
                  </p>
                </div>
              </m.div>
            </div>
          </m.div>

          {/* ── Right: Content ──────────────────────────────── */}
          <m.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="min-w-0 lg:pt-2"
          >
            {/* Pull quote */}
            <div
              className="relative pl-5 mb-7"
              style={{ borderLeft: '3px solid rgba(184,122,28,0.50)' }}
            >
              <p
                className="font-display italic text-cream/90 leading-relaxed"
                style={{ fontSize: 'clamp(1.1rem, 1.8vw + 0.3rem, 1.35rem)' }}
              >
                "Born from a vision to create an oasis where modern luxury harmonizes
                with untouched natural beauty — an experience that transcends ordinary
                hospitality."
              </p>
            </div>

            <p className="text-sm sm:text-base text-muted leading-relaxed mb-8">
              Every corner tells a story — from hand-crafted interiors inspired by local
              heritage to world-class amenities designed for the discerning traveler.
              Whether you seek tranquility, adventure, or celebration, we curate moments
              that linger long after you depart.
            </p>

            {/* Feature list */}
            <ul className="space-y-3 mb-9">
              {FEATURE_LIST.map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-sm sm:text-[14.5px] text-cream/80">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(184,122,28,0.13)',
                      border: '1px solid rgba(184,122,28,0.28)',
                    }}
                  >
                    <IconMap name="Check" size={9} style={{ color: '#b87a1c' }} />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div
              className="mb-7"
              style={{
                height: '1px',
                background: 'linear-gradient(to right, rgba(184,122,28,0.35), transparent)',
              }}
            />

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #5c0f0b 0%, #821510 55%, #a6231c 100%)',
                  boxShadow: '0 4px 20px rgba(130,21,16,0.30)',
                }}
              >
                Explore Gallery
                <IconMap name="ArrowRight" size={12} />
              </a>
              <a
                href="#amenities"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  color: 'var(--color-secondary)',
                  border: '1.5px solid rgba(184,122,28,0.35)',
                  background: 'rgba(184,122,28,0.05)',
                }}
              >
                Our Amenities
              </a>
            </div>
          </m.div>
        </div>

        {/* ── Stats panel ──────────────────────────────────── */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-20 md:mt-24"
        >
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(184,122,28,0.18)',
              boxShadow: '0 2px 0 0 rgba(184,122,28,0.12), 0 12px 56px rgba(45,34,24,0.09)',
              border: '1px solid rgba(184,122,28,0.18)',
            }}
          >
            {STATS.map((stat, i) => (
              <m.div key={stat.label} variants={fadeInUp}>
                <StatCard {...stat} icon={STAT_ICONS[i]} />
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
