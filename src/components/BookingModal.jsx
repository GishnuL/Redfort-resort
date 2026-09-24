import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import IconMap from './ui/IconMap';

export default function BookingModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setForm({ name: '', email: '', checkIn: '', checkOut: '', guests: '2' });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <m.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-2 top-[max(0.5rem,env(safe-area-inset-top))] bottom-2 sm2:inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[201] w-auto sm:w-full sm:max-w-md glass-card rounded-2xl sm2:rounded-3xl p-3 sm2:p-5 sm:p-8 overflow-y-auto max-h-[calc(100dvh-1rem)] sm:max-h-[94vh] min-w-0"
          >
            <div className="flex items-start justify-between gap-3 mb-5 xs:mb-6 min-w-0">
              <div className="min-w-0 pr-2">
                <h3 className="font-display text-xl xs:text-2xl font-semibold text-cream leading-tight">
                  Reserve Your Stay
                </h3>
                <p className="text-xs xs:text-sm text-muted mt-1">Red Fort Resort — luxury awaits</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-cream hover:bg-white/10 shrink-0"
                aria-label="Close"
              >
                <IconMap name="X" size={18} />
              </button>
            </div>

            {submitted ? (
              <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6 xs:py-8">
                <div className="w-14 h-14 xs:w-16 xs:h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
                  <IconMap name="Calendar" size={28} className="text-secondary" />
                </div>
                <p className="text-base xs:text-lg text-cream">Booking request received!</p>
                <p className="text-sm text-muted mt-2">Our concierge will contact you shortly.</p>
              </m.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 xs:space-y-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full min-w-0 px-4 py-3 rounded-xl bg-white border border-border text-cream placeholder:text-muted/60 focus:outline-none focus:border-secondary text-sm"
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full min-w-0 px-4 py-3 rounded-xl bg-white border border-border text-cream placeholder:text-muted/60 focus:outline-none focus:border-secondary text-sm"
                />
                <div className="grid grid-cols-1 sm3:grid-cols-2 gap-3">
                  <div className="min-w-0">
                    <label className="text-xs text-muted mb-1 block">Check-in</label>
                    <input
                      name="checkIn"
                      type="date"
                      value={form.checkIn}
                      onChange={handleChange}
                      required
                      className="w-full min-w-0 px-3 py-2.5 rounded-xl bg-white border border-border text-cream text-sm focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div className="min-w-0">
                    <label className="text-xs text-muted mb-1 block">Check-out</label>
                    <input
                      name="checkOut"
                      type="date"
                      value={form.checkOut}
                      onChange={handleChange}
                      required
                      className="w-full min-w-0 px-3 py-2.5 rounded-xl bg-white border border-border text-cream text-sm focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>
                <div className="relative min-w-0">
                  <IconMap
                    name="Users"
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <select
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    className="w-full min-w-0 pl-10 pr-4 py-3 rounded-xl bg-white border border-border text-cream text-sm focus:outline-none focus:border-secondary appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n} className="bg-dark">
                        {n} Guest{n > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="submit" variant="secondary" className="w-full mt-2">
                  Confirm Booking
                </Button>
              </form>
            )}
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
