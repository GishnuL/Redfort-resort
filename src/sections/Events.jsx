import { m } from 'framer-motion';
import { EVENT_TYPES } from '../utils/constants';
import SectionHeading from '../components/ui/SectionHeading';
import IconMap from '../components/ui/IconMap';
import { staggerContainer, fadeInUp } from '../animations/variants';


export default function Events() {
  return (
    <section id="events" className="section-padding bg-dark relative overflow-hidden">
      <div
        className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(198,138,31,0.06) 0%, transparent 68%)' }}
        aria-hidden="true"
      />

      <div className="section-container relative">
        <SectionHeading
          label="Celebrations"
          title="Events & Occasions"
          subtitle="From intimate gatherings to grand celebrations — we bring your vision to life."
        />

        {/* Event type cards */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {EVENT_TYPES.map((event) => (
            <m.div
              key={event.title}
              variants={fadeInUp}
              className="group relative rounded-2xl overflow-hidden min-w-0 cursor-default"
              style={{ aspectRatio: '3/4', minHeight: '280px' }}
            >
              <img
                src={event.image}
                alt={event.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                <div className="w-10 h-10 rounded-xl bg-secondary/20 backdrop-blur-sm border border-secondary/25 flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-secondary/35 group-hover:scale-110">
                  <IconMap name={event.icon} size={18} className="text-secondary" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-white leading-tight">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/65 mt-2 leading-relaxed line-clamp-2 sm:line-clamp-3 transition-all duration-300 group-hover:text-white/85">
                  {event.desc}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-secondary text-xs font-semibold tracking-wide opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span>Learn More</span>
                  <IconMap name="ArrowRight" size={13} />
                </div>
              </div>
              <div className="absolute top-4 right-4 w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-x-2 group-hover:translate-x-0">
                <div className="absolute top-0 right-0 w-full h-[1.5px] bg-secondary/60" />
                <div className="absolute top-0 right-0 h-full w-[1.5px] bg-secondary/60" />
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
