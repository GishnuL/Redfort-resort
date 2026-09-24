import { useState } from "react";
import { m } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { RESORT, SOCIAL_LINKS } from "../utils/constants";
import { validateContactForm } from "../utils/validators";
import { sendEnquiry } from "../utils/sendEnquiry";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import LogoImg from "../assets/logo.png";
import IconMap from "../components/ui/IconMap";
import { slideInLeft, slideInRight } from "../animations/variants";

const initialForm = { name: "", email: "", phone: "", message: "" };

const CONTACT_DETAILS = [
  { icon: "Phone",  value: RESORT.phone, href: `tel:${RESORT.phone}` },
  { icon: "Phone",  value: RESORT.phoneSecondary, href: `tel:${RESORT.phoneSecondary}` },
  { icon: "Mail",  label: "Email", value: RESORT.email, href: `mailto:${RESORT.email}` },
  { icon: "MapPin", label: "Address", value: RESORT.address, href: RESORT.directionsUrl },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateContactForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setSubmitError("");
    try {
      await sendEnquiry(form);
      setSubmitted(true);
      setForm(initialForm);
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setSubmitError("Could not send your message. Please try WhatsApp or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (field) =>
    `input-field ${errors[field] ? 'error' : ''}`;

  return (
    <section id="contact" className="section-padding bg-dark-soft overflow-hidden">
      <div
        className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(130,21,16,0.04) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="section-container">
        <SectionHeading
          label="Contact"
          title="Get in Touch"
          subtitle="Our concierge team is ready to assist with reservations, events, and special requests."
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-20 items-start min-w-0">

          {/* Form column */}
          <m.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {submitted ? (
              <m.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl sm:rounded-3xl p-10 sm:p-12 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-secondary/15 border border-secondary/25 flex items-center justify-center">
                  <IconMap name="CheckCircle" size={30} className="text-secondary" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-cream mb-2">Message Sent!</h3>
                <p className="text-muted text-sm sm:text-base leading-relaxed">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <div className="mt-6 h-1 bg-dark-soft rounded-full overflow-hidden">
                  <m.div
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                    className="h-full bg-secondary rounded-full"
                  />
                </div>
              </m.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 space-y-4"
                noValidate
              >
                <h3 className="font-display text-xl sm:text-2xl text-cream font-semibold mb-2">
                  Send a Message
                </h3>
                <p className="text-sm text-muted -mt-1 mb-8">
                  Fill out the form and we'll respond within 24 hours.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      autoComplete="name"
                      className={fieldClass("name")}
                    />
                    {errors.name && <p className="text-primary-light text-xs mt-1.5">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      autoComplete="email"
                      className={fieldClass("email")}
                    />
                    {errors.email && <p className="text-primary-light text-xs mt-1.5">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98000 00000"
                    autoComplete="tel"
                    className={fieldClass("phone")}
                  />
                  {errors.phone && <p className="text-primary-light text-xs mt-1.5">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your stay or event..."
                    rows={4}
                    className={`${fieldClass("message")} resize-none`}
                  />
                  {errors.message && <p className="text-primary-light text-xs mt-1.5">{errors.message}</p>}
                </div>

                {submitError && (
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-primary/8 border border-primary/15">
                    <IconMap name="AlertCircle" size={16} className="text-primary-light shrink-0 mt-0.5" />
                    <p className="text-primary-light text-sm">{submitError}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full !py-3.5"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <IconMap name="Send" size={16} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </m.div>

          {/* Info column */}
          <m.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-5 min-w-0"
          >
            {/* Resort card */}
            <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="border border-secondary/30 rounded-xl w-12 h-12 flex items-center justify-center bg-white shadow-[0_0_8px_rgba(184,122,28,0.12)]">
                  <img src={LogoImg} alt="" aria-hidden className="w-8 h-8 object-contain rounded-lg" />
                </div>
                <div>
                  <div className="flex flex-col leading-none min-w-0 overflow-hidden">
            <span
              className={`text-md md:text-base lg:text-lg font-display font-bold tracking-wide truncate transition-colors text-primary pb-1
              }`}
            >
              Red Fort
            </span>
            <span
              className={`text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-semibold font-body truncate transition-colors text-gradient-gold
              }`}
            >
              Resort
            </span>
          </div>
                </div>
              </div>

              <div className="space-y-3 ">
                {CONTACT_DETAILS.map(({ icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={icon === 'MapPin' ? '_blank' : undefined}
                    rel={icon === 'MapPin' ? 'noopener noreferrer' : undefined}
                    className="group flex gap-3"
                    style={{alignItems:'center'}}
                  >
                    <div className="w-8 h-8 shrink-0 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center mt-0.5 group-hover:bg-secondary/20 transition-colors">
                      <IconMap name={icon} size={14} className="text-secondary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted uppercase tracking-wider font-semibold mb-0.5">{label}</p>
                      <p className="text-sm text-cream/80 group-hover:text-secondary transition-colors leading-snug break-words">
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-border">
                <Button
                  variant="primary"
                  href={RESORT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full !py-3.5"
                >
                  <FaWhatsapp size={18} />
                  Chat on WhatsApp
                </Button>
              </div>
            </div>

            {/* Social links */}
            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">
                Follow Us
              </p>
              <div className="flex flex-wrap gap-2.5">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl glass flex items-center justify-center text-secondary hover:bg-secondary/15 hover:border-secondary/30 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(184,122,28,0.18)] transition-all duration-250"
                    aria-label={s.platform}
                  >
                    <IconMap name={s.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
