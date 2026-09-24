import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { FAQS } from '../utils/constants';
import SectionHeading from '../components/ui/SectionHeading';
import IconMap from '../components/ui/IconMap';

function AccordionItem({ item, index, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-xl sm:rounded-2xl transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'glass-card shadow-[0_8px_32px_rgba(45,34,24,0.08)]'
          : 'bg-white/0 hover:bg-white/40 border border-transparent hover:border-border'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left group"
        aria-expanded={isOpen}
      >
        {/* Number */}
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-body transition-all duration-300 ${
            isOpen
              ? 'bg-secondary text-dark'
              : 'bg-dark-soft text-muted group-hover:bg-secondary/15 group-hover:text-secondary'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Question */}
        <span
          className={`flex-1 text-sm sm:text-base font-medium leading-snug min-w-0 transition-colors duration-200 ${
            isOpen ? 'text-cream' : 'text-cream/80 group-hover:text-cream'
          }`}
        >
          {item.q}
        </span>

        {/* Toggle icon */}
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'bg-secondary/15 text-secondary rotate-180'
              : 'bg-dark-soft text-muted group-hover:bg-secondary/10 group-hover:text-secondary'
          }`}
        >
          <IconMap name="ChevronDown" size={15} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-[15px] text-muted leading-relaxed pl-[4.25rem]">
              {item.a}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-padding bg-dark overflow-hidden w-full">
      <div className="section-container max-w-3xl">
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before your stay at Red Fort Resort."
        />

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="space-y-2 sm:space-y-3"
        >
          {FAQS.map((item, i) => (
            <AccordionItem
              key={item.q}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </m.div>
      </div>
    </section>
  );
}
