import React, { useEffect } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  Rating,
  IconButton,
  useMediaQuery
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Game } from "@features/games/gamesSlice";
import { useTheme } from "@mui/material/styles";
import { soundManager, SoundType } from "../utils/sounds";

type Props = {
  open: boolean;
  onClose: () => void;
  game: Game | null;
};

const GameModal: React.FC<Props> = ({ open, onClose, game }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (open) {
      soundManager.play(SoundType.MODAL_OPEN);
    }
  }, [open]);

  const handleClose = () => {
    soundManager.play(SoundType.MODAL_CLOSE);
    onClose();
  };

  if (!game) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
        sx: {
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        }
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "100%" : 500,
            maxHeight: "90vh",
            bgcolor: "background.paper",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(52, 0, 86, 0.3)",
            p: 6,
            borderRadius: 2,
            outline: "none",
            overflowY: "auto"
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Box mb={2}>
            <img
              src={game.image}
              alt={game.name}
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Box>

          <Typography variant="h5" gutterBottom>
            {game.name}
          </Typography>

          <Rating value={game.rating} readOnly size="medium" />
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Active users: {game.activeUsers}
          </Typography>

          <Typography variant="body1" mt={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
            luctus libero. Quisque finibus diam vel odio commodo, eget ultrices
            velit sagittis. Nulla facilisi.
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default GameModal;