import React, { useEffect } from 'react';
import { PricingCalculatorSalesPage } from '../components/calculator/PricingCalculatorSalesPage';

export const PricingCalculatorPage: React.FC = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "The 3-Minute Web Designer Pricing OS & Scope Shield — ElevateWeb";
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#070b14]">
      <PricingCalculatorSalesPage
        checkoutUrl="https://rzp.io/rzp/uk5DvJq"
        auditBookingUrl="https://elevateweb.me/#audit"
        supportEmail="zaid@elevateweb.me"
      />
    </div>
  );
};

export default PricingCalculatorPage;
