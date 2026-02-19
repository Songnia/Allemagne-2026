import { useEffect, useRef, useState } from 'react';
import { Container, Box, Typography, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { landingColors as m3Colors } from '@/theme/m3-theme';

const faqs = [
  {
    question: 'Qu\'est-ce que la Chancenkarte exactement ?',
    answer: 'La Chancenkarte (carte des chances) est un visa allemand introduit en 2024 qui permet aux travailleurs qualifiés de chercher un emploi en Allemagne pendant 18 mois. Elle fonctionne sur un système de points : vous devez obtenir au moins 6 points sur 8 critères (qualifications, expérience, langue, âge, etc.).',
  },
  {
    question: 'Combien ça coûte au total pour immigrer ?',
    answer: 'Le coût minimum est de €11,904 (compte bloqué) + frais de visa (€75) + assurance santé (~€100/mois). En FCFA, cela représente environ 7,8 millions + les frais de notre guide (2,000 ou 10,000 FCFA). Si vous avez une offre d\'emploi, le compte bloqué n\'est pas nécessaire.',
  },
  {
    question: 'Combien de temps prend le processus ?',
    answer: 'Avec la Chancenkarte, le délai moyen est de 4 à 12 semaines après le rendez-vous à l\'ambassade. Cela inclut : 1-2 semaines pour la reconnaissance des diplômes (si nécessaire), 2-4 semaines pour l\'ouverture du compte bloqué, et 4-12 semaines pour le traitement du visa.',
  },
  {
    question: 'Je ne parle pas allemand, puis-je postuler ?',
    answer: 'Oui ! Le niveau A1 suffit pour certains profils. Cependant, avoir un niveau B1 ou B2 augmente considérablement vos points et vos chances de trouver un emploi. De nombreux postes en IT et dans les startups acceptent l\'anglais.',
  },
  {
    question: 'Mon diplôme sera-t-il reconnu en Allemagne ?',
    answer: 'Cela dépend de votre formation. Les diplômes universitaires (licence, master) sont généralement reconnus. Pour les formations professionnelles, une procédure d\'équivalence est nécessaire. Notre guide Complete vous explique comment faire reconnaître vos qualifications.',
  },
  {
    question: 'Puis-je amener ma famille ?',
    answer: 'Oui, le regroupement familial est possible avec la Chancenkarte. Votre conjoint et vos enfants peuvent vous rejoindre. Le conjoint a le droit de travailler sans restriction en Allemagne.',
  },
  {
    question: 'Que se passe-t-il après les 18 mois de Chancenkarte ?',
    answer: 'Si vous trouvez un emploi qualifié pendant cette période, vous pouvez convertir votre visa en permis de séjour pour travailleurs qualifiés. Après 4 ans en Allemagne (dont 2 en emploi qualifié), vous pouvez demander le permis de séjour permanent.',
  },
  {
    question: 'Quelle est la différence entre Simple et Complete ?',
    answer: 'Simple (2,000 FCFA) donne accès aux 3 premières étapes : introduction, préparation du dossier et recherche d\'emploi. Complete (10,000 FCFA) débloque toutes les 6 étapes, y compris la demande de visa, la préparation au départ et l\'installation en Allemagne, plus l\'accès au groupe Telegram privé.',
  },
];

function FAQSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);
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

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: m3Colors.surfaceContainerLow,
      }}
    >
      <Container maxWidth="md">
        {/* Section Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 6,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
          }}
        >
          <Chip
            label="FAQ"
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
            Questions fréquentes
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
            Tout ce que vous devez savoir avant de commencer votre projet.
          </Typography>
        </Box>

        {/* FAQ Accordion */}
        <Box
          sx={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) 0.2s',
          }}
        >
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                mb: 1.5,
                backgroundColor: m3Colors.surface,
                borderRadius: '12px !important',
                border: `1px solid ${m3Colors.outlineVariant}`,
                boxShadow: 'none',
                overflow: 'hidden',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  boxShadow: '0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: m3Colors.primary }} />}
                sx={{
                  py: 1,
                  px: 3,
                  '&.Mui-expanded': {
                    backgroundColor: m3Colors.primaryContainer,
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: expanded === `panel${index}` ? m3Colors.onPrimaryContainer : m3Colors.onSurface,
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, py: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: m3Colors.onSurfaceVariant,
                    lineHeight: 1.7,
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Contact CTA */}
        <Box
          sx={{
            mt: 6,
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) 0.4s',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: m3Colors.onSurfaceVariant,
              mb: 2,
            }}
          >
            Vous avez d'autres questions ?
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: m3Colors.primary,
              fontWeight: 500,
            }}
          >
            Rejoignez notre groupe Telegram pour discuter avec la communauté
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default FAQSection;
