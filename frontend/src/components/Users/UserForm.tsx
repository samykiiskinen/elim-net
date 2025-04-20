import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Box } from "@mui/material";
import axios from "axios";
import { User, UserClaim } from "../../types/interfaces";
import { FormProps } from "../../types/interfaces";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

const UserForm: React.FC<FormProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [claims, setClaims] = useState<UserClaim[]>([{ value: "" }]);

  const handleClaimChange = (index: number, value: string) => {
    const newClaims = [...claims];
    newClaims[index].value = value;
    setClaims(newClaims);
  };

  const addClaim = () => {
    setClaims([...claims, { value: "" }]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const userData: User = {
      email,
      password,
      claims,
    };

    try {
      const response = await axios.post(
        "https://localhost:44343/api/Auth/register",
        userData
      );
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto" }}>
      <form onSubmit={handleSubmit}>
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

        <Typography variant="h6" gutterBottom>
          ACCESS
        </Typography>
        {claims.map((claim, index) => (
          <Grid container spacing={2} key={index} marginBottom={2}>
            <Grid>
              <TextField
                label="Behörighet"
                variant="outlined"
                fullWidth
                value={claim.value}
                onChange={(e) => handleClaimChange(index, e.target.value)}
                required
              />
            </Grid>
            <Grid container alignItems="center" justifyContent="center">
              <Button onClick={addClaim} variant="contained" color="success">
                <AddTwoToneIcon />
              </Button>
            </Grid>
          </Grid>
        ))}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ fontSize: "medium", marginTop: "0.5rem" }}
        >
          LÄGG TILL
        </Button>
      </form>
    </Box>
  );
};

export default UserForm;
