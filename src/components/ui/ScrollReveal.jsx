import { m } from 'framer-motion';
import { fadeInUp } from '../../animations/variants';

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  variant = fadeInUp,
  once = true,
}) {
  return (
    <m.div
      className={className}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      transition={{ delay }}
    >
      {children}
    </m.div>
  );
}
