import { LazyMotion, domMax } from 'framer-motion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

export default function App() {
  return (
    // `m` components everywhere + a single feature bundle loaded once here.
    // domMax (not domAnimation) is required because Gallery uses layout
    // animations and Navbar uses a shared layoutId. `strict` makes any stray
    // full `motion.*` component throw, guaranteeing the migration stays complete.
    <LazyMotion features={domMax} strict>
      <BrowserRouter basename="/">
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LazyMotion>
  );
}
