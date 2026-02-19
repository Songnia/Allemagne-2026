import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Chip,
  Fade,
} from '@mui/material';
import { ArrowForward, ArrowBack, CheckCircle, Warning } from '@mui/icons-material';
import { m3Colors, germanFlag } from '@/theme/m3-theme';
import { eligibilityQuestions, pricingTiers } from '@/data/mockData';
import type { EligibilityResult } from '@/types';

interface EligibilityModalProps {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
}

function EligibilityModal({ open, onClose, onContinue }: EligibilityModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < eligibilityQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
    } else if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = (): EligibilityResult => {
    let score = 0;
    let maxScore = 0;

    eligibilityQuestions.forEach((q, index) => {
      const selectedOption = q.options.find(o => o.id === answers[index]);
      if (selectedOption) {
        score += selectedOption.points;
      }
      maxScore += Math.max(...q.options.map(o => o.points));
    });

    const isEligible = score >= 6;

    return {
      score,
      maxScore,
      isEligible,
      message: isEligible
        ? 'Félicitations ! Vous êtes potentiellement éligible'
        : score >= 4
          ? 'Vous pourriez être éligible avec quelques améliorations'
          : 'Votre profil nécessite plus de préparation',
      details: isEligible
        ? `Vous avez obtenu ${score} points sur ${maxScore}. Avec ce score, vous avez de bonnes chances d'obtenir la Chancenkarte. Continuez pour découvrir les prochaines étapes.`
        : score >= 4
          ? `Vous avez ${score} points. En améliorant votre niveau d'allemand ou en acquérant plus d'expérience, vous pourriez atteindre le seuil des 6 points.`
          : `Vous avez ${score} points. Nous vous recommandons de travailler sur votre profil avant de postuler. Notre guide peut vous aider à planifier votre parcours.`,
    };
  };

  const handleClose = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    onClose();
  };

  const handleContinue = () => {
    handleClose();
    onContinue();
  };

  const result = showResult ? calculateResult() : null;
  const progress = ((currentQuestion + 1) / eligibilityQuestions.length) * 100;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          backgroundColor: m3Colors.surface,
        },
      }}
    >
      {!showResult ? (
        <>
          {/* Progress Bar */}
          <Box sx={{ px: 3, pt: 3, pb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" sx={{ color: m3Colors.onSurfaceVariant }}>
                Question {currentQuestion + 1} sur {eligibilityQuestions.length}
              </Typography>
              <Typography variant="caption" sx={{ color: m3Colors.primary, fontWeight: 500 }}>
                {Math.round(progress)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: m3Colors.surfaceContainerHighest,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: m3Colors.primary,
                  borderRadius: 4,
                },
              }}
            />
          </Box>

          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: m3Colors.onSurface }}>
              Vérification d'éligibilité
            </Typography>
          </DialogTitle>

          <DialogContent>
            <Typography
              variant="h6"
              sx={{
                fontSize: '18px',
                fontWeight: 500,
                color: m3Colors.onSurface,
                mb: 3,
              }}
            >
              {eligibilityQuestions[currentQuestion].question}
            </Typography>

            <FormControl fullWidth>
              <RadioGroup
                value={answers[currentQuestion] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
              >
                {eligibilityQuestions[currentQuestion].options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={
                      <Radio
                        sx={{
                          color: m3Colors.outline,
                          '&.Mui-checked': {
                            color: m3Colors.primary,
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body1" sx={{ color: m3Colors.onSurface }}>
                        {option.label}
                      </Typography>
                    }
                    sx={{
                      mb: 1,
                      p: 1.5,
                      borderRadius: '8px',
                      border: `1px solid ${answers[currentQuestion] === option.id
                        ? m3Colors.primary
                        : m3Colors.outlineVariant
                        }`,
                      backgroundColor:
                        answers[currentQuestion] === option.id
                          ? `${m3Colors.primary}10`
                          : 'transparent',
                      '&:hover': {
                        backgroundColor: m3Colors.surfaceContainer,
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
            <Button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              startIcon={<ArrowBack />}
              sx={{
                color: m3Colors.onSurfaceVariant,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: m3Colors.primary,
                },
              }}
            >
              Retour
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: m3Colors.primary,
                color: m3Colors.onPrimary,
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#004F4F',
                },
                '&.Mui-disabled': {
                  backgroundColor: m3Colors.surfaceContainerHighest,
                  color: m3Colors.onSurfaceVariant,
                },
              }}
            >
              {currentQuestion === eligibilityQuestions.length - 1 ? 'Voir le résultat' : 'Suivant'}
            </Button>
          </DialogActions>
        </>
      ) : (
        <Fade in={showResult}>
          <Box>
            <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: result?.isEligible
                    ? `${m3Colors.primary}20`
                    : result && result.score >= 4
                      ? `${m3Colors.tertiary}20`
                      : `${m3Colors.error}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                {result?.isEligible ? (
                  <CheckCircle sx={{ fontSize: 40, color: m3Colors.primary }} />
                ) : (
                  <Warning
                    sx={{
                      fontSize: 40,
                      color:
                        result && result.score >= 4
                          ? m3Colors.tertiary
                          : m3Colors.error,
                    }}
                  />
                )}
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600, color: m3Colors.onSurface }}>
                {result?.message}
              </Typography>
            </DialogTitle>

            <DialogContent>
              <Chip
                label={`${result?.score} / ${result?.maxScore} points`}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: 'fit-content',
                  mx: 'auto',
                  mb: 3,
                  backgroundColor: result?.isEligible
                    ? m3Colors.primaryContainer
                    : result && result.score >= 4
                      ? m3Colors.tertiaryContainer
                      : m3Colors.errorContainer,
                  color: result?.isEligible
                    ? m3Colors.onPrimaryContainer
                    : result && result.score >= 4
                      ? m3Colors.onTertiaryContainer
                      : m3Colors.onErrorContainer,
                  fontWeight: 600,
                  fontSize: '16px',
                  py: 1,
                }}
              />

              <Typography
                variant="body1"
                sx={{
                  color: m3Colors.onSurfaceVariant,
                  textAlign: 'center',
                  lineHeight: 1.7,
                  mb: 3,
                }}
              >
                {result?.details}
              </Typography>

              {/* Offres Simplifiées */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
                {pricingTiers.filter(t => t.id !== 'free').map((tier) => (
                  <Box
                    key={tier.id}
                    sx={{
                      flex: 1,
                      p: 2,
                      borderRadius: '12px',
                      border: `1px solid ${tier.recommended ? germanFlag.gold : m3Colors.outlineVariant}`,
                      backgroundColor: tier.recommended ? `${germanFlag.gold}10` : 'transparent',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: m3Colors.onSurface, mb: 0.5 }}>
                      Offre {tier.name}
                    </Typography>
                    <Typography variant="h6" sx={{ color: m3Colors.primary, fontWeight: 700, mb: 1 }}>
                      {tier.price} {tier.currency}
                    </Typography>
                    <Button
                      variant={tier.recommended ? "contained" : "outlined"}
                      fullWidth
                      size="small"
                      onClick={() => {
                        if (tier.checkoutUrl) {
                          window.location.href = tier.checkoutUrl;
                        }
                      }}
                      sx={{
                        textTransform: 'none',
                        ...(tier.recommended ? {
                          backgroundColor: m3Colors.primary,
                          color: m3Colors.onPrimary,
                          '&:hover': { backgroundColor: '#004F4F' }
                        } : {
                          borderColor: m3Colors.outline,
                          color: m3Colors.onSurface,
                        })
                      }}
                    >
                      Choisir
                    </Button>
                  </Box>
                ))}
              </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, flexDirection: 'column', gap: 1 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleContinue}
                sx={{
                  backgroundColor: m3Colors.primary,
                  color: m3Colors.onPrimary,
                  textTransform: 'none',
                  fontWeight: 500,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#004F4F',
                  },
                }}
              >
                {result?.isEligible ? 'Continuer vers la plateforme' : 'Découvrir les solutions'}
              </Button>
              <Button
                fullWidth
                onClick={handleClose}
                sx={{
                  color: m3Colors.onSurfaceVariant,
                  textTransform: 'none',
                }}
              >
                Fermer
              </Button>
            </DialogActions>
          </Box>
        </Fade>
      )}
    </Dialog>
  );
}

export default EligibilityModal;
