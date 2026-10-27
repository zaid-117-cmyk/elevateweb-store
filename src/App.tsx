import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import { SelfTrustLandingPage } from './pages/SelfTrustLandingPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { PartnerDashboardPage } from './pages/PartnerDashboardPage';

const AppContent: React.FC = () => {
  // Initialize Lenis buttery smooth scrolling
  useLenis();

  return (
    <div className="flex flex-col min-h-screen bg-[#050811] text-slate-100 selection:bg-rose-500 selection:text-white">
      <main className="flex-1">
        <Routes>
          {/* Main Funnel Landing Page (Exclusively for Self-Trust OS) */}
          <Route path="/" element={<SelfTrustLandingPage />} />
          <Route path="/self-trust" element={<SelfTrustLandingPage />} />
          <Route path="/the-self-trust-protocol" element={<SelfTrustLandingPage />} />
          <Route path="/self-trust-protocol" element={<SelfTrustLandingPage />} />
          
          {/* User Streak & Execution Dashboard */}
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/self-trust/dashboard" element={<UserDashboardPage />} />

          {/* Confidential YouTuber Affiliate Revenue Dashboard (@youthphilosophy22) */}
          <Route path="/partner-dashboard" element={<PartnerDashboardPage />} />
          <Route path="/partner" element={<PartnerDashboardPage />} />

          {/* Any legacy product route redirects cleanly to the main funnel */}
          <Route path="*" element={<Navigate to="/self-trust" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
