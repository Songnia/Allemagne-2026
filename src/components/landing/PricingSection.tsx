import { useEffect, useRef, useState } from 'react';
import { Container, Box, Typography, Paper, Button, Chip, Divider } from '@mui/material';
import { Check, Star, ArrowForward } from '@mui/icons-material';
import { landingColors as m3Colors, germanFlag } from '@/theme/m3-theme';
import { useAppStore } from '@/store/useAppStore';
import { pricingTiers } from '@/data/mockData';

function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { openPaymentModal } = useAppStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSelectTier = (tierId: string) => {
    // Ouvrir directement le modal de paiement
    openPaymentModal(tierId as any);
  };

  return (
    <Box
      ref={sectionRef}
      id="pricing"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: m3Colors.surfaceContainerLow,
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 8,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
          }}
        >
          <Chip
            label="TARIFS"
            sx={{
              mb: 2,
              backgroundColor: germanFlag.gold,
              color: germanFlag.black,
              fontWeight: 700,
              border: `1px solid ${germanFlag.goldDark}`,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '28px', md: '36px' },
              fontWeight: 700,
              color: m3Colors.onSurface,
              mb: 3,
            }}
          >
            Choisissez votre formule
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '16px', md: '18px' },
              fontWeight: 400,
              color: m3Colors.onSurfaceVariant,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Investissez dans votre avenir. Un paiement unique, un accès à vie aux mises à jour.
          </Typography>
        </Box>

        {/* Pricing Cards */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          {pricingTiers.filter(t => t.price > 0).map((tier, index) => (
            <Paper
              key={tier.id}
              elevation={0}
              sx={{
                flex: 1,
                maxWidth: { xs: '100%', md: 420 },
                p: { xs: 3, md: 4 },
                backgroundColor: tier.recommended ? m3Colors.surface : m3Colors.surfaceContainerLowest,
                borderRadius: '16px',
                border: `2px solid ${tier.recommended ? m3Colors.primary : m3Colors.outlineVariant}`,
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) ${index * 0.15}s`,
                '&:hover': {
                  boxShadow: tier.recommended
                    ? '0px 8px 12px 6px rgba(0, 0, 0, 0.15)'
                    : '0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              {/* Recommended Badge */}
              {tier.recommended && (
                <Chip
                  icon={<Star sx={{ fontSize: 16 }} />}
                  label="RECOMMANDÉ"
                  sx={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: m3Colors.primary,
                    color: m3Colors.onPrimary,
                    fontWeight: 600,
                    fontSize: '12px',
                    '& .MuiChip-icon': {
                      color: m3Colors.onPrimary,
                    },
                  }}
                />
              )}

              {/* Tier Name */}
              <Typography
                variant="h4"
                sx={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: m3Colors.onSurface,
                  mb: 1,
                  textAlign: 'center',
                }}
              >
                {tier.name}
              </Typography>

              {/* Description */}
              <Typography
                variant="body2"
                sx={{
                  color: m3Colors.onSurfaceVariant,
                  textAlign: 'center',
                  mb: 3,
                  minHeight: 40,
                }}
              >
                {tier.description}
              </Typography>

              {/* Price */}
              <Box
                sx={{
                  textAlign: 'center',
                  mb: 3,
                }}
              >
                <Typography
                  variant="h2"
                  component="span"
                  sx={{
                    fontSize: { xs: '40px', md: '48px' },
                    fontWeight: 700,
                    color: tier.recommended ? m3Colors.primary : m3Colors.onSurface,
                  }}
                >
                  {tier.price.toLocaleString('fr-FR')}
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    color: m3Colors.onSurfaceVariant,
                    ml: 0.5,
                  }}
                >
                  {tier.currency}
                </Typography>
              </Box>

              <Divider sx={{ mb: 3, borderColor: m3Colors.outlineVariant }} />

              {/* Features */}
              <Box sx={{ mb: 4 }}>
                {tier.features.map((feature, featureIndex) => (
                  <Box
                    key={featureIndex}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      mb: 2,
                    }}
                  >
                    <Check
                      sx={{
                        color: tier.recommended ? m3Colors.primary : m3Colors.secondary,
                        fontSize: 20,
                        mt: 0.3,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: m3Colors.onSurface,
                        lineHeight: 1.5,
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* CTA Button - Ouvre directement le paiement */}
              <Button
                fullWidth
                variant={tier.recommended ? 'contained' : 'outlined'}
                size="large"
                onClick={() => handleSelectTier(tier.id)}
                endIcon={<ArrowForward />}
                sx={{
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '16px',
                  borderRadius: '4px',
                  ...(tier.recommended
                    ? {
                      backgroundColor: m3Colors.primary,
                      color: m3Colors.onPrimary,
                      '&:hover': {
                        backgroundColor: '#0049A0015F4F',
                      },
                    }
                    : {
                      borderColor: m3Colors.outline,
                      color: m3Colors.onSurface,
                      '&:hover': {
                        borderColor: m3Colors.primary,
                        backgroundColor: 'transparent',
                      },
                    }),
                }}
              >
                {tier.buttonText}
              </Button>
            </Paper>
          ))}
        </Box>

        {/* Note sur les codes */}
        <Box
          sx={{
            mt: 6,
            p: 3,
            background: `linear-gradient(135deg, ${germanFlag.goldLight} 0%, ${germanFlag.gold}40 100%)`,
            border: `1px solid ${germanFlag.gold}`,
            borderRadius: '12px',
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) 0.4s',
          }}
        >
          <Typography variant="body1" sx={{ color: germanFlag.black, fontWeight: 600, mb: 1 }}>
            Comment ça marche ?
          </Typography>
          <Typography variant="body2" sx={{ color: germanFlag.goldDark, opacity: 0.9 }}>
            1. Choisissez votre plan → 2. Payez sur notre plateforme sécurisée → 3. Recevez votre code d'accès → 4. Connectez-vous
          </Typography>
        </Box>

        {/* Trust Badges */}
        <Box
          sx={{
            mt: 4,
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) 0.5s',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 3,
            }}
          >
            {[
              { label: 'Paiement sécurisé', icon: '🔒' },
              { label: 'Garantie 14 jours', icon: '✓' },
              { label: 'Accès à vie', icon: '∞' },
              { label: 'Support inclus', icon: '💬' },
            ].map((badge, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: m3Colors.onSurfaceVariant,
                }}
              >
                <span>{badge.icon}</span>
                <Typography variant="body2">{badge.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default PricingSection;
