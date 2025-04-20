import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "./AuthContext";

const LoginDialog: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44343/api/Auth/login",
        {
          email,
          password,
        }
      );
      const { token } = response.data;
      login(token);
      onClose();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: "flex", gap: 1, marginRight: 3, marginBottom: 2 }}>
          <Button onClick={onClose} color="error" variant="contained">
            {"<<"}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            LOGGA IN
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
