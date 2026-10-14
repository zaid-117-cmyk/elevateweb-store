import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './hooks/useCart';
import { useLenis } from './hooks/useLenis';
import { CubertoNav } from './components/CubertoNav';
import { CubertoFooter } from './components/CubertoFooter';
import { CubertoCursor } from './components/CubertoCursor';
import { useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { MeditationLandingPage } from './pages/MeditationLandingPage';
import { PricingCalculatorPage } from './pages/PricingCalculatorPage';
import { CartDrawer } from './components/CartDrawer';

const AppContent: React.FC = () => {
  // Initialize Lenis + GSAP buttery smooth scrolling
  useLenis();
  const location = useLocation();

  const isCalculatorPage = 
    location.pathname.startsWith('/pricing-calculator') || 
    location.pathname.startsWith('/calculator') || 
    location.pathname.startsWith('/freelance-pricing-calculator');

  return (
    <div className={`flex flex-col min-h-screen ${isCalculatorPage ? 'bg-[#070b14] text-slate-100' : 'bg-white text-black'} selection:bg-emerald-500 selection:text-slate-950`}>
      {/* Cuberto Custom Magnetic Follower Cursor */}
      <CubertoCursor />

      {/* Global Navigation (omitted on dedicated SaaS dark landing pages) */}
      {!isCalculatorPage && <CubertoNav />}

      {/* Main View */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing-calculator" element={<PricingCalculatorPage />} />
          <Route path="/calculator" element={<PricingCalculatorPage />} />
          <Route path="/freelance-pricing-calculator" element={<PricingCalculatorPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/meditation" element={<MeditationLandingPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
        </Routes>
      </main>

      {/* Global Footer (omitted on dedicated SaaS dark landing pages with built-in footer) */}
      {!isCalculatorPage && <CubertoFooter />}

      {/* Global Cart Drawer */}
      <CartDrawer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
