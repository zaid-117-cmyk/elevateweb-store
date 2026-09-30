import React, { useState } from 'react';
import { CubertoHero } from '../components/CubertoHero';
import { CubertoShowreel } from '../components/CubertoShowreel';
import { CubertoFeatures } from '../components/CubertoFeatures';
import { CubertoProducts } from '../components/CubertoProducts';
import { CubertoTestimonials } from '../components/CubertoTestimonials';
import { CubertoOutro } from '../components/CubertoOutro';
import { CubertoDivider } from '../components/CubertoDivider';
import { SampleModal } from '../components/SampleModal';

export const HomePage: React.FC = () => {
  const [sampleModalOpen, setSampleModalOpen] = useState(false);

  return (
    <div className="w-full bg-white text-black selection:bg-black selection:text-white">
      {/* 1. Giant Editorial Tophead Hero */}
      <CubertoHero />

      {/* Interactive Rubber-Band Divider */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        <CubertoDivider color="rgba(0,0,0,0.15)" />
      </div>

      {/* 2. Flagship The 1-Page Action Playbook Showreel Stage */}
      <CubertoShowreel productId="prod-1-page-action-playbook" onOpenSampleModal={() => setSampleModalOpen(true)} />

      {/* Interactive Rubber-Band Divider */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 my-6">
        <CubertoDivider color="rgba(0,0,0,0.15)" />
      </div>

      {/* Flagship The Action Masterplan Showreel Stage */}
      <CubertoShowreel productId="prod-action-masterplan" />

      {/* Interactive Rubber-Band Divider */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 my-6">
        <CubertoDivider color="rgba(0,0,0,0.15)" />
      </div>

      {/* 3. Interactive Curriculum & Frameworks Accordion */}
      <CubertoFeatures />

      {/* 4. Products Catalog */}
      <CubertoProducts />

      {/* 5. Trusted by Operators Testimonials */}
      <CubertoTestimonials />

      {/* 6. Giant Call to Action Outro */}
      <CubertoOutro />

      {/* Sample Chapter Modal Preview */}
      <SampleModal
        isOpen={sampleModalOpen}
        onClose={() => setSampleModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
