import { useRef, useState } from 'react';
import { m } from 'framer-motion';
import { SHORT_VIDEOS } from '../utils/constants';
import SectionHeading from '../components/ui/SectionHeading';
import IconMap from '../components/ui/IconMap';

function VideoCard({ item }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {});
    setPlaying(true);
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setPlaying(false);
  };

  return (
    <div
      className="relative flex-shrink-0 w-[min(calc(100vw-2rem),220px)] sm:w-[260px] md:w-[300px] rounded-2xl overflow-hidden glass-card group cursor-pointer snap-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_56px_rgba(45,34,24,0.14)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="aspect-[9/16] relative">
        <video
          ref={videoRef}
          src={item.video}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover"
        />

        {/* Play overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            playing ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ background: 'linear-gradient(180deg, rgba(15,10,8,0.15) 0%, rgba(15,10,8,0.55) 100%)' }}
        >
          <m.div
            whileHover={{ scale: 1.1 }}
            className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center"
          >
            <IconMap name="Play" size={22} className="text-white ml-1" />
          </m.div>
        </div>

        {/* Caption bar */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
          <p className="text-sm font-semibold text-white leading-tight">{item.title}</p>
          <p className="text-xs text-white/55 mt-0.5">Hover to preview</p>
        </div>

        {/* Playing indicator */}
        {playing && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] text-white/75 font-semibold">Live</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Videos() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const card = scrollRef.current?.querySelector('[data-video-card]');
    const cardWidth = card?.offsetWidth ?? 280;
    scrollRef.current?.scrollBy({ left: dir * (cardWidth + 16), behavior: 'smooth' });
  };

  return (
    <section id="videos" className="section-padding bg-dark-soft overflow-hidden">
      <div className="section-container mb-4 sm:mb-6">
        <SectionHeading
          label="Experience"
          title="Resort Reels"
          subtitle="Short glimpses into the Red Fort Resort lifestyle."
        />
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar"
        style={{
          paddingLeft: 'max(1rem, calc((100% - min(100%, 80rem)) / 2 + 1rem))',
          paddingRight: 'max(1rem, calc((100% - min(100%, 80rem)) / 2 + 1rem))',
        }}
      >
        {SHORT_VIDEOS.map((item) => (
          <div key={item.title} data-video-card>
            <VideoCard item={item} />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <button
          type="button"
          onClick={() => scroll(-1)}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-secondary hover:bg-secondary/10 hover:border-secondary/30 hover:-translate-x-0.5 transition-all duration-200"
          aria-label="Scroll left"
        >
          <IconMap name="ChevronLeft" size={18} />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-secondary hover:bg-secondary/10 hover:border-secondary/30 hover:translate-x-0.5 transition-all duration-200"
          aria-label="Scroll right"
        >
          <IconMap name="ChevronRight" size={18} />
        </button>
      </div>
    </section>
  );
}
