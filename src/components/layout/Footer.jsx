import { useState } from 'react';
import { m } from 'framer-motion';
import { RESORT, FOOTER_LINKS, SOCIAL_LINKS } from '../../utils/constants';
import LogoImg from '../../assets/logo.png';
import IconMap from '../ui/IconMap';

function SectionLabel({ children }) {
  return (
    <h4 className="flex items-center gap-2.5 text-[10px] font-bold tracking-[0.22em] uppercase text-secondary mb-5">
      <span className="w-5 h-px bg-gradient-to-r from-secondary/70 to-transparent rounded-full" />
      {children}
    </h4>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-dark-soft overflow-hidden w-full">
      {/* Top divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

      {/* Ambient glows */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[min(100%,32rem)] h-40 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(198,138,31,0.065) 0%, transparent 68%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(130,21,16,0.055) 0%, transparent 68%)' }}
        aria-hidden="true"
      />

      <div className="section-padding section-padding-bottom-2 relative">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14">

            {/* Brand column */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <a
                href="#home"
                className="group inline-flex items-center gap-2.5 mb-5"
                aria-label="Red Fort Resort — home"
              >
                <div className="border border-secondary/30 bg-white rounded-xl w-12 h-12 flex items-center justify-center shadow-[0_0_12px_rgba(184,122,28,0.14)]">
                  <img
                    src={LogoImg}
                    alt=""
                    aria-hidden="true"
                    className="w-8 h-8 object-contain rounded-lg"
                  />
                </div>
                <div className="flex flex-col leading-none min-w-0">
                  <span className="text-base font-display font-bold tracking-wide text-primary">
                    Red Fort
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-gradient-gold font-semibold mt-0.5 text-left">
                    Resort
                  </span>
                </div>
              </a>

              <p className="font-display text-lg italic text-cream/75 leading-snug mb-2 max-w-xs">
                &ldquo;Where luxury meets heritage&rdquo;
              </p>
              <p className="text-sm text-muted leading-relaxed max-w-sm">
                Experience unparalleled hospitality in the heart of the Coimbatore hills.
              </p>

              {/* Social icons */}
              <div className="flex gap-2.5 mt-6">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl glass flex items-center justify-center text-secondary hover:text-secondary-light hover:border-secondary/35 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(198,138,31,0.18)] transition-all duration-250"
                    aria-label={s.platform}
                  >
                    <IconMap name={s.icon} size={15} />
                  </a>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href={RESORT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-light text-white text-sm font-semibold shadow-[0_4px_16px_rgba(130,21,16,0.22)] hover:shadow-[0_6px_24px_rgba(130,21,16,0.30)] hover:-translate-y-0.5 transition-all duration-250"
              >
                <IconMap name="MessageSquare" size={15} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Explore + Contact columns */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6">
              {/* Explore */}
              <div className="min-w-0">
                <SectionLabel>Explore</SectionLabel>
                <ul className="space-y-2.5">
                  {FOOTER_LINKS.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-2 text-sm text-cream/60 hover:text-cream transition-colors duration-200"
                      >
                        <span className="w-0 h-px bg-secondary group-hover:w-3.5 transition-all duration-300 rounded-full" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="min-w-0">
                <SectionLabel>Contact</SectionLabel>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start group">
                    <span className="w-8 h-8 shrink-0 rounded-lg bg-white/[0.04] border border-border flex items-center justify-center group-hover:border-secondary/30 transition-colors mt-0.5">
                      <IconMap name="MapPin" size={13} className="text-secondary" />
                    </span>
                    <span className="text-xs sm:text-sm text-cream/65 leading-relaxed break-words">
                      {RESORT.address}
                    </span>
                  </li>
                  <li className="flex gap-3 items-start group">
                    <span className="w-8 h-8 shrink-0 rounded-lg bg-white/[0.04] border border-border flex items-center justify-center group-hover:border-secondary/30 transition-colors mt-0.5">
                      <IconMap name="Phone" size={13} className="text-secondary" />
                    </span>
                    <div className="flex flex-col">
                      <a
                        href={`tel:${RESORT.phone}`}
                        className="text-sm text-cream/65 hover:text-secondary transition-colors"
                      >
                        {RESORT.phone}
                      </a>
                      <a
                        href={`tel:${RESORT.phoneSecondary}`}
                        className="text-sm text-cream/65 hover:text-secondary transition-colors mt-0.5"
                      >
                        {RESORT.phoneSecondary}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3 items-center group min-w-0">
                    <span className="w-8 h-8 shrink-0 rounded-lg bg-white/[0.04] border border-border flex items-center justify-center group-hover:border-secondary/30 transition-colors">
                      <IconMap name="Mail" size={13} className="text-secondary" />
                    </span>
                    <a
                      href={`mailto:${RESORT.email}`}
                      className="text-sm text-cream/65 hover:text-secondary transition-colors break-all"
                    >
                      {RESORT.email}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-3 min-w-0">
              <div className="relative glass-card rounded-2xl p-5 sm:p-6 overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-28 h-28 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(198,138,31,0.10) 0%, transparent 68%)' }}
                  aria-hidden="true"
                />
                <SectionLabel>Newsletter</SectionLabel>
                <p className="text-xs sm:text-sm text-cream/60 mb-5 leading-relaxed relative">
                  Exclusive offers and seasonal packages — delivered to your inbox.
                </p>

                {subscribed ? (
                  <m.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 text-secondary"
                  >
                    <span className="w-9 h-9 rounded-full bg-secondary/12 border border-secondary/20 flex items-center justify-center shrink-0">
                      <IconMap name="CheckCircle" size={17} />
                    </span>
                    <p className="text-sm font-semibold">Thank you for subscribing!</p>
                  </m.div>
                ) : (
                  <form onSubmit={handleNewsletter} className="space-y-2.5 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      aria-label="Email for newsletter"
                      className="w-full min-w-0 px-4 py-3 rounded-xl bg-white border border-border text-sm text-cream placeholder:text-muted/50 focus:outline-none focus:border-secondary focus:shadow-[0_0_0_3px_rgba(184,122,28,0.10)] transition-all"
                    />
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-secondary to-secondary-light text-dark text-sm font-bold hover:shadow-[0_8px_24px_rgba(184,122,28,0.30)] hover:-translate-y-0.5 transition-all duration-250"
                    >
                      <IconMap name="Send" size={14} />
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 sm:mt-14 pt-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted text-center sm:text-left">
              &copy; {new Date().getFullYear()} {RESORT.name}. All rights reserved.
            </p>
            <p className="font-display text-sm italic text-cream/35 tracking-wide hidden sm:block">
              Luxury hospitality with heritage elegance
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
