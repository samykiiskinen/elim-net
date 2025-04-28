import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import UserForm from "./UserForm";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

const AddUserButton: React.FC<{ onUserAdded: () => void }> = ({
  onUserAdded,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        <AddTwoToneIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
              marginLeft: "1rem",
              marginTop: "0.5rem",
            }}
          >
            <Button
              onClick={handleClose}
              color="secondary"
              variant="contained"
              sx={{ fontSize: "large" }}
            >
              {"<<"}
            </Button>
          </Box>
        </DialogActions>
        <DialogContent>
          <UserForm onClose={handleClose} onUserAdded={onUserAdded} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddUserButton;
