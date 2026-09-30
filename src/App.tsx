import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './hooks/useCart';
import { useLenis } from './hooks/useLenis';
import { CubertoNav } from './components/CubertoNav';
import { CubertoFooter } from './components/CubertoFooter';
import { CubertoCursor } from './components/CubertoCursor';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CartDrawer } from './components/CartDrawer';

const AppContent: React.FC = () => {
  // Initialize Lenis + GSAP buttery smooth scrolling
  useLenis();

  return (
    <div className="flex flex-col min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* Cuberto Custom Magnetic Follower Cursor */}
      <CubertoCursor />

      {/* Global Navigation */}
      <CubertoNav />

      {/* Main View */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <CubertoFooter />

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
