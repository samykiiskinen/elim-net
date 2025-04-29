import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { ProjectDetailsDialogProps } from "../../types/interfaces";
import {
  Button,
  DialogActions,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const ProjectDetailsDialog: React.FC<ProjectDetailsDialogProps> = ({
  open,
  onClose,
  project,
  slotProps,
}) => {
  return (
    <Dialog open={open} onClose={onClose} slotProps={slotProps}>
      <DialogContent>
        <Typography sx={{ fontSize: "1.2rem", margin: 1 }}>
          {project?.verification}
        </Typography>
        <Divider sx={{ marginY: 2 }}></Divider>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "1.2rem" }}>VER.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontSize: "1rem" }}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          sx={{ marginRight: 1, marginBottom: 1 }}
        >
          STÄNG
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectDetailsDialog;
