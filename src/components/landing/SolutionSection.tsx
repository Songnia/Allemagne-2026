import { useEffect, useRef, useState } from 'react';
import { Container, Box, Typography, Paper, Button, Chip } from '@mui/material';
import {
  Work,
  School,
  AccountBalance,
  FamilyRestroom,
  Language,
  Timer,
  ArrowForward
} from '@mui/icons-material';
import { landingColors as m3Colors, germanFlag } from '@/theme/m3-theme';
import { useAppStore } from '@/store/useAppStore';

import img1 from '@/assets/images/1.png';
import img2 from '@/assets/images/2.png';
import img3 from '@/assets/images/3.png';
import img4 from '@/assets/images/4.png';
import img5 from '@/assets/images/5.png';
import img6 from '@/assets/images/6.png';

const benefits = [
  {
    icon: Work,
    image: img1,
    title: 'Accès au marché du travail',
    description: 'Cherchez un emploi sur place pendant 18 mois avec la Chancenkarte. Pas besoin d\'offre avant de partir.',
    color: m3Colors.primary,
    bgColor: m3Colors.primaryContainer,
  },
  {
    icon: School,
    image: img2,
    title: 'Formation reconnue',
    description: 'Vos diplômes peuvent être reconnus équivalents aux standards allemands. Processus simplifié pour les professions en pénurie.',
    color: germanFlag.goldDark,
    bgColor: germanFlag.goldLight,
  },
  {
    icon: AccountBalance,
    image: img3,
    title: 'Coût accessible',
    description: '€11,904 sur compte bloqué, libérés mensuellement. Ou exemption avec un contrat de travail.',
    color: m3Colors.primary,
    bgColor: m3Colors.primaryContainer,
  },
  {
    icon: FamilyRestroom,
    image: img4,
    title: 'Regroupement familial',
    description: 'Votre conjoint et enfants peuvent vous rejoindre. Le conjoint a le droit de travailler sans restriction.',
    color: germanFlag.goldDark,
    bgColor: germanFlag.goldLight,
  },
  {
    icon: Language,
    image: img5,
    title: 'Niveau de langue flexible',
    description: 'A1 suffit pour certains profils. B1 ou B2 augmente vos points mais n\'est pas obligatoire partout.',
    color: m3Colors.primary,
    bgColor: m3Colors.primaryContainer,
  },
  {
    icon: Timer,
    image: img6,
    title: 'Voie rapide vers le permanent',
    description: 'Après 4 ans avec la Chancenkarte (dont 2 en emploi qualifié), vous pouvez obtenir le permis de séjour permanent.',
    color: germanFlag.goldDark,
    bgColor: germanFlag.goldLight,
  },
];

const steps = [
  'Vérifier votre éligibilité (3 questions)',
  'Choisir votre formule d\'accès',
  'Suivre la roadmap étape par étape',
  'Préparer votre dossier avec nos guides',
  'Postuler et obtenir votre visa',
  'S\'installer et trouver un emploi',
];

function SolutionSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { openEligibilityModal } = useAppStore();

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
            label="LA SOLUTION"
            sx={{
              mb: 2,
              backgroundColor: m3Colors.primaryContainer,
              color: m3Colors.onPrimaryContainer,
              fontWeight: 500,
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
            La Chancenkarte : Votre carte des chances
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '16px', md: '18px' },
              fontWeight: 400,
              color: m3Colors.onSurfaceVariant,
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            La réforme de 2024 ouvre les portes de l'Allemagne aux talents africains.
            Un système basé sur les points, transparent et accessible.
          </Typography>
        </Box>

        {/* Benefits Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 3,
            mb: 8,
          }}
        >
          {benefits.map((benefit, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                backgroundColor: m3Colors.surfaceContainerLow,
                borderRadius: '16px',
                border: `1px solid ${m3Colors.outlineVariant}`,
                position: 'relative',
                overflow: 'hidden',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1) ${index * 0.1}s`,
                '&:hover': {
                  boxShadow: '0px 16px 32px -4px rgba(0, 0, 0, 0.2)',
                  transform: 'translateY(-8px)',
                  borderColor: benefit.color,
                  '& .benefit-image': {
                    transform: 'scale(1.05)',
                  },
                  '& .benefit-icon-badge': {
                    transform: 'scale(1.1)',
                  },
                },
              }}
            >
              {/* Image en haut */}
              <Box
                sx={{
                  position: 'relative',
                  height: 200,
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  className="benefit-image"
                  src={benefit.image}
                  alt={benefit.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                />
                {/* Overlay gradient */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '60%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
                  }}
                />
                {/* Badge icône */}
                <Box
                  className="benefit-icon-badge"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    backgroundColor: benefit.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <benefit.icon sx={{ color: benefit.color, fontSize: 22 }} />
                </Box>
              </Box>

              {/* Contenu texte */}
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: m3Colors.onSurface,
                    mb: 1,
                  }}
                >
                  {benefit.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: m3Colors.onSurfaceVariant,
                    lineHeight: 1.7,
                    fontSize: '14px',
                  }}
                >
                  {benefit.description}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* How It Works */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            background: `linear-gradient(135deg, ${germanFlag.goldLight} 0%, ${germanFlag.gold}30 100%)`,
            border: `1px solid ${germanFlag.gold}`,
            borderRadius: '16px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) 0.3s',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              alignItems: 'center',
            }}
          >
            {/* Left - Title */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '24px', md: '28px' },
                  fontWeight: 700,
                  color: germanFlag.black,
                  mb: 2,
                }}
              >
                Comment ça marche ?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: germanFlag.goldDark,
                  opacity: 0.9,
                  mb: 3,
                  lineHeight: 1.6,
                }}
              >
                Notre plateforme vous guide à chaque étape, de la vérification
                d'éligibilité jusqu'à votre installation en Allemagne.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={openEligibilityModal}
                endIcon={<ArrowForward />}
                sx={{
                  backgroundColor: m3Colors.primary,
                  color: '#FFFFFF',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#004F4F',
                  },
                }}
              >
                Vérifier mon éligibilité
              </Button>
            </Box>

            {/* Right - Steps */}
            <Box sx={{ flex: 1 }}>
              {steps.map((step, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 2,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                    transition: `all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) ${0.4 + index * 0.1}s`,
                  }}
                >
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      backgroundColor: germanFlag.gold,
                      color: germanFlag.black,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 700,
                      flexShrink: 0,
                      boxShadow: `0 2px 6px ${germanFlag.gold}80`,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: germanFlag.black,
                      fontWeight: 500,
                    }}
                  >
                    {step}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default SolutionSection;
