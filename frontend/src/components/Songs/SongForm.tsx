import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import { SongKey } from "../../models";

interface SongFormProps {
  onClose: () => void;
}

const SongForm: React.FC<SongFormProps> = ({ onClose }) => {
  const [songTitle, setSongTitle] = useState<string>("");
  const [songText, setSongText] = useState<string>("");
  const [songKey, setSongKey] = useState<SongKey>(SongKey.C);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newSong = {
      songTitle,
      songText,
      songKey,
    };

    try {
      const response = await axios.post(
        "https://localhost:44343/api/Songs",
        newSong,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Song added:", response.data);
      setSongTitle("");
      setSongText("");
      setSongKey(SongKey.C);
      onClose();
    } catch (error) {
      console.error("There was an error adding the song!", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Sångtitel"
          variant="outlined"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Sångtext"
          variant="outlined"
          value={songText}
          onChange={(e) => setSongText(e.target.value)}
          required
          margin="normal"
        />
        <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
          <InputLabel>Song Key</InputLabel>
          <Select
            value={songKey}
            onChange={(e) => setSongKey(Number(e.target.value))}
            label="Song Key"
            required
          >
            {Object.keys(SongKey)
              .filter(
                (key) => !isNaN(Number(SongKey[key as keyof typeof SongKey]))
              )
              .map((key) => (
                <MenuItem
                  key={key}
                  value={SongKey[key as keyof typeof SongKey]}
                >
                  {key}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          LÄGG TILL
        </Button>
      </form>
    </Box>
  );
};

export default SongForm;
