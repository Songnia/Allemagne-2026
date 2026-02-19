import { useState, useEffect } from 'react';
import { Box, Button, Container } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { m3Colors } from '@/theme/m3-theme';
import { useAppStore } from '@/store/useAppStore';

interface StickyBottomBarProps {
  onCheckEligibility: () => void;
  onAccessPlatform: () => void;
}

function StickyBottomBar({ onCheckEligibility, onAccessPlatform }: StickyBottomBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { isAuthenticated } = useAppStore();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAuthenticated) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: m3Colors.surface,
        borderTop: `1px solid ${m3Colors.outlineVariant}`,
        boxShadow: '0px -4px 8px 3px rgba(0, 0, 0, 0.1)',
        py: 2,
        px: 2,
        zIndex: 1000,
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={onAccessPlatform}
            endIcon={<ArrowForward />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'none',
              borderRadius: '4px',
              backgroundColor: '#C0001A',
              color: m3Colors.onPrimary,
              '&:hover': {
                backgroundColor: '#C0001A',
              },
            }}
          >
            Accéder à la plateforme
          </Button>
          
          <Button
            variant="outlined"
            fullWidth
            onClick={onCheckEligibility}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'none',
              borderRadius: '4px',
              borderColor: '#C0001A',
              color: m3Colors.onSurface,
              '&:hover': {
                borderColor: '#C0001A',
                backgroundColor: 'transparent',
              },
            }}
          >
            Vérifier mon éligibilité
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default StickyBottomBar;
