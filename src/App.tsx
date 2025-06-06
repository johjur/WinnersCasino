import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store';
import theme from './theme';
import HomePage from './pages/HomePage';
import FavouritesPage from './pages/FavouritesPage';
import LandingPage from './pages/LandingPage';
import Sidebar from './components/Sidebar';
import { Box } from '@mui/material';
import { SoundProvider } from './components/SoundProvider';

interface HomePageProps {
  category?: string;
}

const AppContent: React.FC<{ onEnterCasino: () => void }> = ({ onEnterCasino }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <Box sx={{ display: 'flex' }}>
      {!isLandingPage && <Sidebar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: isLandingPage ? 0 : 3,
          minHeight: '100vh',
          width: isLandingPage ? '100vw' : 'auto',
          overflow: isLandingPage ? 'hidden' : 'auto',
        }}
      >
        <Routes>
          <Route path="/" element={<LandingPage onEnterCasino={onEnterCasino} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/games/slots" element={<HomePage category="slots" />} />
          <Route path="/games/roulette" element={<HomePage category="roulette" />} />
          <Route path="/games/blackjack" element={<HomePage category="blackjack" />} />
          <Route path="/games/poker" element={<HomePage category="poker" />} />
        </Routes>
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  const [shouldPlaySound, setShouldPlaySound] = useState(false);

  const handleEnterCasino = () => {
    setShouldPlaySound(true);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <SoundProvider shouldPlay={shouldPlaySound}>
            <AppContent onEnterCasino={handleEnterCasino} />
          </SoundProvider>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;