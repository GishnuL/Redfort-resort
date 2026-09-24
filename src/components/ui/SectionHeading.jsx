import { m } from 'framer-motion';
import { fadeInUp } from '../../animations/variants';

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  light = false,
}) {
  const alignClass =
    align === 'center'
      ? 'text-center mx-auto items-center'
      : align === 'right'
      ? 'text-right ml-auto items-end'
      : 'text-left items-start';

  return (
    <m.div
      className={`flex flex-col w-full max-w-2xl mb-8 sm:mb-12 md:mb-14 min-w-0 ${alignClass}`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
    >
      {label && (
        <span className="inline-flex items-center gap-2.5 mb-4 sm:mb-5">
          <span className="w-8 h-px bg-secondary/55 rounded-full" />
          <span
            className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.28em]"
            style={{ color: 'var(--color-secondary)' }}
          >
            {label}
          </span>
          <span className="w-8 h-px bg-secondary/55 rounded-full" />
        </span>
      )}

      <h2
        className={`heading-balance font-display font-semibold ${light ? 'text-white' : 'text-cream'}`}
        style={{
          fontSize: 'clamp(1.75rem, 3.8vw + 0.5rem, 3.5rem)',
          lineHeight: '1.06',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 sm:mt-5 text-sm sm:text-base md:text-[17px] leading-relaxed break-words max-w-xl ${
            light ? 'text-white/60' : 'text-muted'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}

      {/* Decorative rule */}
      <div
        className={`mt-6 sm:mt-7 flex items-center gap-2.5 ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <span className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-secondary/50 rounded-full" />
        <span
          style={{
            display: 'inline-block',
            width: '7px',
            height: '7px',
            borderRadius: '1px',
            background: 'var(--color-secondary)',
            opacity: 0.65,
            transform: 'rotate(45deg)',
          }}
        />
        <span className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-secondary/50 rounded-full" />
      </div>
    </m.div>
  );
}
