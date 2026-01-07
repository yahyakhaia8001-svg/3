import React, { useEffect, useState, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import WhatsAppButton from './components/WhatsAppButton';
import StickyCTA from './components/StickyCTA';
import DealBanner from './components/DealBanner';
import SocialProofNotification from './components/SocialProofNotification';
import ExitPopup from './components/ExitPopup';
import CookieConsent from './components/CookieConsent';

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home'));
const Packages = lazy(() => import('./pages/Packages'));
const PackageDetail = lazy(() => import('./pages/PackageDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Services = lazy(() => import('./pages/Services'));
const TurkeyLP = lazy(() => import('./pages/TurkeyLP'));
const DubaiLP = lazy(() => import('./pages/DubaiLP'));
const OmraLP = lazy(() => import('./pages/OmraLP'));
const TurkeyIstanbul = lazy(() => import('./pages/destinations/TurkeyIstanbul'));
const TurkeyAntalya = lazy(() => import('./pages/destinations/TurkeyAntalya'));
const TurkeyCappadoce = lazy(() => import('./pages/destinations/TurkeyCappadoce'));
const Hajj = lazy(() => import('./pages/Hajj'));
const Umrah = lazy(() => import('./pages/Umrah'));
const OmraRamadan = lazy(() => import('./pages/OmraRamadan'));
const Egypt = lazy(() => import('./pages/destinations/Egypt'));
const Visa = lazy(() => import('./pages/Visa'));
const AssuranceVoyage = lazy(() => import('./pages/AssuranceVoyage'));
const VoyageDeNoces = lazy(() => import('./pages/VoyageDeNoces'));
const VacancesFamille = lazy(() => import('./pages/VacancesFamille'));
const VoyagesPasCher = lazy(() => import('./pages/VoyagesPasCher'));
const ConditionsGenerales = lazy(() => import('./pages/ConditionsGenerales'));
const PolitiqueConfidentialite = lazy(() => import('./pages/PolitiqueConfidentialite'));

// Loading fallback component
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-tropicam-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 font-medium">Chargement...</p>
    </div>
  </div>
);

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownPopup) {
        setShowExitPopup(true);
        setHasShownPopup(true);
      }
    };

    // Also show popup after 45 seconds if user hasn't left
    const timer = setTimeout(() => {
      if (!hasShownPopup) {
        setShowExitPopup(true);
        setHasShownPopup(true);
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [hasShownPopup]);

  return (
    <ErrorBoundary>
      <HashRouter>
        <ScrollToTop />
        <div className="font-sans text-gray-800 antialiased selection:bg-tropicam-orange selection:text-white overflow-x-hidden">
          {/* Deal Banner at very top */}
          <DealBanner />

          <Header />
          <main>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/packages/:id" element={<PackageDetail />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                {/* SEO Landing Pages - Outbound Travel (Moroccans traveling abroad) */}
                <Route path="/voyage-turquie" element={<TurkeyLP />} />
                <Route path="/voyage-dubai" element={<DubaiLP />} />
                <Route path="/omra-2025" element={<OmraLP />} />
                {/* Religious Travel - CRITICAL for Morocco */}
                <Route path="/hajj" element={<Hajj />} />
                <Route path="/omra" element={<Umrah />} />
                <Route path="/omra-ramadan" element={<OmraRamadan />} />
                {/* Service Pages */}
                <Route path="/visa" element={<Visa />} />
                <Route path="/assurance-voyage" element={<AssuranceVoyage />} />
                {/* Package Type Pages */}
                <Route path="/voyage-de-noces" element={<VoyageDeNoces />} />
                <Route path="/vacances-en-famille" element={<VacancesFamille />} />
                <Route path="/voyages-pas-cher" element={<VoyagesPasCher />} />
                {/* Legal Pages */}
                <Route path="/conditions-generales" element={<ConditionsGenerales />} />
                <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
                {/* Destination Sub-pages */}
                <Route path="/destinations/turquie/istanbul" element={<TurkeyIstanbul />} />
                <Route path="/destinations/turquie/antalya" element={<TurkeyAntalya />} />
                <Route path="/destinations/turquie/cappadoce" element={<TurkeyCappadoce />} />
                <Route path="/destinations/egypte" element={<Egypt />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />

          {/* Premium Interactive Elements */}
          <WhatsAppButton />
          <StickyCTA />
          <SocialProofNotification />
          <ExitPopup isOpen={showExitPopup} onClose={() => setShowExitPopup(false)} />
          <CookieConsent />
        </div>
      </HashRouter>
    </ErrorBoundary>
  );
};

export default App;