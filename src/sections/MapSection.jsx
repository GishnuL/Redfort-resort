import { m } from 'framer-motion';
import { RESORT } from '../utils/constants';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import IconMap from '../components/ui/IconMap';
import { slideInLeft, slideInRight } from '../animations/variants';

const QUICK_FACTS = [
  { icon: 'Clock', label: 'Check-in', value: '2:00 PM' },
  { icon: 'Clock', label: 'Check-out', value: '11:00 AM' },
  { icon: 'Car', label: 'Parking', value: 'Free Parking' },
];

export default function MapSection() {
  return (
    <section id="location" className="section-padding bg-dark-soft overflow-hidden">
      <div className="section-container">
        <SectionHeading
          label="Find Us"
          title="Location & Navigation"
          subtitle="Located in the heart of the hills — easily accessible yet wonderfully secluded."
        />

        <div className="grid lg:grid-cols-5 gap-5 lg:gap-8 items-stretch">
          {/* Info card */}
          <m.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col gap-6 min-w-0"
          >
            {/* Address block */}
            <div>
              <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center mb-4">
                <IconMap name="MapPin" size={22} className="text-primary-light" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-cream mb-2">
                Visit Us
              </h3>
              <p className="text-sm text-muted leading-relaxed break-words">{RESORT.address}</p>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2.5">
              <a
                href={`tel:${RESORT.phone}`}
                className="group flex items-center gap-3 text-sm text-cream/70 hover:text-secondary transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <IconMap name="Phone" size={14} className="text-secondary" />
                </span>
                {RESORT.phone}
              </a>
              <a
                href={`tel:${RESORT.phoneSecondary}`}
                className="group flex items-center gap-3 text-sm text-cream/70 hover:text-secondary transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <IconMap name="Phone" size={14} className="text-secondary" />
                </span>
                {RESORT.phoneSecondary}
              </a>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-3 gap-2.5">
              {QUICK_FACTS.map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="bg-dark-soft rounded-xl p-3 text-center"
                >
                  <IconMap name={icon} size={15} className="text-secondary mx-auto mb-1.5" />
                  <p className="text-[10px] text-muted uppercase tracking-wider font-semibold">{label}</p>
                  <p className="text-xs font-semibold text-cream mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            {/* Directions CTA */}
            <Button
              variant="secondary"
              target="_blank"
              href={RESORT.directionsUrl}
              rel="noopener noreferrer"
              className="w-full !py-3.5 mt-auto"
            >
              <IconMap name="Navigation" size={16} />
              Get Directions
            </Button>
          </m.div>

          {/* Map embed */}
          <m.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-2xl sm:rounded-3xl overflow-hidden glass-card shadow-[0_8px_40px_rgba(45,34,24,0.10)] min-w-0"
            style={{ minHeight: '320px', height: 'min(28rem, 100%)' }}
          >
            <iframe
              title="Red Fort Resort Location"
              src={RESORT.mapEmbed}
              className="w-full h-full border-0"
              style={{ minHeight: '320px', filter: 'saturate(0.85) contrast(1.05)' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </m.div>
        </div>
      </div>
    </section>
  );
}
