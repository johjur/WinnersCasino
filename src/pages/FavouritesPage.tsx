import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFavourites } from '@features/games/gamesSlice';
import GameCard from '@components/GameCard';
import { Container, Typography, Grid, Box, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch } from '@mui/material';
import DraggableGameList from '@components/DraggableGameList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const FavouritesPage: React.FC = () => {
  const favouriteGames = useSelector(selectFavourites);
  const [sortBy, setSortBy] = useState<"name" | "rating" | "activeUsers">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isDragMode, setIsDragMode] = useState(false);

  const sortedGames = [...favouriteGames].sort((a, b) => {
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

  return (
    <Container>
      <Typography variant="h2" sx={{ mb: 4, color: '#FFD700' }}>
        Your Favourite Games
      </Typography>
      {favouriteGames.length === 0 ? (
        <Typography variant="h5" sx={{ color: '#FFFFFF' }}>
          You haven't added any games to your favourites yet.
        </Typography>
      ) : (
        <>
          <Box display="flex" gap={2} mb={3} alignItems="center">
            <FormControl variant="outlined" size="small">
              <InputLabel id="sort-by-label">Sort By</InputLabel>
              <Select
                labelId="sort-by-label"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "name" | "rating" | "activeUsers")
                }
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
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                label="Order"
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>

          
          </Box>

          {isDragMode && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Drag and drop games to reorder them
            </Typography>
          )}

          {isDragMode ? (
            <DndProvider backend={HTML5Backend}>
              <DraggableGameList games={sortedGames} isFavourites={true} />
            </DndProvider>
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
              {sortedGames.map((game) => (
                <Box key={game.name}>
                  <GameCard game={game} />
                </Box>
              ))}
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default FavouritesPage;