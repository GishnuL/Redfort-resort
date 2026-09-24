import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageLoader from '../components/layout/PageLoader';
import BackToTop from '../components/layout/BackToTop';
import WhatsAppFloat from '../components/layout/WhatsAppFloat';

export default function MainLayout() {
  const [loading, setLoading] = useState(true);
  
  
  return (
    <>
      {loading && <PageLoader onComplete={() => setLoading(false)} />}
      <Navbar />
      <main className="w-full max-w-[100vw] overflow-x-clip">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
    </>
  );
}
