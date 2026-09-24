import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Splits node_modules into stable, long-cacheable vendor chunks.
 * Order matters: more specific matches are tested before generic ones
 * (e.g. `react-icons` / `react-router` must be caught before bare `react`).
 *
 * Lazy-only libraries (Radix dialog → Gallery, EmailJS → Contact) are kept
 * in their own chunks so they download only when those lazy sections mount,
 * never in the initial payload.
 */
function manualChunks(id) {
  if (!id.includes('node_modules')) return

  // framer-motion + its runtime deps (loaded eagerly via Hero/Navbar/About)
  if (
    id.includes('node_modules/framer-motion') ||
    id.includes('node_modules/motion-dom') ||
    id.includes('node_modules/motion-utils')
  ) {
    return 'framer-motion'
  }

  // react-icons (loaded eagerly via IconMap) — large, isolate for caching
  if (id.includes('node_modules/react-icons')) return 'icons'

  // Radix dialog — only used by the lazy Gallery lightbox
  if (id.includes('node_modules/@radix-ui')) return 'radix'

  // EmailJS — only used by the lazy Contact form
  if (id.includes('node_modules/@emailjs')) return 'emailjs'

  // React core + router (eager, rarely changes → ideal long-term cache unit)
  if (
    id.includes('node_modules/react-router') ||
    id.includes('node_modules/react-dom') ||
    id.includes('node_modules/react/') ||
    id.includes('node_modules/scheduler') ||
    id.includes('node_modules/cookie') ||
    id.includes('node_modules/set-cookie-parser')
  ) {
    return 'react-vendor'
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks,
        // Content-hashed, predictable paths for aggressive long-term caching.
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash][extname]',
      },
    },
  },
})
