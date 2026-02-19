import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Alert,
  Chip,
} from '@mui/material';
import { ArrowForward, Phone, Lock } from '@mui/icons-material';
import { m3Colors } from '@/theme/m3-theme';
import { useAppStore } from '@/store/useAppStore';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

// Codes fixes prédéfinis
const VALID_CODES: Record<string, { tier: 'free' | 'simple' | 'complete'; label: string }> = {
  '06200': { tier: 'free', label: 'Gratuit' },
  '06201': { tier: 'simple', label: 'Simple (2,000 FCFA)' },
  '06202': { tier: 'complete', label: 'Complete (10,000 FCFA)' },
};

function AuthModal({ open, onClose }: AuthModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fixedCode, setFixedCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { setUser, setAuthenticated, upgradeSubscription } = useAppStore();

  const handlePhoneSubmit = () => {
    if (phoneNumber.length < 8) {
      setError('Veuillez entrer un numéro de téléphone valide');
      return;
    }
    setError('');
    setStep('code');
  };

  const handleCodeSubmit = async () => {
    if (!VALID_CODES[fixedCode]) {
      setError('Code invalide. Les codes valides sont : 06200, 06201, 06202');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const codeInfo = VALID_CODES[fixedCode];

    // Create user
    const user = {
      id: `user_${Date.now()}`,
      phoneNumber,
      createdAt: new Date(),
      lastLoginAt: new Date(),
    };

    setUser(user);
    setAuthenticated(true);

    // Upgrade subscription based on code
    upgradeSubscription(codeInfo.tier);

    setIsLoading(false);

    // Reset and close
    setStep('phone');
    setPhoneNumber('');
    setFixedCode('');
    onClose();
  };

  const handleClose = () => {
    setStep('phone');
    setPhoneNumber('');
    setFixedCode('');
    setError('');
    onClose();
  };

  const handleBack = () => {
    if (step === 'code') {
      setStep('phone');
      setError('');
    } else {
      onClose();
    }
  };

  const formatPhoneNumber = (value: string) => {
    return value.replace(/\D/g, '');
  };

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
      <DialogTitle sx={{ pb: 1, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: m3Colors.onSurface }}>
          {step === 'phone' ? 'Connexion' : 'Entrez votre code'}
        </Typography>
        <Typography variant="body2" sx={{ color: m3Colors.onSurfaceVariant, mt: 1 }}>
          {step === 'phone'
            ? 'Accédez à votre espace personnel'
            : 'Saisissez le code reçu après votre paiement'}
        </Typography>
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
            {error}
          </Alert>
        )}

        {step === 'phone' ? (
          <Box>
            <Typography variant="body2" sx={{ color: m3Colors.onSurfaceVariant, mb: 2 }}>
              Entrez votre numéro de téléphone mobile pour vous connecter.
            </Typography>
            <TextField
              fullWidth
              label="Numéro de téléphone"
              placeholder="Ex: 07 XX XX XX XX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone sx={{ color: m3Colors.onSurfaceVariant }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: m3Colors.primary,
                  },
                },
              }}
            />
          </Box>
        ) : (
          <Box>
            <Typography variant="body2" sx={{ color: m3Colors.onSurfaceVariant, mb: 2 }}>
              Vous avez reçu un code après votre paiement ? Saisissez-le ci-dessous.
            </Typography>

            <TextField
              fullWidth
              label="Code d'accès"
              placeholder="Ex: 06200"
              value={fixedCode}
              onChange={(e) => setFixedCode(e.target.value.slice(0, 5))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: m3Colors.onSurfaceVariant }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: m3Colors.primary,
                  },
                },
              }}
            />

            {/* Info sur les codes */}
            <Box sx={{ mt: 3, p: 2, backgroundColor: m3Colors.surfaceContainer, borderRadius: '8px' }}>
              <Typography variant="caption" sx={{ color: m3Colors.onSurfaceVariant, display: 'block', mb: 1 }}>
                Codes disponibles :
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip
                  size="small"
                  label="06200 = Gratuit"
                  sx={{ backgroundColor: m3Colors.surfaceContainerHighest, fontSize: '11px' }}
                />
                {/*<Chip 
                  size="small" 
                  label="06201 = Simple" 
                  sx={{ backgroundColor: m3Colors.tertiaryContainer, fontSize: '11px' }} 
                />
                <Chip 
                  size="small" 
                  label="06202 = Complete" 
                  sx={{ backgroundColor: m3Colors.primaryContainer, fontSize: '11px' }} 
                />*/}
              </Box>
            </Box>

            <Alert
              severity="info"
              sx={{
                mt: 2,
                borderRadius: '8px',
                backgroundColor: m3Colors.primaryContainer,
                color: m3Colors.onPrimaryContainer,
                '& .MuiAlert-icon': {
                  color: m3Colors.primary,
                },
              }}
            >
              <Typography variant="body2">
                Pas encore de code ?{' '}
                <Box
                  component="span"
                  onClick={() => {
                    onClose();
                    setTimeout(() => {
                      const el = document.getElementById('pricing');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  sx={{
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    color: m3Colors.primary,
                    '&:hover': { color: m3Colors.onSurface }
                  }}
                >
                  Choisissez un plan
                </Box>{' '}
                ci-dessous pour obtenir votre code d'accès.
              </Typography>
            </Alert>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, flexDirection: 'column', gap: 1 }}>
        {step === 'phone' ? (
          <>
            <Button
              fullWidth
              variant="contained"
              onClick={handlePhoneSubmit}
              disabled={phoneNumber.length < 8}
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: m3Colors.primary,
                color: m3Colors.onPrimary,
                textTransform: 'none',
                fontWeight: 500,
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#004F4F',
                },
                '&.Mui-disabled': {
                  backgroundColor: m3Colors.surfaceContainerHighest,
                  color: m3Colors.onSurfaceVariant,
                },
              }}
            >
              Continuer
            </Button>
            <Button
              fullWidth
              onClick={handleClose}
              sx={{
                color: m3Colors.onSurfaceVariant,
                textTransform: 'none',
              }}
            >
              Annuler
            </Button>
          </>
        ) : (
          <>
            <Button
              fullWidth
              variant="contained"
              onClick={handleCodeSubmit}
              disabled={isLoading || fixedCode.length < 5}
              sx={{
                backgroundColor: m3Colors.primary,
                color: m3Colors.onPrimary,
                textTransform: 'none',
                fontWeight: 500,
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#004F4F',
                },
                '&.Mui-disabled': {
                  backgroundColor: m3Colors.surfaceContainerHighest,
                  color: m3Colors.onSurfaceVariant,
                },
              }}
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
            <Button
              fullWidth
              onClick={handleBack}
              sx={{
                color: m3Colors.onSurfaceVariant,
                textTransform: 'none',
              }}
            >
              Retour
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default AuthModal;
