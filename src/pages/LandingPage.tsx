import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Box, Typography, Container } from '@mui/material';
import { Howl } from 'howler';
import './LandingPage.css';

// Detailed 3D Coin Component
const Coin = () => (
  <Box
    sx={{
      width: '40px',
      height: '40px',
      position: 'relative',
      transformStyle: 'preserve-3d',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #FFD700, #FDB931)',
        border: '2px solid #B4881D',
        boxShadow: `
          inset 0 0 10px rgba(255, 215, 0, 0.5),
          0 0 20px rgba(255, 215, 0, 0.3)
        `,
      },
      '&::after': {
        content: '"€"',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#B4881D',
        fontSize: '24px',
        fontWeight: 'bold',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
      }
    }}
  />
);

// Sound effects
const coinSound = new Howl({
  src: ['https://assets.mixkit.co/sfx/preview/mixkit-coins-handling-1939.mp3'],
  volume: 0.5,
  preload: true
});

const winSound = new Howl({
  src: ['https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3'],
  volume: 0.5,
  preload: true
});

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    // Create initial coins
    const initialCoins = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -100
    }));
    setCoins(initialCoins);

    // Play background sound
    winSound.play();

    return () => {
      winSound.stop();
    };
  }, []);

  const handleEnter = (e: React.MouseEvent) => {
    e.preventDefault();
    coinSound.play();
    navigate('/home', { replace: true });
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(45deg, #1a1a1a 0%, #2d1a1a 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(
              circle at center,
              rgba(76, 12, 105, 0.5) 0%,
              rgba(76, 12, 105, 0.5) 48%,
              rgba(0, 0, 0, 1) 100%
            )
          `,
          zIndex: 1
        }
      }}
    >
      {/* Animated coins */}
      {coins.map((coin) => (
        <motion.div
          key={coin.id}
          initial={{ x: coin.x, y: -100, rotate: 0 }}
          animate={{
            y: window.innerHeight + 100,
            rotate: 360,
            x: coin.x + Math.random() * 200 - 100
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          style={{
            position: 'absolute',
            zIndex: 1,
            perspective: '1000px'
          }}
        >
          <Coin />
        </motion.div>
      ))}

      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
          padding: 0,
          maxWidth: '100% !important'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h1"
            sx={{
              color: '#FFD700',
              textAlign: 'center',
              textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
              fontSize: { xs: '2.5rem', md: '4rem' },
              mb: 2,
              fontWeight: 'bold',
              letterSpacing: '0.1em'
            }}
          >
            WIN BIG TODAY!
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: '#FFFFFF',
              textAlign: 'center',
              fontSize: { xs: '1.5rem', md: '2.5rem' },
              mb: 4,
              '& .euro': {
                color: '#FFD700',
                textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
                fontWeight: 'bold'
              }
            }}
          >
            Guaranteed <span className="euro">500,000€</span> Jackpot!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleEnter}
                sx={{
                  background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                  color: '#000',
                  fontSize: '1.5rem',
                  padding: '1rem 3rem',
                  borderRadius: '50px',
                  boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FFA500 30%, #FFD700 90%)',
                  }
                }}
              >
                ENTER CASINO
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LandingPage; 