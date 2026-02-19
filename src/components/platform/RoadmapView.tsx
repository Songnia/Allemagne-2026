import { useState } from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Chip,
  LinearProgress,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import {
  Lock,
  CheckCircle,
  RadioButtonUnchecked,
  Group,
  Stars,
} from '@mui/icons-material';
import { m3Colors } from '@/theme/m3-theme';
import { useAppStore } from '@/store/useAppStore';
import { telegramGroup } from '@/data/mockData';

const stepIcons: Record<string, React.ElementType> = {
  flag: Stars,
  folder: Stars,
  work: Stars,
  description: Stars,
  flight: Stars,
  home: Stars,
  group: Group,
};

function RoadmapView() {
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const {
    roadmapSteps,
    currentStepId,
    overallProgress,
    subscription,
    articles,
    completeStep,
    openPaymentModal,
    setUIState,
  } = useAppStore();

  const handleStepClick = (stepId: number) => {
    const step = roadmapSteps.find(s => s.id === stepId);
    if (step?.isLocked) {
      // Show upgrade prompt
      return;
    }
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const handleMarkStepComplete = (stepId: number) => {
    completeStep(stepId);
  };

  const handleArticleClick = (articleId: string) => {
    setUIState({ currentArticleId: articleId });
  };

  const getStepArticles = (stepId: number) => {
    return articles.filter(a => a.stepId === stepId);
  };

  const getStepStatus = (step: typeof roadmapSteps[0]) => {
    if (step.isCompleted) return 'completed';
    if (step.isLocked) return 'locked';
    if (step.id === currentStepId) return 'active';
    return 'pending';
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: m3Colors.onSurface,
            mb: 1,
          }}
        >
          Ma Roadmap
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: m3Colors.onSurfaceVariant,
            mb: 3,
          }}
        >
          Suivez votre progression vers l'Allemagne, étape par étape.
        </Typography>

        {/* Progress Overview */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: m3Colors.primaryContainer,
            borderRadius: '16px',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: m3Colors.onPrimaryContainer }}>
                Progression globale
              </Typography>
              <Typography variant="body2" sx={{ color: m3Colors.onPrimaryContainer, opacity: 0.8 }}>
                {roadmapSteps.filter(s => s.isCompleted).length} sur {roadmapSteps.length} étapes complétées
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: m3Colors.onPrimaryContainer }}>
              {overallProgress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={overallProgress}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: `${m3Colors.onPrimaryContainer}20`,
              '& .MuiLinearProgress-bar': {
                backgroundColor: m3Colors.onPrimaryContainer,
                borderRadius: 6,
              },
            }}
          />
        </Paper>
      </Box>

      {/* Subscription Badge */}
      <Box sx={{ mb: 3 }}>
        <Chip
          label={subscription.tier === 'free' ? 'Gratuit' : subscription.tier === 'simple' ? 'Simple' : 'Complete'}
          sx={{
            backgroundColor:
              subscription.tier === 'free'
                ? m3Colors.surfaceContainer
                : subscription.tier === 'simple'
                  ? m3Colors.tertiaryContainer
                  : m3Colors.primaryContainer,
            color:
              subscription.tier === 'free'
                ? m3Colors.onSurfaceVariant
                : subscription.tier === 'simple'
                  ? m3Colors.onTertiaryContainer
                  : m3Colors.onPrimaryContainer,
            fontWeight: 600,
          }}
        />
        {subscription.tier !== 'complete' && (
          <Button
            size="small"
            onClick={() => openPaymentModal('complete')}
            sx={{
              ml: 2,
              color: m3Colors.primary,
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Passer à Complete
          </Button>
        )}
      </Box>

      {/* Vertical Stepper */}
      <Stepper
        orientation="vertical"
        nonLinear
        activeStep={currentStepId - 1}
        sx={{
          '& .MuiStepConnector-line': {
            borderColor: m3Colors.outlineVariant,
            borderLeftWidth: 2,
          },
        }}
      >
        {roadmapSteps.map((step) => {
          const status = getStepStatus(step);
          const isExpanded = expandedStep === step.id;
          const StepIcon = stepIcons[step.icon] || Stars;
          const stepArticles = getStepArticles(step.id);

          return (
            <Step key={step.id} completed={step.isCompleted}>
              <StepLabel
                StepIconComponent={() => (
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        status === 'completed'
                          ? m3Colors.primary
                          : status === 'locked'
                            ? m3Colors.surfaceContainerHighest
                            : status === 'active'
                              ? m3Colors.primaryContainer
                              : m3Colors.surfaceContainer,
                      border:
                        status === 'active'
                          ? `2px solid ${m3Colors.primary}`
                          : 'none',
                    }}
                  >
                    {status === 'completed' ? (
                      <CheckCircle sx={{ color: m3Colors.onPrimary, fontSize: 24 }} />
                    ) : status === 'locked' ? (
                      <Lock sx={{ color: m3Colors.onSurfaceVariant, fontSize: 20 }} />
                    ) : (
                      <StepIcon
                        sx={{
                          color:
                            status === 'active' ? m3Colors.primary : m3Colors.onSurfaceVariant,
                          fontSize: 20,
                        }}
                      />
                    )}
                  </Box>
                )}
                onClick={() => handleStepClick(step.id)}
                sx={{
                  cursor: 'pointer',
                  '& .MuiStepLabel-label': {
                    color:
                      status === 'completed'
                        ? m3Colors.primary
                        : status === 'locked'
                          ? m3Colors.onSurfaceVariant
                          : m3Colors.onSurface,
                    fontWeight: status === 'active' ? 600 : 500,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1">{step.title}</Typography>
                  {step.isLocked && (
                    <Chip
                      size="small"
                      label={step.requiredTier === 'simple' ? 'Simple' : 'Complete'}
                      sx={{
                        height: 20,
                        fontSize: '10px',
                        backgroundColor: m3Colors.surfaceContainerHighest,
                        color: m3Colors.onSurfaceVariant,
                      }}
                    />
                  )}
                </Box>
              </StepLabel>

              <StepContent>
                <Collapse in={isExpanded}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      mt: 2,
                      mb: 2,
                      backgroundColor: m3Colors.surfaceContainerLow,
                      borderRadius: '12px',
                      border: `1px solid ${m3Colors.outlineVariant}`,
                    }}
                  >
                    {/* Step Description */}
                    <Typography
                      variant="body2"
                      sx={{ color: m3Colors.onSurfaceVariant, mb: 3 }}
                    >
                      {step.description}
                    </Typography>

                    {/* Articles List */}
                    {stepArticles.length > 0 && (
                      <>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, color: m3Colors.onSurface, mb: 2 }}
                        >
                          Articles à lire
                        </Typography>
                        <List sx={{ mb: 2 }}>
                          {stepArticles.map((article) => (
                            <ListItem
                              key={article.id}
                              disablePadding
                              sx={{
                                mb: 1,
                                opacity: article.requiredTier === 'complete' && subscription.tier !== 'complete' ? 0.5 : 1,
                              }}
                            >
                              <ListItemButton
                                onClick={() => handleArticleClick(article.id)}
                                disabled={article.requiredTier === 'complete' && subscription.tier !== 'complete'}
                                sx={{
                                  borderRadius: '8px',
                                  backgroundColor: article.isRead
                                    ? `${m3Colors.primary}10`
                                    : m3Colors.surface,
                                  border: `1px solid ${article.isRead ? m3Colors.primary : m3Colors.outlineVariant
                                    }`,
                                }}
                              >
                                <ListItemIcon>
                                  {article.isRead ? (
                                    <CheckCircle sx={{ color: m3Colors.primary, fontSize: 20 }} />
                                  ) : (
                                    <RadioButtonUnchecked
                                      sx={{ color: m3Colors.outline, fontSize: 20 }}
                                    />
                                  )}
                                </ListItemIcon>
                                <ListItemText
                                  primary={article.title}
                                  secondary={article.excerpt}
                                  primaryTypographyProps={{
                                    fontWeight: 500,
                                    fontSize: '14px',
                                  }}
                                  secondaryTypographyProps={{
                                    fontSize: '12px',
                                    noWrap: true,
                                  }}
                                />
                                {article.requiredTier === 'complete' && (
                                  <Lock sx={{ color: m3Colors.onSurfaceVariant, fontSize: 16 }} />
                                )}
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </>
                    )}

                    {/* Telegram Group (Step 1 only) */}
                    {step.id === 1 && subscription.tier === 'complete' && (
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          mb: 2,
                          backgroundColor: m3Colors.tertiaryContainer,
                          borderRadius: '8px',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              backgroundColor: m3Colors.tertiary,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Group sx={{ color: m3Colors.onTertiary, fontSize: 20 }} />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: m3Colors.onTertiaryContainer }}>
                              {telegramGroup.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: m3Colors.onTertiaryContainer, opacity: 0.8 }}>
                              {telegramGroup.memberCount} membres
                            </Typography>
                          </Box>
                          <Button
                            variant="contained"
                            size="small"
                            href={telegramGroup.inviteLink}
                            target="_blank"
                            sx={{
                              backgroundColor: m3Colors.onTertiaryContainer,
                              color: m3Colors.tertiaryContainer,
                              textTransform: 'none',
                              '&:hover': {
                                backgroundColor: `${m3Colors.onTertiaryContainer}E0`,
                              },
                            }}
                          >
                            Rejoindre
                          </Button>
                        </Box>
                      </Paper>
                    )}

                    {/* Mark Complete Button */}
                    {!step.isCompleted && !step.isLocked && (
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleMarkStepComplete(step.id)}
                        sx={{
                          mt: 2,
                          backgroundColor: m3Colors.primary,
                          color: m3Colors.onPrimary,
                          textTransform: 'none',
                          fontWeight: 500,
                          '&:hover': {
                            backgroundColor: '#004F4F',
                          },
                        }}
                      >
                        Marquer comme terminé
                      </Button>
                    )}

                    {/* Locked Message */}
                    {step.isLocked && (
                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: m3Colors.surfaceContainerHighest,
                          borderRadius: '8px',
                          textAlign: 'center',
                        }}
                      >
                        <Lock sx={{ color: m3Colors.onSurfaceVariant, fontSize: 32, mb: 1 }} />
                        <Typography variant="body2" sx={{ color: m3Colors.onSurfaceVariant, mb: 2 }}>
                          Cette étape est réservée aux membres {step.requiredTier === 'simple' ? 'Simple' : 'Complete'}
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() => openPaymentModal(step.requiredTier)}
                          sx={{
                            backgroundColor: m3Colors.primary,
                            color: m3Colors.onPrimary,
                            textTransform: 'none',
                          }}
                        >
                          Débloquer
                        </Button>
                      </Box>
                    )}
                  </Paper>
                </Collapse>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}

export default RoadmapView;
