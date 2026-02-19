// Material Design 3 Theme Configuration
// Seed Colors: Drapeau Allemand — Noir · Rouge · Or
// Primary: #C0001A (Rouge Allemand) | Secondary: #6E5E00 (Or) | Tertiary: #3D3D3D (Anthracite)

import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

// 🇩🇪 Couleurs directes du drapeau allemand (pour accents forts)
export const germanFlag = {
  black: '#1A1A1A',       // Noir (bande du haut)
  red: '#DD0000',          // Rouge vif (bande du milieu)
  gold: '#FFCE00',         // Or vif (bande du bas)
  goldLight: '#FFF3B0',    // Or très clair (fonds)
  goldDark: '#B89200',     // Or foncé (texte sur fond clair)
};

// --- PALETTE CYAN (APP / Espace Membre) ---
export const appColors = {
  primary: '#006A6A',
  onPrimary: '#FFFFFF',
  primaryContainer: '#6FF7F6',
  onPrimaryContainer: '#002020',
  secondary: '#4A6363',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#CCE8E7',
  onSecondaryContainer: '#041F1F',
  tertiary: '#4D5F7C',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#D4E3FF',
  onTertiaryContainer: '#061C36',
  error: '#BA1A1A',
  onError: '#FFFFFF',
  errorContainer: '#FFDAD6',
  onErrorContainer: '#410002',
  surface: '#FAFDFC',
  onSurface: '#191C1C',
  surfaceVariant: '#DAE5E4',
  onSurfaceVariant: '#3F4949',
  outline: '#6F7979',
  outlineVariant: '#BEC8C8',
  shadow: '#000000',
  scrim: '#000000',
  inverseSurface: '#2E3131',
  inverseOnSurface: '#EFF1F0',
  inversePrimary: '#4CDADA',
  surfaceTint: '#006A6A',
  surfaceContainerHighest: '#E0E3E3',
  surfaceContainerHigh: '#E6E9E9',
  surfaceContainer: '#ECEEF1',
  surfaceContainerLow: '#F2F4F7',
  surfaceContainerLowest: '#FFFFFF',
  surfaceBright: '#FAFDFC',
  surfaceDim: '#D9DCDC',
};

// --- PALETTE ROUGE (LANDING PAGE) ---
export const landingColors = {
  primary: '#C0001A',
  onPrimary: '#FFFFFF',
  primaryContainer: '#FFDAD9',
  onPrimaryContainer: '#400009',
  secondary: '#6E5E00',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#FFF0B3',
  onSecondaryContainer: '#221B00',
  tertiary: '#3D3D3D',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#E8E8E8',
  onTertiaryContainer: '#1A1A1A',
  error: '#BA1A1A',
  onError: '#FFFFFF',
  errorContainer: '#FFDAD6',
  onErrorContainer: '#410002',
  surface: '#FFFBF9', // Plus chaud
  onSurface: '#1A1A1A',
  surfaceVariant: '#F5E5E5', // Plus chaud
  onSurfaceVariant: '#4A3535',
  outline: '#7A6060',
  outlineVariant: '#D4BFBF',
  shadow: '#000000',
  scrim: '#000000',
  inverseSurface: '#2E2020',
  inverseOnSurface: '#F5EDEC',
  inversePrimary: '#FFB3B0',
  surfaceTint: '#C0001A',
  surfaceContainerHighest: '#EDE0E0',
  surfaceContainerHigh: '#F2E8E8',
  surfaceContainer: '#F7EEEE',
  surfaceContainerLow: '#FFF5F5',
  surfaceContainerLowest: '#FFFFFF',
  surfaceBright: '#FFF8F8',
  surfaceDim: '#E8D8D8',
};

// M3 Typography Scale with Plus Jakarta Sans
export const m3Typography = {
  fontFamily: '"Plus Jakarta Sans", "Roboto", "Helvetica", "Arial", sans-serif',
  displayLarge: { fontSize: '57px', fontWeight: 700, lineHeight: '64px', letterSpacing: '-0.25px' },
  displayMedium: { fontSize: '45px', fontWeight: 700, lineHeight: '52px', letterSpacing: '0px' },
  displaySmall: { fontSize: '36px', fontWeight: 700, lineHeight: '44px', letterSpacing: '0px' },
  headlineLarge: { fontSize: '32px', fontWeight: 600, lineHeight: '40px', letterSpacing: '0px' },
  headlineMedium: { fontSize: '28px', fontWeight: 600, lineHeight: '36px', letterSpacing: '0px' },
  headlineSmall: { fontSize: '24px', fontWeight: 500, lineHeight: '32px', letterSpacing: '0px' },
  titleLarge: { fontSize: '22px', fontWeight: 500, lineHeight: '28px', letterSpacing: '0px' },
  titleMedium: { fontSize: '16px', fontWeight: 500, lineHeight: '24px', letterSpacing: '0.15px' },
  titleSmall: { fontSize: '14px', fontWeight: 500, lineHeight: '20px', letterSpacing: '0.1px' },
  bodyLarge: { fontSize: '16px', fontWeight: 400, lineHeight: '24px', letterSpacing: '0.5px' },
  bodyMedium: { fontSize: '14px', fontWeight: 400, lineHeight: '20px', letterSpacing: '0.25px' },
  bodySmall: { fontSize: '12px', fontWeight: 400, lineHeight: '16px', letterSpacing: '0.4px' },
  labelLarge: { fontSize: '14px', fontWeight: 500, lineHeight: '20px', letterSpacing: '0.1px' },
  labelMedium: { fontSize: '12px', fontWeight: 500, lineHeight: '16px', letterSpacing: '0.5px' },
  labelSmall: { fontSize: '11px', fontWeight: 500, lineHeight: '16px', letterSpacing: '0.5px' },
};

// M3 Shape/Corner Radius
export const m3Shape = {
  small: 4,
  medium: 12,
  large: 16,
  extraLarge: 28,
};

// M3 Elevation (shadows)
export const m3Elevation = {
  level0: 'none',
  level1: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
  level2: '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
  level3: '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.3)',
  level4: '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px 0px rgba(0, 0, 0, 0.3)',
  level5: '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px 0px rgba(0, 0, 0, 0.3)',
};

const createM3Theme = (colors: typeof appColors, isDarkPrimary: boolean = false) => createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,
      contrastText: colors.onPrimary,
      light: colors.primaryContainer,
      dark: isDarkPrimary ? '#9A0015' : '#004F4F', // Rouge foncé vs Teal foncé
    },
    secondary: {
      main: colors.secondary,
      contrastText: colors.onSecondary,
      light: colors.secondaryContainer,
      dark: isDarkPrimary ? '#4A3E00' : '#324B4B',
    },
    error: {
      main: colors.error,
      contrastText: colors.onError,
      light: colors.errorContainer,
    },
    background: {
      default: colors.surface,
      paper: colors.surfaceVariant,
    },
    text: {
      primary: colors.onSurface,
      secondary: colors.onSurfaceVariant,
    },
    divider: colors.outline,
  },
  typography: {
    fontFamily: m3Typography.fontFamily,
    h1: m3Typography.displayLarge,
    h2: m3Typography.displayMedium,
    h3: m3Typography.displaySmall,
    h4: m3Typography.headlineLarge,
    h5: m3Typography.headlineMedium,
    h6: m3Typography.headlineSmall,
    subtitle1: m3Typography.titleLarge,
    subtitle2: m3Typography.titleMedium,
    body1: m3Typography.bodyLarge,
    body2: m3Typography.bodyMedium,
    button: m3Typography.labelLarge,
    caption: m3Typography.bodySmall,
    overline: m3Typography.labelSmall,
  },
  shape: {
    borderRadius: m3Shape.medium,
  },
  shadows: [
    'none',
    m3Elevation.level1, m3Elevation.level2, m3Elevation.level3, m3Elevation.level4, m3Elevation.level5,
    m3Elevation.level5, m3Elevation.level5, m3Elevation.level5, m3Elevation.level5, m3Elevation.level5,
    m3Elevation.level5, m3Elevation.level5, m3Elevation.level5, m3Elevation.level5, m3Elevation.level5,
    m3Elevation.level5, m3Elevation.level5, m3Elevation.level5, m3Elevation.level5, m3Elevation.level5,
    m3Elevation.level5, m3Elevation.level5, m3Elevation.level5, m3Elevation.level5,
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: m3Shape.small,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: { styleOverrides: { root: { borderRadius: m3Shape.medium } } },
    MuiChip: { styleOverrides: { root: { borderRadius: m3Shape.small } } },
    MuiTextField: { styleOverrides: { root: { '& .MuiOutlinedInput-root': { borderRadius: m3Shape.small } } } },
    MuiDialog: { styleOverrides: { paper: { borderRadius: m3Shape.medium } } },
  },
} as ThemeOptions);

export const appTheme = createM3Theme(appColors, false);
export const landingTheme = createM3Theme(landingColors, true);

// Pour rétro-compatibilité temporaire si nécessaire, mais on va utiliser appTheme ou landingTheme
export const m3Theme = appTheme;

// Export des couleurs pour l'usage direct dans les composants (alias vers appColors pour l'instant pour ne pas tout casser)
// MAIS ATTENTION : Si les composants importent m3Colors, ils auront le Teal.
// Pour la landing, il faudra peut-être utiliser landingColors explicitement ou le thème.
export const m3Colors = appColors;
