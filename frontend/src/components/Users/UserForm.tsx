import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Chip,
  Container,
} from "@mui/material";
import { User } from "../../types/interfaces";
import { FormProps } from "../../types/interfaces";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import api from "../../services/api";

type DisplayUserRole = "Admin" | "Bistånd" | "Ekonomi" | "Lovsång";

const UserForm: React.FC<FormProps> = ({ onClose, onUserAdded }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<DisplayUserRole | "">("");
  const [roles, setRoles] = useState<DisplayUserRole[]>([]);
  const availableRoles = ["Admin", "Bistånd", "Ekonomi", "Lovsång"];

  const roleMapping: Record<DisplayUserRole, string> = {
    Admin: "Admin",
    Bistånd: "AidProjects",
    Ekonomi: "Finance",
    Lovsång: "Music",
  };

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedRole(event.target.value as DisplayUserRole);
  };

  const addRole = () => {
    if (selectedRole && !roles.includes(selectedRole)) {
      setRoles([...roles, selectedRole as DisplayUserRole]);
      setSelectedRole("");
    }
  };

  const removeRole = (roleToRemove: string) => {
    setRoles(roles.filter((role) => role !== roleToRemove));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      console.log("Email and password required");
      return;
    }
    const registeredRoles = roles.map((role) => roleMapping[role]);
    const userData: User = {
      email,
      password,
      roles: registeredRoles.filter(Boolean),
    };

    try {
      const response = await api.post("Users/register", userData);
      console.log(response.data);
      onUserAdded();
      setEmail("");
      setPassword("");
      setRoles([]);
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
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", width: "80%" }}>
            <TextField
              select
              label="Roll"
              value={selectedRole}
              variant="outlined"
              onChange={handleRoleChange}
              sx={{ width: "100%" }}
            >
              {availableRoles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="success"
              onClick={addRole}
              sx={{ marginRight: 1 }}
            >
              <AddTwoToneIcon />
            </Button>
          </Box>
        </Container>
        <Box>
          {roles.map((role) => (
            <Chip
              key={role}
              label={role}
              onDelete={() => removeRole(role)}
              sx={{ marginRight: 1, marginTop: 1, fontSize: "0.9rem" }}
            />
          ))}
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2, fontSize: "1rem", fontWeight: 800 }}
        >
          LÄGG TILL
        </Button>
      </form>
    </Box>
  );
};

export default UserForm;
