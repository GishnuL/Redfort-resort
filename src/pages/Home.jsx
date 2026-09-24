import { lazy, Suspense } from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';

// Below-the-fold sections are code-split so the initial bundle ships only
// Hero + About. Each gets its own Suspense boundary so one slow chunk never
// blocks the paint of the sections below it.
const Gallery      = lazy(() => import('../sections/Gallery'));
const Amenities    = lazy(() => import('../sections/Amenities'));
const Videos       = lazy(() => import('../sections/Videos'));
const Events       = lazy(() => import('../sections/Events'));
const MapSection   = lazy(() => import('../sections/MapSection'));
const NearbyPlaces = lazy(() => import('../sections/NearbyPlaces'));
const Contact      = lazy(() => import('../sections/Contact'));
const FAQ          = lazy(() => import('../sections/FAQ'));

/**
 * Reserves realistic vertical space while a section chunk loads so swapping
 * the placeholder for real content does not cause layout shift (CLS).
 */
function SectionFallback({ minHeight = '40rem' }) {
  return (
    <div
      className="section-padding"
      style={{ minHeight }}
      aria-hidden="true"
    />
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <Suspense fallback={<SectionFallback minHeight="44rem" />}>
        <Gallery />
      </Suspense>

      <About />

      <Suspense fallback={<SectionFallback minHeight="42rem" />}>
        <Amenities />
      </Suspense>

      <Suspense fallback={<SectionFallback minHeight="34rem" />}>
        <Videos />
      </Suspense>

      <Suspense fallback={<SectionFallback minHeight="40rem" />}>
        <Events />
      </Suspense>

      <Suspense fallback={<SectionFallback minHeight="36rem" />}>
        <MapSection />
      </Suspense>

      <Suspense fallback={<SectionFallback minHeight="46rem" />}>
        <NearbyPlaces />
      </Suspense>

      <Suspense fallback={<SectionFallback minHeight="44rem" />}>
        <Contact />
      </Suspense>

      <Suspense fallback={<SectionFallback minHeight="34rem" />}>
        <FAQ />
      </Suspense>
    </>
  );
}
