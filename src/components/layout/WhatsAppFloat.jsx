import { m } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { RESORT } from '../../utils/constants';

export default function WhatsAppFloat() {
  return (
    <m.a
      href={RESORT.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float fixed z-50 w-11 h-11 sm2:w-14 sm2:h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/40 right-2.5 sm2:right-4 sm:right-6 bottom-[max(0.75rem,env(safe-area-inset-bottom))] sm2:bottom-6 will-change-transform"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.3 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <span className="whatsapp-pulse absolute inset-0 rounded-full bg-[#25D366]" aria-hidden="true" />
      <FaWhatsapp className="relative text-white text-2xl xs:text-3xl sm:text-4xl" />
    </m.a>
  );
}
