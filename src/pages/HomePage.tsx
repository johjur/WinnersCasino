import React from "react";
import { Typography, Box, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GameList from "@components/GameList";

interface HomePageProps {
  category?: string;
}

const HomePage: React.FC<HomePageProps> = ({ category }) => {
  const navigate = useNavigate();
  const showWelcomeAndOverview = !category; // Only show on main page

  return (
    <>
      <Box sx={{ 
        position: 'relative', 
        overflow: 'hidden', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #2d0b4d 100%)'
      }}>
        {/* Main content with higher z-index */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Container maxWidth="lg">
            {showWelcomeAndOverview && (
              <>
                {/* Welcome Section */}
                <Box sx={{ py: 6, textAlign: 'center' }}>
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      mb: 3,
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      background: 'linear-gradient(135deg,rgb(81, 0, 255) 0%, #e040fb 50%, #9c27b0 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 8px rgba(156, 39, 176, 0.3))',
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: { xs: '2.5rem', md: '4rem' },
                      lineHeight: 1.1,
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: '-30px',
                        right: '-30px',
                        height: '120%',
                        background: 'linear-gradient(90deg, transparent, rgba(156, 39, 176, 0.1), transparent)',
                        transform: 'translateY(-50%) skewY(-5deg)',
                        zIndex: -1,
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-10px',
                        left: '50%',
                        width: '100px',
                        height: '4px',
                        background: 'linear-gradient(90deg, transparent,rgb(140, 0, 255), transparent)',
                        transform: 'translateX(-50%)',
                      }
                    }}
                  >
                    Welcome to<br />
                    Johanna's Casino
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 4,
                      color: '#FFFFFF',
                      maxWidth: '800px',
                      mx: 'auto',
                      lineHeight: 1.6
                    }}
                  >
                    Your ultimate destination for premium online gaming experiences. 
                    Discover a world of excitement with our diverse collection of games.
                  </Typography>
                </Box>

                {/* Overview Section */}
                <Box sx={{ mb: 6 }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      mb: 4,
                      textAlign: 'center',
                      color: '#FFD700',
                      fontWeight: 900,
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: { xs: '1.8rem', md: '2.5rem' },
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      position: 'relative',
                    }}
                  >
                    Game Categories Overview
                  </Typography>
                  <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      md: 'repeat(3, 1fr)'
                    },
                    gap: 3
                  }}>
                    <Paper 
                      elevation={3} 
                      onClick={() => navigate('/games/slots')}
                      sx={{ 
                        p: 3, 
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          background: 'rgba(255, 255, 255, 0.15)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                        }
                      }}
                    >
                      <Typography variant="h6" sx={{ color: '#9c27b0', mb: 2 }}>
                        Slots
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
                        Experience the thrill of our diverse slot collection, featuring classic reels, 
                        progressive jackpots, and innovative bonus features.
                      </Typography>
                    </Paper>
                    <Paper 
                      elevation={3} 
                      onClick={() => navigate('/games/roulette')}
                      sx={{ 
                        p: 3, 
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          background: 'rgba(255, 255, 255, 0.15)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                        }
                      }}
                    >
                      <Typography variant="h6" sx={{ color: '#9c27b0', mb: 2 }}>
                        Table Games
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
                        Test your skills with our selection of table games, including Roulette, 
                        where strategy meets chance in an exciting gaming experience.
                      </Typography>
                    </Paper>
                    <Paper 
                      elevation={3}
                      onClick={() => navigate('/games/blackjack')}
                      sx={{ 
                        p: 3, 
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          background: 'rgba(255, 255, 255, 0.15)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                        }
                      }}
                    >
                      <Typography variant="h6" sx={{ color: '#9c27b0', mb: 2 }}>
                        Card Games
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
                        Challenge yourself with our card games collection, featuring Blackjack and Poker, 
                        where skill and strategy can lead to big wins.
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              </>
            )}

            {/* Games Section */}
            <Box sx={{ mb: 4 }}>
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
                  🎰
                </Box>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    textAlign: 'center',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    background: 'linear-gradient(135deg,#9c27b0 0%,rgb(170, 64, 251) 50%, #9c27b0 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 8px rgba(156, 39, 176, 0.3))',
                    position: 'relative',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: { xs: '2rem', md: '3.5rem' },
                    lineHeight: 1.1,
                    mb: 2,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: '10%',
                      width: '80%',
                      height: '3px',
                      background: 'linear-gradient(90deg, transparent,rgb(177, 70, 227), #e040fb, #9c27b0, transparent)',
                    }
                  }}
                >
                  {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Games` : 'All Games'}
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
                <Box component="span" sx={{ filter: 'none', WebkitBackgroundClip: 'unset', WebkitTextFillColor: 'unset' }}>
                  🎰
                </Box>
                {' Discover Your Next Big Win! '}
                <Box component="span" sx={{ filter: 'none', WebkitBackgroundClip: 'unset', WebkitTextFillColor: 'unset' }}>
                  💰
                </Box>
              </Box>
              <GameList filterCategory={category} hideDragDrop={!category} />
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;