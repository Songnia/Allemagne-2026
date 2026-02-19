import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  Fade,
} from '@mui/material';

import { ArrowBack, CheckCircle, Payment, Smartphone, CreditCard, AccountBalance } from '@mui/icons-material';
import { appColors, landingColors } from '@/theme/m3-theme'; // import des deux palettes
import { useLocation } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { pricingTiers } from '@/data/mockData';
import type { SubscriptionTier } from '@/types';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  selectedTier: SubscriptionTier | null;
}

function PaymentModal({ open, onClose, selectedTier }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Détermination des couleurs selon la route
  const location = useLocation();
  const isPlatform = location.pathname.startsWith('/platform');
  const m3Colors = isPlatform ? appColors : landingColors;

  const { setUIState } = useAppStore();

  const tier = selectedTier ? pricingTiers.find(t => t.id === selectedTier) : null;

  const handleProceedToPayment = async () => {
    setIsProcessing(true);

    if (tier?.checkoutUrl) {
      // Redirection vers le lien de paiement externe
      window.location.href = tier.checkoutUrl;
      return;
    }

    // Flux gratuit
    if (tier?.price === 0) {
      setIsProcessing(false);
      setShowSuccess(true);
      return;
    }

    // Simuler la redirection vers la plateforme de paiement (fallback)
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsProcessing(false);
    setIsRedirecting(true);

    // Simuler le retour après paiement (dans la vraie app, ce serait un webhook)
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsRedirecting(false);
    setShowSuccess(true);
  };

  const handleClose = () => {
    setIsProcessing(false);
    setIsRedirecting(false);
    setShowSuccess(false);
    setUIState({ selectedPricingTier: null });
    onClose();
  };

  const handleContinueToLogin = () => {
    handleClose();
    // Ouvrir le modal de connexion
    setTimeout(() => {
      setUIState({ isAuthModalOpen: true });
    }, 300);
  };

  if (!tier) return null;

  // Code associé au plan
  let tierCode = '06200';
  if (tier.id === 'simple') tierCode = '06201';
  if (tier.id === 'complete') tierCode = '06202'; 

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
      {!showSuccess ? (
        <>
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: m3Colors.onSurface }}>
              {tier.price === 0 ? 'Inscription gratuite' : 'Paiement sécurisé'}
            </Typography>
            <Typography variant="body2" sx={{ color: m3Colors.onSurfaceVariant, mt: 1 }}>
              {tier.price === 0 ? 'Accédez immédiatement à votre espace' : 'Finalisez votre achat en toute sécurité'}
            </Typography>
          </DialogTitle>

          <DialogContent>
            {/* Order Summary */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                backgroundColor: m3Colors.surfaceContainer,
                borderRadius: '12px',
              }}
            >
              <Typography variant="subtitle2" sx={{ color: m3Colors.onSurfaceVariant, mb: 1 }}>
                Récapitulatif de votre commande
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: m3Colors.onSurface }}>
                    Formule {tier.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: m3Colors.onSurfaceVariant }}>
                    Accès complet à la plateforme
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: m3Colors.primary }}>
                  {tier.price.toLocaleString('fr-FR')} {tier.currency}
                </Typography>
              </Box>
            </Paper>

            {/* Méthodes de paiement disponibles - Uniquement si payant */}
            {tier.price > 0 && (
              <>
                <Typography variant="subtitle2" sx={{ color: m3Colors.onSurface, mb: 2, fontWeight: 600 }}>
                  Modes de paiement acceptés
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 3,
                    backgroundColor: m3Colors.surfaceContainerLow,
                    borderRadius: '12px',
                    border: `2px solid ${m3Colors.primary}`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {/* Mobile Money */}
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '12px',
                          backgroundColor: m3Colors.primaryContainer,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 1,
                        }}
                      >
                        <Smartphone sx={{ color: m3Colors.primary, fontSize: 28 }} />
                      </Box>
                      <Typography variant="caption" sx={{ color: m3Colors.onSurfaceVariant }}>
                        Mobile Money
                      </Typography>
                    </Box>

                    {/* Carte bancaire */}
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '12px',
                          backgroundColor: m3Colors.tertiaryContainer,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 1,
                        }}
                      >
                        <CreditCard sx={{ color: m3Colors.tertiary, fontSize: 28 }} />
                      </Box>
                      <Typography variant="caption" sx={{ color: m3Colors.onSurfaceVariant }}>
                        Carte bancaire
                      </Typography>
                    </Box>

                    {/* Virement */}
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '12px',
                          backgroundColor: m3Colors.secondaryContainer,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 1,
                        }}
                      >
                        <AccountBalance sx={{ color: m3Colors.secondary, fontSize: 28 }} />
                      </Box>
                      <Typography variant="caption" sx={{ color: m3Colors.onSurfaceVariant }}>
                        Virement
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </>
            )}

            {/* Instructions */}
            <Alert
              severity="info"
              sx={{
                borderRadius: '8px',
                backgroundColor: m3Colors.primaryContainer,
                color: m3Colors.onPrimaryContainer,
                '& .MuiAlert-icon': {
                  color: m3Colors.primary,
                },
              }}
            >
              <Typography variant="body2">
                {tier.price === 0
                  ? "En confirmant, vous acceptez nos conditions d'utilisation. Vous recevrez votre code d'accès instantanément."
                  : "En cliquant sur \"Procéder au paiement\", vous serez redirigé vers notre plateforme de paiement sécurisée. Après validation, vous recevrez votre code d'accès par SMS."}
              </Typography>
            </Alert>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3, flexDirection: 'column', gap: 1 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleProceedToPayment}
              disabled={isProcessing || isRedirecting}
              startIcon={isProcessing ? <CircularProgress size={18} sx={{ color: 'inherit' }} /> : <Payment />}
              sx={{
                backgroundColor: m3Colors.primary,
                color: m3Colors.onPrimary,
                textTransform: 'none',
                fontWeight: 500,
                py: 1.5,
                fontSize: '16px',
                '&:hover': {
                  backgroundColor: '#004F4F',
                },
                '&.Mui-disabled': {
                  backgroundColor: m3Colors.surfaceContainerHighest,
                  color: m3Colors.onSurfaceVariant,
                },
              }}
            >
              {isProcessing
                ? 'Préparation...'
                : isRedirecting
                  ? 'Redirection...'
                  : tier.price === 0
                    ? 'Confirmer mon inscription'
                    : `Procéder au paiement (${tier.price.toLocaleString('fr-FR')} ${tier.currency})`}
            </Button>
            <Button
              fullWidth
              onClick={handleClose}
              disabled={isProcessing || isRedirecting}
              startIcon={<ArrowBack />}
              sx={{
                color: m3Colors.onSurfaceVariant,
                textTransform: 'none',
              }}
            >
              Retour
            </Button>
          </DialogActions>
        </>
      ) : (
        <Fade in={showSuccess}>
          <Box sx={{ textAlign: 'center', py: 4, px: 3 }}>
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                backgroundColor: `${m3Colors.primary}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              <CheckCircle sx={{ fontSize: 56, color: m3Colors.primary }} />
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 600, color: m3Colors.onSurface, mb: 2 }}>
              {tier.price === 0 ? 'Inscription validée !' : 'Paiement confirmé !'}
            </Typography>

            <Typography variant="body1" sx={{ color: m3Colors.onSurfaceVariant, mb: 3 }}>
              {tier.price === 0
                ? "Votre inscription à l'offre Gratuite est validée."
                : <>Votre achat de la formule <strong>{tier.name}</strong> a été validé.</>}
              <br />Votre code d'accès est prêt.
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                backgroundColor: m3Colors.primaryContainer,
                borderRadius: '12px',
              }}
            >
              <Typography variant="caption" sx={{ color: m3Colors.onPrimaryContainer, display: 'block', mb: 1 }}>
                Votre code d'accès :
              </Typography>
              <Chip
                label={tierCode}
                sx={{
                  backgroundColor: m3Colors.onPrimaryContainer,
                  color: m3Colors.primaryContainer,
                  fontWeight: 700,
                  fontSize: '24px',
                  py: 2,
                  px: 3,
                }}
              />
              <Typography variant="caption" sx={{ color: m3Colors.onPrimaryContainer, display: 'block', mt: 1, opacity: 0.8 }}>
                Conservez ce code précieusement
              </Typography>
            </Paper>

            <Button
              variant="contained"
              onClick={handleContinueToLogin}
              sx={{
                backgroundColor: m3Colors.primary,
                color: m3Colors.onPrimary,
                textTransform: 'none',
                fontWeight: 500,
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#004F4F',
                },
              }}
            >
              Se connecter avec mon code
            </Button>
          </Box>
        </Fade>
      )}
    </Dialog>
  );
}

export default PaymentModal;
