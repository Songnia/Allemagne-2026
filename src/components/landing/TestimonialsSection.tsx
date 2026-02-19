import { useEffect, useRef, useState } from 'react';
import { Container, Box, Typography, Paper, Avatar, Chip } from '@mui/material';
import { FormatQuote, Star } from '@mui/icons-material';
import { landingColors as m3Colors, germanFlag } from '@/theme/m3-theme';

const testimonials = [
  {
    name: 'Amadou K.',
    location: 'Abidjan, Côte d\'Ivoire',
    avatar: 'A',
    role: 'Développeur Web',
    quote: 'J\'ai attendu 14 mois pour le Canada sans résultat. Avec ALLEMAGNE2026, j\'ai obtenu ma Chancenkarte en 8 semaines. Aujourd\'hui, je travaille à Berlin.',
    result: 'Installé à Berlin depuis 3 mois',
    rating: 5,
  },
  {
    name: 'Fatou D.',
    location: 'Dakar, Sénégal',
    avatar: 'F',
    role: 'Business Analyst',
    quote: 'Les guides sont incroyablement détaillés. Chaque étape est expliquée, avec les pièges à éviter. Le groupe Telegram m\'a beaucoup aidée pour le moral.',
    result: 'En route pour Munich',
    rating: 5,
  },
  {
    name: 'Jean-Pierre M.',
    location: 'Douala, Cameroun',
    avatar: 'J',
    role: 'Ingénieur Mécanique',
    quote: 'Le comparatif Canada vs Allemagne m\'a ouvert les yeux. Pour le même profil, l\'Allemagne est beaucoup plus accessible et rapide.',
    result: 'Visa obtenu en 6 semaines',
    rating: 4,
  },
];

function TestimonialsSection() {
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
            label="TÉMOIGNAGES"
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
            Ils ont réussi leur projet
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
            Rejoignez des centaines de Francophones qui ont transformé leur rêve en réalité.
          </Typography>
        </Box>

        {/* Testimonials Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: m3Colors.surfaceContainerLow,
                borderRadius: '16px',
                border: `1px solid ${m3Colors.outlineVariant}`,
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) ${index * 0.15}s`,
                '&:hover': {
                  boxShadow: '0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              {/* Quote Icon */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  color: `${m3Colors.primary}20`,
                }}
              >
                <FormatQuote sx={{ fontSize: 40 }} />
              </Box>

              {/* Quote */}
              <Typography
                variant="body1"
                sx={{
                  color: m3Colors.onSurface,
                  lineHeight: 1.7,
                  mb: 3,
                  fontStyle: 'italic',
                }}
              >
                "{testimonial.quote}"
              </Typography>

              {/* Rating Stars */}
              <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    sx={{
                      fontSize: 18,
                      color: i < testimonial.rating ? germanFlag.gold : m3Colors.outlineVariant,
                    }}
                  />
                ))}
              </Box>

              {/* Result Badge */}
              <Chip
                label={testimonial.result}
                size="small"
                sx={{
                  mb: 3,
                  backgroundColor: m3Colors.primaryContainer,
                  color: m3Colors.onPrimaryContainer,
                  fontWeight: 500,
                  fontSize: '11px',
                }}
              />

              {/* Author */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: m3Colors.primary,
                    color: m3Colors.onPrimary,
                    width: 48,
                    height: 48,
                    fontWeight: 600,
                  }}
                >
                  {testimonial.avatar}
                </Avatar>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: m3Colors.onSurface,
                    }}
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: m3Colors.onSurfaceVariant,
                    }}
                  >
                    {testimonial.role} • {testimonial.location}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Stats */}
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: { xs: 4, md: 8 },
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) 0.4s',
          }}
        >
          {[
            { value: '500+', label: 'Membres actifs' },
            { value: '89%', label: 'Taux de satisfaction' },
            { value: '4.8/5', label: 'Note moyenne' },
          ].map((stat, index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '32px', md: '40px' },
                  fontWeight: 700,
                  color: m3Colors.primary,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: m3Colors.onSurfaceVariant,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default TestimonialsSection;
