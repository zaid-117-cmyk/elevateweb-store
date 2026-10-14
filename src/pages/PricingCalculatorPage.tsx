import React, { useEffect } from 'react';
import { PricingCalculatorSalesPage } from '../components/calculator/PricingCalculatorSalesPage';
import { PRODUCTS } from '../lib/products';
import { useCart } from '../hooks/useCart';

export const PricingCalculatorPage: React.FC = () => {
  const product = PRODUCTS.find((p) => p.slug === 'pricing-calculator');
  const { addToCart, openCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "The 3-Minute Freelancer & Agency Pricing Calculator — ElevateWeb";
  }, []);

  const handleBuy = () => {
    if (product) {
      addToCart(product, 'standard');
      openCart();
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#070b14]">
      <PricingCalculatorSalesPage
        checkoutUrl={product?.paymentUrl || 'https://rzp.io/rzp/your-checkout-url'}
        auditBookingUrl="https://elevateweb.me/#audit"
        supportEmail="zaid@elevateweb.me"
        onBuyClick={handleBuy}
      />
    </div>
  );
};

export default PricingCalculatorPage;
