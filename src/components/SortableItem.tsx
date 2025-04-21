import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';
import styled from 'styled-components';

const SortableItemWrapper = styled(Box)<{ isDragging: boolean }>`
  transition: transform 0.2s ease;
  transform: ${props => props.isDragging ? 'scale(1.05)' : 'scale(1)'};
  opacity: ${props => props.isDragging ? 0.5 : 1};
  cursor: move;
  user-select: none;
`;

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

export const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <SortableItemWrapper
      ref={setNodeRef}
      style={style}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
    >
      {children}
    </SortableItemWrapper>
  );
}; 