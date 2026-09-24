import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "../../utils/constants";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import logo from "../../assets/logo.png";

// Stable module-level reference. Building this inline in the component handed
// useScrollSpy a fresh array every render, which (because the hook uses it as
// an effect dependency) re-attached the scroll listener on every re-render.
const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isLight = !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full max-w-[100vw] transition-all duration-500 ${
        scrolled || mobileOpen
          ? "bg-dark/90 backdrop-blur-xl border-b border-border shadow-[0_2px_24px_rgba(45,34,24,0.08)]"
          : "bg-transparent backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <nav className="section-container flex items-center justify-between gap-2 h-16 md:h-20 min-w-0">
        {/* Logo */}
        <a
          href="#home"
          className="group flex items-center gap-2 min-w-0 shrink-0"
          aria-label="Red Fort Resort — home"
        >
          <div
            className={`rounded-xl p-0.5 transition-all duration-300 shrink-0 ${
              scrolled
                ? "border border-secondary/30 bg-white shadow-[0_0_12px_rgba(184,122,28,0.15)]"
                : "border border-white bg-white"
            }`}
          >
            <img
              src={logo}
              alt=""
              aria-hidden="true"
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain rounded-lg"
            />
          </div>
          <div className="flex flex-col leading-none min-w-0 overflow-hidden">
            <span
              className={`text-sm md:text-base lg:text-lg font-display font-bold tracking-wide truncate transition-colors duration-300 ${
                isLight ? "text-white drop-shadow-sm" : "text-primary "
              }`}
            >
              Red Fort
            </span>
            <span
              className={`text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-semibold font-body truncate transition-colors duration-300 ${
                isLight ? "text-white/70" : "text-gradient-gold"
              }`}
            >
              Resort
            </span>
          </div>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-7 xl:gap-9 shrink-0">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={`relative text-sm font-medium tracking-wide py-1.5 transition-colors duration-200 whitespace-nowrap ${
                  activeId === link.id
                    ? "text-secondary"
                    : isLight
                    ? "text-white/85 hover:text-white"
                    : "text-muted hover:text-cream"
                }`}
              >
                {link.label}
                {activeId === link.id && (
                  <m.span
                    layoutId="nav-active-line"
                    className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] rounded-full bg-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors shrink-0 ${
            isLight
              ? "text-white/85 hover:bg-white/12"
              : "text-muted hover:bg-black/5"
          }`}
        >
          <span className="sr-only">{mobileOpen ? "Close" : "Menu"}</span>
          <div className="w-5 h-4 flex flex-col justify-between pointer-events-none">
            <span
              className={`block h-[1.5px] rounded-full transition-all duration-300 origin-center ${
                isLight ? "bg-white" : "bg-cream"
              } ${mobileOpen ? "rotate-45 translate-y-[7.5px]" : ""}`}
            />
            <span
              className={`block h-[1.5px] rounded-full transition-all duration-300 ${
                isLight ? "bg-white" : "bg-cream"
              } ${mobileOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`block h-[1.5px] rounded-full transition-all duration-300 origin-center ${
                isLight ? "bg-white" : "bg-cream"
              } ${mobileOpen ? "-rotate-45 -translate-y-[7.5px]" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden absolute top-full left-0 right-0 overflow-y-auto"
            style={{
              height: 'calc(100dvh - 4rem)',
              background: 'rgba(255,249,242,0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div className="section-container py-6 flex flex-col h-full min-h-[calc(100dvh-4rem)]">
              <ul className="space-y-1 flex-1">
                {NAV_LINKS.map((link, i) => (
                  <m.li
                    key={link.id}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045, duration: 0.22 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => { document.body.style.overflow = ""; setMobileOpen(false); }}
                      className={`group flex items-center justify-between py-4 border-b transition-colors ${
                        activeId === link.id
                          ? "border-secondary/30 text-secondary"
                          : "border-border-soft text-cream/80 hover:text-cream"
                      }`}
                    >
                      <span className="font-display text-2xl font-semibold tracking-tight">
                        {link.label}
                      </span>
                    </a>
                  </m.li>
                ))}
              </ul>

              <m.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.22 }}
                className="mt-8 space-y-3 safe-bottom"
              >
                <p className="text-center text-xs text-muted pb-2">
                  Available 24/7 · Instant Response
                </p>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
