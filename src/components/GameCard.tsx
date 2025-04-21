import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavourite, isGameFavourited, type Game } from '@features/games/gamesSlice';
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { RootState } from "@store/index";
import styled, { keyframes } from "styled-components";

type GameCardProps = {
  game: Game;
  onClick?: () => void; // ✅ allow GameList to pass this
};

const glassShine = keyframes`
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  50% {
    transform: translateX(20%) translateY(20%) rotate(45deg);
  }
  100% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
`;

const GameImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const GameImage = styled.img`
  transition: all 0.15s ease;
  width: 350px;
  height: 200px;
  object-fit: cover;
`;

const GlassOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.15s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
`;

const GameCardContainer = styled.div`
  cursor: pointer;
  
  &:hover ${GameImage} {
    transform: scale(1.02);
    filter: brightness(1.1);
  }
  
  &:hover ${GlassOverlay} {
    opacity: 1;
    
    &::before {
      animation: ${glassShine} 1.7s 1;
      animation-fill-mode: forwards;
    }
  }
`;

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const dispatch = useDispatch();
  const isFavourite = useSelector((state: RootState) =>
    isGameFavourited(state, game.name)
  );

  const handleToggleFavourite = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ prevent triggering onClick for opening modal
    dispatch(toggleFavourite(game.name));
  };

  return (
    <GameCardContainer onClick={onClick}>
      <GameImageContainer>
        <GameImage src={game.image} alt={game.name} />
        <GlassOverlay />
      </GameImageContainer>
      <h3>{game.name}</h3>
      <p>Rating: {game.rating}</p>
      <p>Active users: {game.activeUsers}</p>

      <IconButton onClick={handleToggleFavourite} color="secondary">
        {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </GameCardContainer>
  );
};

export default GameCard;