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
import { jwtDecode } from "jwt-decode";

const LoginDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  slotProps?: any;
}> = ({ open, onClose, slotProps }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44343/api/Users/login",
        {
          email,
          password,
        }
      );
      const { accessToken } = response.data;
      if (typeof accessToken !== "string" || accessToken.trim() === "") {
        console.error("Login returned invalid token:", accessToken);
        return;
      }
      const decodedToken: any = jwtDecode(accessToken);
      const roles = decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ]
        ? [
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ],
          ]
        : [];
      await login(accessToken, email, roles);
      onClose();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} slotProps={slotProps}>
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
        <Box
          sx={{
            display: "flex",
            gap: 1,
            marginRight: 3,
            marginBottom: 2,
          }}
        >
          <Button
            onClick={onClose}
            color="error"
            variant="contained"
            sx={{ fontSize: "1.2rem" }}
          >
            {"<<"}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ fontSize: "1rem" }}
          >
            LOGGA IN
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
