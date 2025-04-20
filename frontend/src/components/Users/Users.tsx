import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddUserButton from "./AddUserButton.tsx";
import { User } from "../../types/interfaces";
import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get<User[]>(
          "https://localhost:44343/api/Auth/users"
        );
        const sortedUsers = response.data.sort((a, b) =>
          a.email.toLowerCase().localeCompare(b.email.toLowerCase())
        );
        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, []);

  const handleSort = () => {
    const isAsc = sortOrder === "asc";
    const sortedSongs = [...users].sort((a, b) => {
      const aEmail = a.email.toLowerCase();
      const bEmail = b.email.toLowerCase();
      return isAsc
        ? aEmail.localeCompare(bEmail)
        : bEmail.localeCompare(aEmail);
    });

    setUsers(sortedSongs);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  return (
    <>
      <Container>
        <h1>ANVÄNDARE</h1>
        <AddUserButton />

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
                  onClick={() => handleSort()}
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    width: "80%",
                    cursor: "pointer",
                  }}
                >
                  E-POST
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Users;
