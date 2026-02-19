import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { appTheme, landingTheme } from '@/theme/m3-theme'; // Import des deux thèmes
import { useAppStore } from '@/store/useAppStore';

// Pages
import LandingPage from '@/pages/LandingPage';
import PlatformPage from '@/pages/PlatformPage';

// Composant pour basculer le thème dynamiquement
function ThemeController({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  // Si on est sur /platform, on utilise le thème App (Cyan), sinon Landing (Rouge)
  const isPlatform = location.pathname.startsWith('/platform');
  const theme = isPlatform ? appTheme : landingTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

function App() {
  const { isAuthenticated } = useAppStore();

  return (
    <Router>
      <ThemeController>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/platform" /> : <LandingPage />}
          />
          <Route
            path="/platform/*" // Ajout de l'étoile pour les sous-routes
            element={isAuthenticated ? <PlatformPage /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ThemeController>
    </Router>
  );
}

export default App;
