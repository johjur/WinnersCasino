import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormControlLabel,
  Switch,
  Typography
} from "@mui/material";
import { RootState, AppDispatch } from "@store/index";
import { fetchGames, Game, selectAllGames } from "@features/games/gamesSlice";
import GameCard from "./GameCard";
import GameModal from "./GameModal";
import DraggableGameList from "./DraggableGameList";
import { soundManager, SoundType } from "../utils/sounds";

interface GameListProps {
  filterCategory?: string;
  hideDragDrop?: boolean;
  onGameHover?: () => void;
  onGameClick?: () => void;
}

const GameList: React.FC<GameListProps> = ({ 
  filterCategory, 
  hideDragDrop,
  onGameHover,
  onGameClick 
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const games = useSelector(selectAllGames);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "rating" | "activeUsers">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isDragMode, setIsDragMode] = useState(false);
  
  const sortedGames = [...games].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
  
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortOrder === "asc"
        ? aVal.toLowerCase().localeCompare(bVal.toLowerCase())
        : bVal.toLowerCase().localeCompare(aVal.toLowerCase());
    }
  
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    }
  
    return 0;
  });

  const filteredGames = filterCategory
    ? sortedGames.filter((game) => game.category === filterCategory)
    : sortedGames;

  const openModal = (game: Game) => {
    soundManager.play(SoundType.CARD_CLICK);
    setSelectedGame(game);
    setModalOpen(true);
  };

  const closeModal = () => {
    soundManager.play(SoundType.MODAL_CLOSE);
    setModalOpen(false);
    setSelectedGame(null);
  };

  const handleSortChange = (e: any) => {
    soundManager.play(SoundType.SORT);
    setSortBy(e.target.value as "name" | "rating" | "activeUsers");
  };

  const handleOrderChange = (e: any) => {
    soundManager.play(SoundType.SORT);
    setSortOrder(e.target.value as "asc" | "desc");
  };

  const handleDragModeChange = (e: any) => {
    soundManager.play(SoundType.BUTTON_CLICK);
    setIsDragMode(e.target.checked);
  };

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  return (
    <>
      <Box display="flex" gap={2} mb={3} alignItems="center">
        <FormControl variant="outlined" size="small">
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortBy}
            onChange={handleSortChange}
            label="Sort By"
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="activeUsers">Active Users</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small">
          <InputLabel id="order-label">Order</InputLabel>
          <Select
            labelId="order-label"
            value={sortOrder}
            onChange={handleOrderChange}
            label="Order"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>

        {!hideDragDrop && (
          <FormControlLabel
            control={
              <Switch
                checked={isDragMode}
                onChange={handleDragModeChange}
              />
            }
            label="Drag and Drop to Sort"
          />
        )}
      </Box>

      {isDragMode && !hideDragDrop && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Drag and drop games to reorder them
        </Typography>
      )}

      {isDragMode && !hideDragDrop ? (
        <DraggableGameList filterCategory={filterCategory} />
      ) : (
        <Grid container spacing={3}>
          {filteredGames.map((game, index) => (
            <Grid key={index} sx={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <GameCard 
                game={game} 
                onClick={() => {
                  onGameClick?.();
                  openModal(game);
                }}
                onHover={onGameHover}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <GameModal
        open={modalOpen}
        onClose={closeModal}
        game={selectedGame}
      />
    </>
  );
};

export default GameList;