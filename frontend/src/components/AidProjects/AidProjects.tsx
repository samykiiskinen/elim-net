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
import api from "../../services/api.ts";
import { Project } from "../../types/interfaces";
import { useEffect, useState } from "react";
import AddProjectButton from "./AddProjectButton.tsx";
import CloseIcon from "@mui/icons-material/Close";
import ProjectDetailsDialog from "./ProjectDetailsDialog.tsx";
import RefreshIcon from "@mui/icons-material/Refresh";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";

const AidProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openProjectDetailsDialog, setOpenProjectDetailsDialog] =
    useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get<Project[]>("AidProjects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleAddProject = () => {
    fetchProjects();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredProjects = projects.filter((project) => {
    return (
      project.verification?.includes(searchQuery) ||
      project.date?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.accountNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.accountName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.country?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.receiver?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.purpose?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleDeleteProject = async () => {
    if (selectedProject) {
      try {
        await api.delete(`AidProjects/${selectedProject.verification}`);
        fetchProjects();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
      setOpenDeleteDialog(false);
    }
  };

  const handleOpenDeleteDialog = (project: Project) => {
    setSelectedProject(project);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Container>
        <h1>BISTÅND</h1>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AddProjectButton onProjectAdded={handleAddProject} />
          <Button variant="contained" onClick={fetchProjects}>
            <RefreshIcon />
          </Button>
        </Box>

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
            width: "100%",
            minWidth: "300px",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    width: "8%",
                    cursor: "pointer",
                  }}
                >
                  DATUM
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    width: "5%",
                    cursor: "pointer",
                  }}
                >
                  KTO.NR
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    width: "8%",
                    cursor: "pointer",
                  }}
                >
                  KTO
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    width: "8%",
                    cursor: "pointer",
                  }}
                >
                  LAND
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    width: "10%",
                    cursor: "pointer",
                  }}
                >
                  MOTTAGARE
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    width: "10%",
                    cursor: "pointer",
                  }}
                >
                  ÄNDAMÅL
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    width: "8%",
                    cursor: "pointer",
                  }}
                >
                  INS.
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    width: "8%",
                    cursor: "pointer",
                  }}
                >
                  UTBET.
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    width: "5%",
                    cursor: "pointer",
                  }}
                ></TableCell>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    width: "5%",
                    cursor: "pointer",
                  }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.verification}>
                  <TableCell>{project.date}</TableCell>
                  <TableCell>{project.accountNo}</TableCell>
                  <TableCell>{project.accountName}</TableCell>
                  <TableCell>{project.country}</TableCell>
                  <TableCell>{project.receiver}</TableCell>
                  <TableCell>{project.purpose}</TableCell>
                  <TableCell>{project.income}</TableCell>
                  <TableCell>{project.payment}</TableCell>
                  <TableCell>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDeleteDialog(project);
                      }}
                      variant="contained"
                      color="error"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "2rem",
                        height: "1.2rem",
                        paddingY: 1.5,
                        minWidth: "0",
                      }}
                    >
                      <CloseIcon />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <FilePresentOutlinedIcon
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ProjectDetailsDialog
          open={openProjectDetailsDialog}
          onClose={() => setOpenProjectDetailsDialog(false)}
          project={selectedProject}
        />
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogContent>
            {selectedProject && (
              <Typography>
                ÄR DU SÄKER PÅ ATT PROJEKTET SKA TAS BORT?
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              ÅNGRA
            </Button>
            <Button onClick={handleDeleteProject} color="error">
              TA BORT
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default AidProjects;
