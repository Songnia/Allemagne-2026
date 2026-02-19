import { useEffect, useRef, useState } from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { ArrowForward, CheckCircle } from '@mui/icons-material';
import { landingColors as m3Colors, germanFlag } from '@/theme/m3-theme';

interface CTASectionProps {
  onCheckEligibility: () => void;
}

const benefits = [
  'Vérification gratuite en 30 secondes',
  'Guide étape par étape',
  'Communauté de soutien',
  'Mises à jour gratuites',
];

function CTASection({ onCheckEligibility }: CTASectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: m3Colors.surface,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            background: `linear-gradient(135deg, ${m3Colors.primary} 0%, ${germanFlag.black} 100%)`,
            borderRadius: '24px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
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
              opacity: 0.1,
              backgroundImage: `radial-gradient(circle at 20% 50%, white 0%, transparent 50%),
                                radial-gradient(circle at 80% 80%, white 0%, transparent 50%)`,
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Headline */}
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '28px', md: '40px' },
                fontWeight: 700,
                color: m3Colors.onPrimary,
                mb: 3,
              }}
            >
              Prêt à commencer votre projet ?
            </Typography>

            {/* Subheadline */}
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '16px', md: '18px' },
                fontWeight: 400,
                color: `${m3Colors.onPrimary}CC`,
                maxWidth: 600,
                mx: 'auto',
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              Vérifiez votre éligibilité gratuitement et découvrez comment
              ALLEMAGNE2026 peut vous aider à réaliser votre rêve.
            </Typography>

            {/* Benefits */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: { xs: 2, md: 4 },
                mb: 5,
              }}
            >
              {benefits.map((benefit, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: germanFlag.gold,
                  }}
                >
                  <CheckCircle sx={{ fontSize: 18, color: germanFlag.gold }} />
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#FFFFFF' }}>
                    {benefit}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* CTA Button */}
            <Button
              variant="contained"
              size="large"
              onClick={onCheckEligibility}
              endIcon={<ArrowForward />}
              sx={{
                px: 5,
                py: 1.5,
                fontSize: '18px',
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: '4px',
                backgroundColor: germanFlag.gold,
                color: germanFlag.black,
                boxShadow: `0px 4px 12px ${germanFlag.gold}60`,
                '&:hover': {
                  backgroundColor: '#E6B800',
                  boxShadow: `0px 6px 16px ${germanFlag.gold}80`,
                },
              }}
            >
              Vérifier mon éligibilité
            </Button>

            {/* Trust Note */}
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mt: 3,
                color: `${m3Colors.onPrimary}99`,
              }}
            >
              Gratuit et sans engagement • Résultat en 30 secondes
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default CTASection;
