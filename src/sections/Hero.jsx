import { useState, useEffect, useCallback } from "react";
import { HERO_SLIDES } from "../utils/constants";
import IconMap from "../components/ui/IconMap";

/* ── Static style objects (hoisted so they are not re-created each render) ── */
const VIGNETTE = {
  background:
    "radial-gradient(ellipse 88% 76% at 50% 45%, rgba(6,3,1,0.12) 0%, rgba(6,3,1,0.76) 100%)",
};
const BOTTOM_BLEND = {
  background:
    "linear-gradient(to top, rgba(255,249,242,1) 0%, rgba(255,249,242,0.6) 28%, transparent 70%)",
};
const BRAND_TINT = {
  background:
    "linear-gradient(155deg, rgba(130,21,16,0.06) 0%, transparent 45%, rgba(184,122,28,0.04) 100%)",
};
const LABEL_LINE_L = { background: "linear-gradient(to right, transparent, rgba(212,168,67,0.7))" };
const LABEL_LINE_R = { background: "linear-gradient(to left, transparent, rgba(212,168,67,0.7))" };
const LABEL_TEXT = { color: "#d4a843", textShadow: "0 1px 14px rgba(0,0,0,0.85)" };
const HEAD_LINE1 = {
  fontSize: "clamp(2rem, 4.2vw + 0.5rem, 5rem)",
  color: "rgba(255,255,255,0.85)",
  textShadow: "0 2px 36px rgba(0,0,0,0.85)",
  letterSpacing: "0.06em",
};
const HEAD_LINE2 = {
  fontSize: "clamp(2.8rem, 6vw + 0.8rem, 7.2rem)",
  background: "linear-gradient(128deg, #fce9ba 0%, #f4cb6c 40%, #d49230 78%, #b87a1c 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  filter: "drop-shadow(0 3px 14px rgba(6,3,1,0.65))",
  letterSpacing: "-0.01em",
  lineHeight: "1.05",
};
const ORN_LINE_L = { background: "linear-gradient(to right, transparent, rgba(212,168,67,0.55))" };
const ORN_LINE_R = { background: "linear-gradient(to left, transparent, rgba(212,168,67,0.55))" };
const ORN_DOT = {
  display: "inline-block",
  width: "5px",
  height: "5px",
  borderRadius: "1px",
  background: "#d4a843",
  transform: "rotate(45deg)",
  boxShadow: "0 0 10px rgba(212,168,67,0.55)",
};
const SUBTITLE = {
  color: "rgba(238,228,214,0.72)",
  textShadow: "0 1px 20px rgba(0,0,0,0.9)",
};
const CTA = {
  color: "rgba(240,232,218,0.90)",
  background: "linear-gradient(135deg, #5c0f0b 0%, #7e1310 48%, #9d1f18 100%)",
  boxShadow: "0 6px 32px rgba(130,21,16,0.50), 0 2px 8px rgba(130,21,16,0.35)",
};
const INFO_BAR_PAD = { paddingBottom: "max(1.75rem, env(safe-area-inset-bottom, 1.75rem))" };
const INFO_BAR = {
  background: "rgba(8,4,2,0.68)",
  backdropFilter: "blur(28px) saturate(1.8)",
  borderLeft: "1px solid rgba(255,255,255,0.06)",
  borderRight: "1px solid rgba(255,255,255,0.06)",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  borderTop: "1px solid rgba(212,168,67,0.30)",
};
const SECTION_SIZE = { height: "100dvh", minHeight: "560px", maxHeight: "1040px" };

const INFO_STATS = [
  { icon: "Star",         value: "4.9",     label: "Guest Rating" },
  { icon: "Users",        value: "12,500+", label: "Happy Guests" },
  { icon: "CalendarDays", value: "7+ Yrs",  label: "Excellence"   },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  // The first slide is the LCP element; additional slides are not mounted
  // until it has loaded, so they never compete for bandwidth on first paint.
  const [ready, setReady] = useState(false);

  const markReady = useCallback(() => setReady(true), []);

  // Cross-fade slideshow starts only after the LCP image is ready.
  useEffect(() => {
    if (!ready || HERO_SLIDES.length < 2) return;
    const t = setInterval(
      () => setCurrent((c) => (c + 1) % HERO_SLIDES.length),
      6500
    );
    return () => clearInterval(t);
  }, [ready]);

  return (
    <section
      id="home"
      aria-label="Resort hero"
      className="relative w-full overflow-hidden"
      style={SECTION_SIZE}
    >
      {/* ── Background images ──────────────────────────────── */}
      <div className="absolute inset-0" aria-hidden="true">
        {HERO_SLIDES.map((slide, i) => {
          // Defer every non-first slide until the LCP image has loaded.
          if (i !== 0 && !ready) return null;
          const isFirst = i === 0;
          return (
            <img
              key={slide.image}
              src={slide.image}
              srcSet={slide.srcSet}
              sizes={slide.sizes}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              fetchPriority={isFirst ? "high" : "low"}
              decoding="async"
              loading={isFirst ? "eager" : "lazy"}
              onLoad={isFirst ? markReady : undefined}
              ref={isFirst ? (el) => { if (el?.complete) markReady(); } : undefined}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{ opacity: i === current ? 1 : 0 }}
            />
          );
        })}

        {/* Vignette: dark edges, center photo visible */}
        <div className="absolute inset-0" style={VIGNETTE} />
        {/* Top for navbar */}
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-black/58 to-transparent" />
        {/* Bottom: blend into warm cream page background */}
        <div className="absolute bottom-0 left-0 right-0 h-72" style={BOTTOM_BLEND} />
        {/* Subtle warm brand tint */}
        <div className="absolute inset-0" style={BRAND_TINT} />
      </div>

      {/* ── Hero content — centered ────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 sm:px-8">
        <div className="w-full max-w-3xl xl:max-w-[52rem]">

          {/* Label */}
          <div
            className="hero-enter flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-7"
            style={{ animationDelay: "0.18s" }}
          >
            <span className="hidden sm2:block h-px w-10 sm:w-20" style={LABEL_LINE_L} />
            <span
              className="text-[8px] sm:text-[10px] font-bold tracking-[0.14em] sm:tracking-[0.26em] uppercase whitespace-nowrap"
              style={LABEL_TEXT}
            >
              Luxury Heritage Retreat · Est. 2019
            </span>
            <span className="hidden sm2:block h-px w-10 sm:w-20" style={LABEL_LINE_R} />
          </div>

          {/* Main heading */}
          <h1
            className="hero-enter font-display text-center"
            style={{ lineHeight: "1.08", animationDelay: "0.30s" }}
          >
            <span className="block font-normal" style={HEAD_LINE1}>
              Where Luxury
            </span>
            <span className="block font-semibold italic" style={HEAD_LINE2}>
              Meets Heritage
            </span>
          </h1>

          {/* Gold ornament */}
          <div
            className="hero-enter-grow flex items-center justify-center gap-3 mt-5 sm:mt-6"
            style={{ animationDelay: "0.50s" }}
          >
            <span className="h-px w-16 sm:w-24" style={ORN_LINE_L} />
            <span style={ORN_DOT} />
            <span className="h-px w-16 sm:w-24" style={ORN_LINE_R} />
          </div>

          {/* Subtitle */}
          <p
            className="hero-enter mt-5 sm:mt-6 text-sm sm:text-base md:text-lg leading-relaxed max-w-sm sm:max-w-lg mx-auto"
            style={{ ...SUBTITLE, animationDelay: "0.60s" }}
          >
            An exclusive hillside sanctuary where modern luxury meets untouched nature
            — Siruvani Hills, Coimbatore.
          </p>

          {/* CTAs */}
          <div
            className="hero-enter flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 w-full"
            style={{ animationDelay: "0.74s" }}
          >
            <a
              href="#about"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-[15px] transition-all duration-300 hover:-translate-y-1"
              style={CTA}
            >
              Explore Resort
              <IconMap name="ArrowRight" size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom info bar ────────────────────────────────── */}
      <div
        className="hero-enter absolute bottom-0 left-0 right-0 z-20"
        style={{ ...INFO_BAR_PAD, animationDelay: "0.90s" }}
      >
        <div className="flex justify-center px-4">
          <div
            className="inline-flex items-center gap-4 sm:gap-5 px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl"
            style={INFO_BAR}
          >
            {INFO_STATS.map(({ icon, value, label }, i) => (
              <div key={label} className="flex items-center gap-2 sm:gap-2.5">
                {i > 0 && (
                  <span className="w-px h-7 bg-white/10 mr-1 sm:mr-1.5 shrink-0" />
                )}
                <span style={{ color: "#d4a843" }} className="shrink-0">
                  <IconMap name={icon} size={13} />
                </span>
                <div className="leading-none">
                  <p
                    className="text-[12px] sm:text-[13.5px] font-bold text-white/88 leading-none whitespace-nowrap"
                    aria-label={`${value} ${label}`}
                  >
                    {value}
                  </p>
                  <p
                    className="text-[9px] sm:text-[10px] text-white/40 mt-[3px] leading-none hidden sm:block whitespace-nowrap"
                    aria-hidden="true"
                  >
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
