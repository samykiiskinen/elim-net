import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:44343/api/auth/login",
        {
          email,
          password,
        }
      );
      const { token } = response.data;
      login(token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
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
      <Button type="submit" variant="contained" color="primary">
        Log In
      </Button>
    </Box>
  );
};

export default Login;
