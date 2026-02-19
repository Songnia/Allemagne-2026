import { useEffect, useState, useRef } from 'react';
import { Button, Container, Box, Typography, Chip } from '@mui/material';
import { TrendingUp, CheckCircle, ArrowForward } from '@mui/icons-material';
import { landingColors as m3Colors, germanFlag } from '@/theme/m3-theme';
import { useAppStore } from '@/store/useAppStore';

interface HeroSectionProps {
  onCheckEligibility: () => void;
  onAccessPlatform: () => void;
}

function HeroSection({ onCheckEligibility, onAccessPlatform }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAppStore();

  const handleScrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setIsVisible(true);

    // Animate counter
    const targetCount = 172422;
    const duration = 2000;
    const steps = 60;
    const increment = targetCount / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${m3Colors.surface} 0%, ${m3Colors.surfaceVariant} 100%)`,
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `radial-gradient(circle at 20% 50%, ${m3Colors.primary} 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, ${m3Colors.tertiary} 0%, transparent 50%)`,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: 'center',
            gap: { xs: 4, lg: 8 },
            py: { xs: 8, md: 12 },
          }}
        >
          {/* Left Content */}
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: 'center', lg: 'left' },
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
            }}
          >
            {/* Badge */}
            <Chip
              icon={<TrendingUp sx={{ fontSize: 16, color: germanFlag.goldDark }} />}
              label="Nouvelle opportunité 2026"
              sx={{
                mb: 3,
                backgroundColor: germanFlag.gold,
                color: germanFlag.black,
                fontWeight: 700,
                border: `1px solid ${germanFlag.goldDark}`,
                '& .MuiChip-icon': {
                  color: germanFlag.goldDark,
                },
              }}
            />

            {/* Headline */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '36px', sm: '45px', md: '57px' },
                fontWeight: 700,
                lineHeight: { xs: 1.2, md: 1.1 },
                color: m3Colors.onSurface,
                mb: 3,
                letterSpacing: '-0.25px',
              }}
            >
              Le Canada ferme.
              <br />
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(135deg, ${m3Colors.primary} 0%, ${m3Colors.tertiary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                L'Allemagne ouvre.
              </Box>
            </Typography>

            {/* Subheadline */}
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '18px', md: '22px' },
                fontWeight: 400,
                lineHeight: 1.5,
                color: m3Colors.onSurfaceVariant,
                mb: 4,
                maxWidth: { xs: '100%', lg: '90%' },
              }}
            >
              Guide complet pour immigrer en Allemagne avec la Chancenkarte.
              De la première démarche à l'installation, étape par étape.
            </Typography>

            {/* Stats Counter */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', lg: 'flex-start' },
                gap: 2,
                mb: 4,
                p: 2,
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${germanFlag.goldLight} 0%, ${germanFlag.gold}40 100%)`,
                border: `1px solid ${germanFlag.gold}`,
                width: 'fit-content',
                mx: { xs: 'auto', lg: 0 },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '28px', md: '36px' },
                  fontWeight: 700,
                  color: germanFlag.goldDark,
                }}
              >
                {count.toLocaleString('fr-FR')}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: m3Colors.onSurfaceVariant,
                  maxWidth: 120,
                  lineHeight: 1.4,
                }}
              >
                visas Allemagne délivrés en 2024
              </Typography>
            </Box>

            {/* Comparison */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: { xs: 'center', lg: 'flex-start' },
                gap: { xs: 2, sm: 4 },
                mb: 5,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: m3Colors.primary,
                }}
              >
                <CheckCircle sx={{ fontSize: 20 }} />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  €11,904 requis
                </Typography>
              </Box>
              <Box
                sx={{
                  width: { xs: 40, sm: 1 },
                  height: { xs: 1, sm: 20 },
                  backgroundColor: m3Colors.outlineVariant,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: m3Colors.onSurfaceVariant,
                  textDecoration: 'line-through',
                }}
              >
                Canada: $30,000+
              </Typography>
            </Box>

            {/* CTA Buttons */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                justifyContent: { xs: 'center', lg: 'flex-start' },
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleScrollToPricing}
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
                  boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
                  '&:hover': {
                    backgroundColor: '#C0001A',
                    boxShadow: '0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                Voir les Tarifs
              </Button>

              {!isAuthenticated && (
                <Button
                  variant="outlined"
                  onClick={onAccessPlatform}
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '16px',
                    fontWeight: 500,
                    textTransform: 'none',
                    borderRadius: '4px',
                    borderColor: m3Colors.outline,
                    color: m3Colors.onSurface,
                    '&:hover': {
                      borderColor: m3Colors.primary,
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  se connecter
                </Button>
              )}
            </Box>
          </Box>

          {/* Right Content - Visual */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1) 0.2s',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: 280, sm: 350, md: 450 },
                height: { xs: 280, sm: 350, md: 450 },
              }}
            >
              {/* Main Circle */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80%',
                  height: '80%',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${m3Colors.primary}20 0%, ${m3Colors.tertiary}20 100%)`,
                  border: `2px solid ${m3Colors.primary}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '64px', md: '96px' },
                    fontWeight: 700,
                    color: m3Colors.primary,
                  }}
                >
                  DE
                </Typography>
              </Box>

              {/* Orbiting Elements */}
              {[0, 1, 2, 3].map((i) => (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: { xs: 40, md: 50 },
                    height: { xs: 40, md: 50 },
                    borderRadius: '50%',
                    backgroundColor: m3Colors.surface,
                    boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: `orbit${i} 20s linear infinite`,
                    '@keyframes orbit0': {
                      '0%': { transform: 'translate(-50%, -50%) rotate(0deg) translateX(140px) rotate(0deg)' },
                      '100%': { transform: 'translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg)' },
                    },
                    '@keyframes orbit1': {
                      '0%': { transform: 'translate(-50%, -50%) rotate(90deg) translateX(160px) rotate(-90deg)' },
                      '100%': { transform: 'translate(-50%, -50%) rotate(450deg) translateX(160px) rotate(-450deg)' },
                    },
                    '@keyframes orbit2': {
                      '0%': { transform: 'translate(-50%, -50%) rotate(180deg) translateX(130px) rotate(-180deg)' },
                      '100%': { transform: 'translate(-50%, -50%) rotate(540deg) translateX(130px) rotate(-540deg)' },
                    },
                    '@keyframes orbit3': {
                      '0%': { transform: 'translate(-50%, -50%) rotate(270deg) translateX(150px) rotate(-270deg)' },
                      '100%': { transform: 'translate(-50%, -50%) rotate(630deg) translateX(150px) rotate(-630deg)' },
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontSize: { xs: '20px', md: '24px' },
                    }}
                  >
                    {['✈️', '💼', '🏠', '🎓'][i]}
                  </Box>
                </Box>
              ))}

              {/* Center Badge */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '10%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  px: 3,
                  py: 1,
                  borderRadius: '20px',
                  backgroundColor: germanFlag.gold,
                  color: germanFlag.black,
                  fontWeight: 700,
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  boxShadow: `0 2px 8px ${germanFlag.gold}80`,
                }}
              >
                🇩🇪 Chancenkarte 2026
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;
