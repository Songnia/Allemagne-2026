import { useEffect, useRef, useState } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { AccessTime, AttachMoney, TrendingDown, Warning } from '@mui/icons-material';
import { landingColors as m3Colors } from '@/theme/m3-theme';

const painPoints = [
  {
    icon: AccessTime,
    title: 'Délai interminable',
    stat: '14-24 mois',
    description: 'Délai moyen pour obtenir un visa canadien en 2024-2025. Votre projet est en suspens pendant des années.',
    color: m3Colors.error,
  },
  {
    icon: AttachMoney,
    title: 'Coût prohibitif',
    stat: '$30,000+',
    description: 'Preuves financières requises pour le Canada. Une somme impossible pour la plupart des candidats africains.',
    color: m3Colors.error,
  },
  {
    icon: TrendingDown,
    title: 'Quota réduit',
    stat: '-35%',
    description: 'Réduction des admissions permanentes au Canada en 2025. La compétition est féroce.',
    color: m3Colors.error,
  },
  {
    icon: Warning,
    title: 'Incertitude totale',
    stat: 'Pool bloqué',
    description: 'Des milliers de candidats qualifiés attendent sans réponse dans le pool Express Entry.',
    color: m3Colors.error,
  },
];

function ProblemSection() {
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
          <Typography
            variant="overline"
            sx={{
              color: m3Colors.onSurfaceVariant,
              fontWeight: 500,
              letterSpacing: '1px',
              mb: 2,
              display: 'block',
            }}
          >
            LE PROBLÈME
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '28px', md: '36px' },
              fontWeight: 700,
              color: m3Colors.onSurface,
              mb: 3,
            }}
          >
            Le Canada ne veut plus de vous
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
            Pendant que vous attendez, l'Allemagne recrute activement
            400,000 travailleurs qualifiés par an.
          </Typography>
        </Box>

        {/* Pain Points Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 3,
          }}
        >
          {painPoints.map((point, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: m3Colors.surface,
                borderRadius: '12px',
                border: `1px solid ${m3Colors.outlineVariant}`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) ${index * 0.1}s`,
                '&:hover': {
                  boxShadow: '0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  backgroundColor: `${point.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <point.icon sx={{ color: point.color, fontSize: 24 }} />
              </Box>

              {/* Stat */}
              <Typography
                variant="h3"
                sx={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: point.color,
                  mb: 1,
                }}
              >
                {point.stat}
              </Typography>

              {/* Title */}
              <Typography
                variant="h6"
                sx={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: m3Colors.onSurface,
                  mb: 1,
                }}
              >
                {point.title}
              </Typography>

              {/* Description */}
              <Typography
                variant="body2"
                sx={{
                  color: m3Colors.onSurfaceVariant,
                  lineHeight: 1.6,
                }}
              >
                {point.description}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* Comparison Table */}
        <Box
          sx={{
            mt: 8,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) 0.4s',
          }}
        >
          <Paper
            elevation={0}
            sx={{
              overflow: 'hidden',
              borderRadius: '12px',
              border: `1px solid ${m3Colors.outlineVariant}`,
              backgroundColor: m3Colors.surface,
            }}
          >
            {/* Table Header */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                backgroundColor: m3Colors.surfaceContainer,
                p: 2,
                borderBottom: `1px solid ${m3Colors.outlineVariant}`,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: m3Colors.onSurface }}>
                Critère
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: m3Colors.error,
                  textAlign: 'center',
                }}
              >
                Canada
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: m3Colors.primary,
                  textAlign: 'center',
                }}
              >
                Allemagne
              </Typography>
            </Box>

            {/* Table Rows */}
            {[
              { critere: 'Coût initial', canada: '$30,000+', germany: '€11,904', highlight: true },
              { critere: 'Délai de traitement', canada: '14-24 mois', germany: '4-12 semaines', highlight: true },
              { critere: 'Niveau de langue', canada: 'Anglais avancé (CLB 7+)', germany: 'A1-B2 allemand', highlight: false },
              { critere: 'Offre d\'emploi requise', canada: 'Non (mais recommandé)', germany: 'Non obligatoire', highlight: false },
              { critere: 'Quota 2025', canada: 'Réduit de 35%', germany: 'Augmenté', highlight: true },
            ].map((row, index) => (
              <Box
                key={index}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  p: 2,
                  borderBottom: index < 4 ? `1px solid ${m3Colors.outlineVariant}` : 'none',
                  backgroundColor: row.highlight ? `${m3Colors.primary}05` : 'transparent',
                }}
              >
                <Typography variant="body2" sx={{ color: m3Colors.onSurface, fontWeight: 500 }}>
                  {row.critere}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: m3Colors.onSurfaceVariant,
                    textAlign: 'center',
                    textDecoration: row.highlight ? 'line-through' : 'none',
                  }}
                >
                  {row.canada}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: m3Colors.primary,
                    textAlign: 'center',
                    fontWeight: row.highlight ? 600 : 400,
                  }}
                >
                  {row.germany}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default ProblemSection;
