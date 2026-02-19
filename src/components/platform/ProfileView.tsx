import { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import {
  Phone,
  Logout,
  Warning,
  Stars,
} from '@mui/icons-material';
import { m3Colors } from '@/theme/m3-theme';
import { useAppStore } from '@/store/useAppStore';
import { pricingTiers } from '@/data/mockData';

function ProfileView() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const { 
    user, 
    subscription, 
    roadmapSteps, 
    articles, 
    overallProgress, 
    logout,
    openPaymentModal,
  } = useAppStore();

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  const completedSteps = roadmapSteps.filter(s => s.isCompleted).length;
  const readArticles = articles.filter(a => a.isRead).length;
  const currentTier = pricingTiers.find(t => t.id === subscription.tier);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'complete':
        return m3Colors.primary;
      case 'simple':
        return m3Colors.tertiary;
      default:
        return m3Colors.onSurfaceVariant;
    }
  };

  return (
    <Box>
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: m3Colors.onSurface,
          mb: 4,
        }}
      >
        Mon Profil
      </Typography>

      {/* Profile Card */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 3,
          backgroundColor: m3Colors.surfaceContainerLow,
          borderRadius: '16px',
          border: `1px solid ${m3Colors.outlineVariant}`,
          textAlign: 'center',
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            mx: 'auto',
            mb: 2,
            backgroundColor: m3Colors.primary,
            color: m3Colors.onPrimary,
            fontSize: '40px',
            fontWeight: 600,
          }}
        >
          {user?.phoneNumber?.charAt(0) || 'U'}
        </Avatar>
        
        <Typography variant="h5" sx={{ fontWeight: 600, color: m3Colors.onSurface, mb: 1 }}>
          Utilisateur
        </Typography>
        
        <Typography variant="body2" sx={{ color: m3Colors.onSurfaceVariant, mb: 2 }}>
          {user?.phoneNumber}
        </Typography>

        <Chip
          label={subscription.tier === 'free' ? 'Gratuit' : subscription.tier === 'simple' ? 'Simple' : 'Complete'}
          sx={{
            backgroundColor: `${getTierColor(subscription.tier)}20`,
            color: getTierColor(subscription.tier),
            fontWeight: 600,
          }}
        />
      </Paper>

      {/* Progress Overview */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          backgroundColor: m3Colors.surfaceContainerLow,
          borderRadius: '16px',
          border: `1px solid ${m3Colors.outlineVariant}`,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: m3Colors.onSurface, mb: 3 }}>
          Ma progression
        </Typography>

        {/* Overall Progress */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ color: m3Colors.onSurfaceVariant }}>
              Progression globale
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: m3Colors.primary }}>
              {overallProgress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={overallProgress}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: m3Colors.surfaceContainerHighest,
              '& .MuiLinearProgress-bar': {
                backgroundColor: m3Colors.primary,
                borderRadius: 5,
              },
            }}
          />
        </Box>

        {/* Stats Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              backgroundColor: m3Colors.surface,
              borderRadius: '12px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, color: m3Colors.primary, mb: 0.5 }}>
              {completedSteps}/{roadmapSteps.length}
            </Typography>
            <Typography variant="caption" sx={{ color: m3Colors.onSurfaceVariant }}>
              Étapes complétées
            </Typography>
          </Paper>
          
          <Paper
            elevation={0}
            sx={{
              p: 2,
              backgroundColor: m3Colors.surface,
              borderRadius: '12px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, color: m3Colors.primary, mb: 0.5 }}>
              {readArticles}/{articles.length}
            </Typography>
            <Typography variant="caption" sx={{ color: m3Colors.onSurfaceVariant }}>
              Articles lus
            </Typography>
          </Paper>
        </Box>
      </Paper>

      {/* Subscription Card */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          backgroundColor: m3Colors.surfaceContainerLow,
          borderRadius: '16px',
          border: `1px solid ${m3Colors.outlineVariant}`,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: m3Colors.onSurface, mb: 2 }}>
          Mon abonnement
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '12px',
              backgroundColor: getTierColor(subscription.tier),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Stars sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: m3Colors.onSurface }}>
              Formule {currentTier?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: m3Colors.onSurfaceVariant }}>
              {subscription.tier === 'free' 
                ? 'Accès limité' 
                : `Payé le ${subscription.purchasedAt?.toLocaleDateString('fr-FR')}`}
            </Typography>
          </Box>
        </Box>

        {subscription.tier !== 'complete' && (
          <Alert
            severity="info"
            sx={{
              mb: 2,
              borderRadius: '8px',
              backgroundColor: m3Colors.primaryContainer,
              color: m3Colors.onPrimaryContainer,
              '& .MuiAlert-icon': {
                color: m3Colors.primary,
              },
            }}
          >
            Passez à Complete pour débloquer toutes les étapes et rejoindre la communauté Telegram.
          </Alert>
        )}

        {subscription.tier !== 'complete' && (
          <Button
            fullWidth
            variant="contained"
            onClick={() => openPaymentModal('complete')}
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
            Passer à Complete
          </Button>
        )}
      </Paper>

      {/* Account Actions */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor: m3Colors.surfaceContainerLow,
          borderRadius: '16px',
          border: `1px solid ${m3Colors.outlineVariant}`,
          overflow: 'hidden',
        }}
      >
        <List>
          <ListItem>
            <ListItemIcon>
              <Phone sx={{ color: m3Colors.onSurfaceVariant }} />
            </ListItemIcon>
            <ListItemText
              primary="Téléphone"
              secondary={user?.phoneNumber}
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItem>
          
          <Divider component="li" />
          
          <ListItem
            onClick={() => setShowLogoutConfirm(true)}
            sx={{
              color: m3Colors.error,
              cursor: 'pointer',
            }}
          >
            <ListItemIcon>
              <Logout sx={{ color: m3Colors.error }} />
            </ListItemIcon>
            <ListItemText
              primary="Se déconnecter"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItem>
        </List>
      </Paper>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            backgroundColor: m3Colors.surface,
          },
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Warning sx={{ color: m3Colors.error, fontSize: 32 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Confirmer la déconnexion
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: m3Colors.onSurfaceVariant }}>
            Êtes-vous sûr de vouloir vous déconnecter ? Vos progrès seront sauvegardés.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={() => setShowLogoutConfirm(false)}
            sx={{
              color: m3Colors.onSurfaceVariant,
              textTransform: 'none',
            }}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              backgroundColor: m3Colors.error,
              color: m3Colors.onError,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#9A0000',
              },
            }}
          >
            Se déconnecter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProfileView;
