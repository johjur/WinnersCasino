import React from "react";
import { Typography, Box } from "@mui/material";
import GameList from "@components/GameList";

type Props = {
  category: string;
};

const GamePage: React.FC<Props> = ({ category }) => {
  const getPageTitle = () => {
    switch (category) {
      case 'slots':
        return 'Slots';
      case 'roulette':
        return 'Roulette';
      case 'blackjack':
        return 'Blackjack';
      case 'poker':
        return 'Poker';
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'slots':
        return '🎰';
      case 'roulette':
        return '🎲';
      case 'blackjack':
        return '♠️';
      case 'poker':
        return '♦️';
      default:
        return '';
    }
  };

  const getCategoryMessage = () => {
    switch (category) {
      case 'slots':
        return 'Spin to Win Big! Massive Jackpots Await';
      case 'roulette':
        return 'Place Your Bets! The Wheel of Fortune Awaits';
      case 'blackjack':
        return 'Beat the Dealer! Double Down on Victory';
      case 'poker':
        return 'Show Your Skills! Become the Champion';
      default:
        return 'Your Next Big Win Awaits!';
    }
  };

  return (
    <>
      <Box sx={{ 
        position: 'relative', 
        overflow: 'hidden', 
        minHeight: '100vh',
      }}>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mb: 4,
              gap: 2
            }}
          >
            <Box 
              component="span" 
              sx={{ 
                fontSize: '3rem',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                background: 'none',
                WebkitBackgroundClip: 'unset',
                WebkitTextFillColor: 'unset',
                filter: 'none'
              }}
            >
              {getCategoryIcon()}
            </Box>
            <Typography 
              variant="h2" 
              sx={{ 
                textAlign: 'center',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                background: 'linear-gradient(45deg, #9c27b0 30%, #e040fb 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5))',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -4,
                  left: '10%',
                  width: '80%',
                  height: 2,
                  background: 'linear-gradient(90deg, transparent, #9c27b0, transparent)',
                }
              }}
            >
              {getPageTitle()}
            </Typography>
          </Box>
          <Box 
            sx={{ 
              textAlign: 'center', 
              mb: 4,
              typography: 'h6',
              background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 600,
              letterSpacing: '0.05em',
              filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3))',
            }}
          >
            {getCategoryMessage()}
          </Box>
          <GameList filterCategory={category} />
        </Box>
      </Box>
    </>
  );
};

export default GamePage;