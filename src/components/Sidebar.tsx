import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  IconButton,
  Drawer,
} from '@mui/material';
import {
  Home as HomeIcon,
  Casino as CasinoIcon,
  Favorite as FavoriteIcon,
  ExpandLess,
  ExpandMore,
  SportsEsports as SlotsIcon,
  ViewList as TableGamesIcon,
  CardMembership as CardGamesIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { soundManager, SoundType } from "../utils/sounds";
import { SoundSettings } from './SoundSettings';

const MenuButton = styled(IconButton)`
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 1200;
  background-color: #1a1a1a;
  color: #9c27b0;
  width: 40px;
  height: 40px;
  &:hover {
    background-color: #2d0b4d;
  }
`;

const CloseButton = styled(IconButton)`
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 1300;
  color: white;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const SidebarContent = styled(Box)`
  width: 280px;
  background: linear-gradient(180deg,rgba(44, 17, 63, 0.97) 0%,rgba(17, 2, 31, 0.97) 100%);
  color: white;
  height: 100%;
  padding-top: 64px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const SoundButtonContainer = styled(Box)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [openCategories, setOpenCategories] = useState(false);
  const [openTableGames, setOpenTableGames] = useState(false);
  const [openCardGames, setOpenCardGames] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (path: string) => {
    soundManager.play(SoundType.NAVIGATION);
    navigate(path);
    setIsOpen(false);
  };

  const handleCategoryClick = () => {
    soundManager.play(SoundType.BUTTON_CLICK);
    setOpenCategories(!openCategories);
  };

  const handleTableGamesClick = () => {
    soundManager.play(SoundType.BUTTON_CLICK);
    setOpenTableGames(!openTableGames);
  };

  const handleCardGamesClick = () => {
    soundManager.play(SoundType.BUTTON_CLICK);
    setOpenCardGames(!openCardGames);
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MenuButton 
        onClick={toggleDrawer}
        sx={{
          position: 'fixed',
          right: '20px',
          left: 'auto'
        }}
      >
        <MenuIcon />
      </MenuButton>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            background: 'transparent',
          },
        }}
      >
        <SidebarContent>
          <CloseButton 
            onClick={toggleDrawer}
            sx={{
              position: 'absolute',
              right: '20px',
              top: '20px',
              left: 'auto'
            }}
          >
            <CloseIcon />
          </CloseButton>
          <List sx={{ mt: 2 }}>
            {/* Home Category */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/home')}>
                <ListItemIcon>
                  <HomeIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            {/* Game Categories */}
            <ListItem disablePadding>
              <ListItemButton onClick={handleCategoryClick}>
                <ListItemIcon>
                  <CasinoIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Game Categories" />
                {openCategories ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openCategories} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* Slots */}
                <ListItem disablePadding sx={{ pl: 4 }}>
                  <ListItemButton onClick={() => handleNavigation('/games/slots')}>
                    <ListItemIcon>
                      <SlotsIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Slots" />
                  </ListItemButton>
                </ListItem>

                {/* Table Games */}
                <ListItem disablePadding sx={{ pl: 4 }}>
                  <ListItemButton onClick={handleTableGamesClick}>
                    <ListItemIcon>
                      <TableGamesIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Table Games" />
                    {openTableGames ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openTableGames} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem disablePadding sx={{ pl: 8 }}>
                      <ListItemButton onClick={() => handleNavigation('/games/roulette')}>
                        <ListItemText primary="Roulette" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Collapse>

                {/* Card Games */}
                <ListItem disablePadding sx={{ pl: 4 }}>
                  <ListItemButton onClick={handleCardGamesClick}>
                    <ListItemIcon>
                      <CardGamesIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Card Games" />
                    {openCardGames ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openCardGames} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem disablePadding sx={{ pl: 8 }}>
                      <ListItemButton onClick={() => handleNavigation('/games/blackjack')}>
                        <ListItemText primary="Blackjack" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ pl: 8 }}>
                      <ListItemButton onClick={() => handleNavigation('/games/poker')}>
                        <ListItemText primary="Poker" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Collapse>
              </List>
            </Collapse>

            {/* Favourites */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/favourites')}>
                <ListItemIcon>
                  <FavoriteIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Favourites" />
              </ListItemButton>
            </ListItem>
          </List>

          {/* Sound button in bottom right */}
          <SoundButtonContainer>
            <SoundSettings />
          </SoundButtonContainer>
        </SidebarContent>
      </Drawer>
    </>
  );
};

export default Sidebar;