import React, { useRef } from 'react';
import { useDrag, useDrop, DndProvider, useDragLayer, DragPreviewImage } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import { Game } from '@features/games/gamesSlice';
import { selectAllGames, selectCustomOrder, updateCustomOrder } from '@features/games/gamesSlice';
import GameCard from './GameCard';
import { Box } from '@mui/material';
import styled from 'styled-components';

const DraggableItem = styled(Box)<{ isDragging: boolean }>`
  user-select: none;
  padding: 8px;
  margin: 0 0 8px 0;
  min-height: 50px;
  background-color: ${props => props.isDragging ? '#263B4A' : 'transparent'};
  color: white;
  border-radius: 8px;
  box-shadow: ${props => props.isDragging ? '0 4px 8px rgba(0, 0, 0, 0.3)' : 'none'};
  transition: all 0.2s ease;
  cursor: grab;
  opacity: ${props => props.isDragging ? 0.8 : 1};
  position: relative;
  width: 360px;

  &:hover {
    background-color:rgb(42, 17, 64);
  }

  &:active {
    cursor: grabbing;
  }
`;

const DroppableContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 8px;
  min-height: 100px;
  border-radius: 8px;
  position: relative;
`;

type DraggableGameListProps = {
  filterCategory?: string;
};

interface DragItem {
  index: number;
  type: string;
  id: string;
}


const DraggableGame: React.FC<{
  game: Game;
  index: number;
  moveGame: (dragIndex: number, hoverIndex: number) => void;
}> = ({ game, index, moveGame }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag, preview] = useDrag({
    type: 'GAME',
    item: { type: 'GAME', index, id: game.name, game },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  });

  const transparentImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

  const [, drop] = useDrop<DragItem, void, unknown>({
    accept: 'GAME',
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Determine if we're moving horizontally or vertically
      const isMovingHorizontally = Math.abs(hoverClientX - hoverMiddleX) > Math.abs(hoverClientY - hoverMiddleY);

      if (isMovingHorizontally) {
        // Horizontal movement
        if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
          return;
        }
      } else {
        // Vertical movement
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
      }

      moveGame(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <DraggableItem
      ref={ref}
      isDragging={isDragging}
      style={{ opacity: isDragging ? 0.2 : 1 }}
    >
      <DragPreviewImage connect={preview} src={transparentImage} />
      <GameCard game={game} />
    </DraggableItem>
  );
};

const DraggableGameList: React.FC<DraggableGameListProps> = ({ filterCategory }) => {
  const dispatch = useDispatch();
  const games = useSelector(selectAllGames);
  const customOrder = useSelector(selectCustomOrder);

  const filteredGames = filterCategory
    ? games.filter((game) => game.category === filterCategory)
    : games;

  const sortedGames = [...filteredGames].sort((a, b) => {
    if (!filterCategory || !customOrder[filterCategory]) {
      return 0;
    }
    const orderA = customOrder[filterCategory][a.name] || 0;
    const orderB = customOrder[filterCategory][b.name] || 0;
    return orderA - orderB;
  });

  const moveGame = (dragIndex: number, hoverIndex: number) => {
    if (!filterCategory) return;

    const items = Array.from(sortedGames);
    const [draggedItem] = items.splice(dragIndex, 1);
    items.splice(hoverIndex, 0, draggedItem);

    const newOrder = items.reduce((acc, game, index) => {
      acc[game.name] = index;
      return acc;
    }, {} as { [key: string]: number });

    dispatch(updateCustomOrder({ category: filterCategory, order: newOrder }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <DroppableContainer>
        {sortedGames.map((game, index) => (
          <DraggableGame
            key={game.name}
            game={game}
            index={index}
            moveGame={moveGame}
          />
        ))}
      </DroppableContainer>
    </DndProvider>
  );
};

export default DraggableGameList; 