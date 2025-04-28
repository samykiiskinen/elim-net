import {
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
  Typography,
} from "@mui/material";
import AddUserButton from "./AddUserButton.tsx";
import { User } from "../../types/interfaces";
import { useEffect, useState } from "react";
import UserDetailsDialog from "./UserDetailsDialog";
import CloseIcon from "@mui/icons-material/Close";
import api from "../../services/api.ts";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [openUserDetailsDialog, setOpenUserDetailsDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await api.get<User[]>("Users");
      const sortedUsers = response.data.sort((a, b) =>
        a.email.toLowerCase().localeCompare(b.email.toLowerCase())
      );
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSort = () => {
    const isAsc = sortOrder === "asc";
    const sortedSongs = [...users].sort((a, b) => {
      const aEmail = a.email.toLowerCase() || "";
      const bEmail = b.email.toLowerCase() || "";
      return isAsc
        ? aEmail.localeCompare(bEmail)
        : bEmail.localeCompare(aEmail);
    });

    setUsers(sortedSongs);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const handleOpenUserDetailsDialog = (user: User) => {
    setSelectedUser(user);
    setOpenUserDetailsDialog(true);
  };

  const handleAddUser = () => {
    fetchUsers();
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        await api.delete(`Users/${selectedUser.email}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
      setOpenDeleteDialog(false);
    }
  };

  const handleOpenDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Container>
        <h1>ANVÄNDARE</h1>
        <AddUserButton onUserAdded={handleAddUser} />

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
                    width: "70%",
                    cursor: "pointer",
                  }}
                >
                  E-POST
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    width: "30%",
                  }}
                >
                  TA BORT
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.email}
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleOpenUserDetailsDialog(user)}
                >
                  <TableCell sx={{ fontSize: "medium" }}>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDeleteDialog(user);
                      }}
                      variant="contained"
                      color="error"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CloseIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <UserDetailsDialog
          open={openUserDetailsDialog}
          onClose={() => setOpenUserDetailsDialog(false)}
          user={selectedUser}
        />
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogContent>
            {selectedUser && (
              <Typography>
                ÄR DU SÄKER PÅ ATT {selectedUser.email} SKA TAS BORT?
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              ÅNGRA
            </Button>
            <Button onClick={handleDeleteUser} color="error">
              TA BORT
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Users;
