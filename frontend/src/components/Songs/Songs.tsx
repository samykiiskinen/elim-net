import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddSongButton from "./AddSongButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { SongKey } from "../../models";
import { Song } from "../../types/interfaces";

const songKeyMap: { [key: number]: string } = {
  [SongKey.C]: "C",
  [SongKey.CSharp]: "C#",
  [SongKey.D]: "D",
  [SongKey.DSharp]: "D#",
  [SongKey.E]: "E",
  [SongKey.F]: "F",
  [SongKey.FSharp]: "F#",
  [SongKey.G]: "G",
  [SongKey.GSharp]: "G#",
  [SongKey.A]: "A",
  [SongKey.ASharp]: "A#",
  [SongKey.B]: "B",
};

const Songs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortField, setSortField] = useState<string>("songTitle");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedSongText, setSelectedSongText] = useState<string>("");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get<Song[]>(
          "https://localhost:44343/api/Songs"
        );
        const sortedSongs = response.data.sort((a, b) =>
          a.songTitle.toLowerCase().localeCompare(b.songTitle.toLowerCase())
        );
        setSongs(sortedSongs);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (field: keyof Song) => {
    const isAsc = sortField === field && sortOrder === "asc";
    const sortedSongs = [...songs].sort((a, b) => {
      if (field === "songKey") {
        return isAsc ? a.songKey - b.songKey : b.songKey - a.songKey;
      }

      const aField = a[field].toString().toLowerCase();
      const bField = b[field].toString().toLowerCase();

      return isAsc
        ? aField.localeCompare(bField)
        : bField.localeCompare(aField);
    });

    setSongs(sortedSongs);
    setSortField(field);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const handleSongClick = (songText: string) => {
    setSelectedSongText(songText);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedSongText("");
  };

  const filteredSongs = songs.filter((song) =>
    song.songTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Container>
        <h1>SÅNGER</h1>
        <AddSongButton />

        <Box>
          <TextField
            label="Sök..."
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: "60%", minWidth: "300px" }}
          />
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            marginTop: 2,
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "60%",
            minWidth: "300px",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  onClick={() => handleSort("songTitle")}
                  sx={{
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    width: "80%",
                    cursor: "pointer",
                  }}
                >
                  TITEL
                </TableCell>
                <TableCell
                  onClick={() => handleSort("songKey")}
                  sx={{
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    width: "20%",
                    cursor: "pointer",
                  }}
                  align="center"
                >
                  TONART
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSongs.map((song) => (
                <TableRow
                  key={song.id}
                  onClick={() => handleSongClick(song.songText)}
                >
                  <TableCell>{song.songTitle}</TableCell>
                  <TableCell align="center">
                    {songKeyMap[song.songKey] || "Unknown"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogContent>
            <Typography>{selectedSongText}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              STÄNG
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Songs;
