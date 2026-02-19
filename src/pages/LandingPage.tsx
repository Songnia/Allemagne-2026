import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { m3Colors } from '@/theme/m3-theme';

// Sections
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';
import PricingSection from '@/components/landing/PricingSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FAQSection from '@/components/landing/FAQSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

// Modals
import EligibilityModal from '@/components/modals/EligibilityModal';
import AuthModal from '@/components/modals/AuthModal';
import PaymentModal from '@/components/modals/PaymentModal';

// Common
import StickyBottomBar from '@/components/common/StickyBottomBar';

function LandingPage() {
  const {
    ui,
    openEligibilityModal,
    closeEligibilityModal,
    openAuthModal,
    closeAuthModal,
    closePaymentModal,
  } = useAppStore();

  useEffect(() => {
    // Update page title
    document.title = 'ALLEMAGNE2026 | Votre passeport pour l\'Allemagne';

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Guide complet pour immigrer en Allemagne. Chancenkarte, visa travail, études. De la première démarche à l\'installation.');
    }
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: m3Colors.surface }}
    >
      {/* Hero Section */}
      <HeroSection onAccessPlatform={openAuthModal} />

      {/* Problem/Agitation Section */}
      <ProblemSection />

      {/* Solution Section */}
      <SolutionSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection onCheckEligibility={openEligibilityModal} />

      {/* Footer */}
      <Footer />

      {/* Sticky Bottom Bar */}
      <StickyBottomBar
        onCheckEligibility={openEligibilityModal}
        onAccessPlatform={openAuthModal}
      />

      {/* Modals */}
      <EligibilityModal
        open={ui.isEligibilityModalOpen}
        onClose={closeEligibilityModal}
        onContinue={openAuthModal}
      />

      <AuthModal
        open={ui.isAuthModalOpen}
        onClose={closeAuthModal}
      />

      <PaymentModal
        open={ui.isPaymentModalOpen}
        onClose={closePaymentModal}
        selectedTier={ui.selectedPricingTier}
      />
    </div>
  );
}

export default LandingPage;
