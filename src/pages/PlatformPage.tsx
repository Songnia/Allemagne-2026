import { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { m3Colors } from '@/theme/m3-theme';
import { useAppStore } from '@/store/useAppStore';

// Platform Components
import NavigationBar from '@/components/platform/NavigationBar';
import RoadmapView from '@/components/platform/RoadmapView';
import ArticlesView from '@/components/platform/ArticlesView';
import ProfileView from '@/components/platform/ProfileView';
import PaymentModal from '@/components/modals/PaymentModal';

function PlatformPage() {
  const { ui, setActiveTab, closePaymentModal } = useAppStore();

  useEffect(() => {
    document.title = 'Ma Roadmap | ALLEMAGNE2026';
  }, []);

  const renderContent = () => {
    switch (ui.activeTab) {
      case 'roadmap':
        return <RoadmapView />;
      case 'articles':
        return <ArticlesView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <RoadmapView />;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: m3Colors.surface,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          pb: { xs: 10, md: 4 }, // Padding bottom for mobile nav
          pt: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          {renderContent()}
        </Container>
      </Box>

      {/* Navigation */}
      <NavigationBar activeTab={ui.activeTab} onTabChange={setActiveTab} />

      {/* Payment Modal */}
      <PaymentModal
        open={ui.isPaymentModalOpen}
        onClose={closePaymentModal}
        selectedTier={ui.selectedPricingTier}
      />
    </Box>
  );
}

export default PlatformPage;
