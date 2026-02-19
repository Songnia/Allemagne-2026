import { 
  BottomNavigation, 
  BottomNavigationAction, 
  Paper,
  useMediaQuery,
  useTheme,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Map, Article, Person } from '@mui/icons-material';
import { m3Colors } from '@/theme/m3-theme';
import type { NavigationTab } from '@/types';

interface NavigationBarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

const navItems: { id: NavigationTab; label: string; icon: React.ElementType }[] = [
  { id: 'roadmap', label: 'Roadmap', icon: Map },
  { id: 'articles', label: 'Articles', icon: Article },
  { id: 'profile', label: 'Profil', icon: Person },
];

function NavigationBar({ activeTab, onTabChange }: NavigationBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (_event: React.SyntheticEvent, newValue: NavigationTab) => {
    onTabChange(newValue);
  };

  // Mobile Bottom Navigation
  if (isMobile) {
    return (
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          borderRadius: '16px 16px 0 0',
          boxShadow: '0px -4px 8px 3px rgba(0, 0, 0, 0.1)',
        }}
        elevation={0}
      >
        <BottomNavigation
          value={activeTab}
          onChange={handleChange}
          sx={{
            backgroundColor: m3Colors.surface,
            height: 72,
            '& .MuiBottomNavigationAction-root': {
              color: m3Colors.onSurfaceVariant,
              '&.Mui-selected': {
                color: m3Colors.primary,
              },
            },
          }}
        >
          {navItems.map((item) => (
            <BottomNavigationAction
              key={item.id}
              value={item.id}
              label={item.label}
              icon={<item.icon />}
              sx={{
                '& .MuiBottomNavigationAction-label': {
                  fontSize: '12px',
                  fontWeight: 500,
                  '&.Mui-selected': {
                    fontSize: '12px',
                  },
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>
    );
  }

  // Desktop Side Navigation (Navigation Rail style)
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 80,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 80,
          boxSizing: 'border-box',
          backgroundColor: m3Colors.surfaceContainerLow,
          borderRight: `1px solid ${m3Colors.outlineVariant}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 3,
        },
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '12px',
          backgroundColor: m3Colors.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: m3Colors.onPrimary,
            fontWeight: 700,
            fontSize: '14px',
          }}
        >
          DE
        </Typography>
      </Box>

      {/* Navigation Items */}
      <List sx={{ width: '100%', px: 1 }}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <ListItem
              key={item.id}
              onClick={() => onTabChange(item.id)}
              sx={{
                flexDirection: 'column',
                alignItems: 'center',
                py: 1.5,
                px: 1,
                borderRadius: '12px',
                cursor: 'pointer',
                mb: 1,
                backgroundColor: isActive ? `${m3Colors.primary}15` : 'transparent',
                '&:hover': {
                  backgroundColor: isActive ? `${m3Colors.primary}20` : m3Colors.surfaceContainer,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 'auto',
                  color: isActive ? m3Colors.primary : m3Colors.onSurfaceVariant,
                  mb: 0.5,
                }}
              >
                <item.icon />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '11px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? m3Colors.primary : m3Colors.onSurfaceVariant,
                  textAlign: 'center',
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

export default NavigationBar;
