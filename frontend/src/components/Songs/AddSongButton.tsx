import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import SongForm from "./SongForm";

const AddSongButton = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        LÄGG TILL
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <SongForm onClose={handleClose} />
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
              marginLeft: "1rem",
              marginBottom: "1rem",
            }}
          >
            <Button onClick={handleClose} color="secondary" variant="contained">
              ÅNGRA
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddSongButton;
