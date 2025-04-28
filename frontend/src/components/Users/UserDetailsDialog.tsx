import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { UserDetailsDialogProps } from "../../types/interfaces";
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

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({
  open,
  onClose,
  user,
  slotProps,
}) => {
  return (
    <Dialog open={open} onClose={onClose} slotProps={slotProps}>
      <DialogContent>
        <Typography sx={{ fontSize: "1.2rem", margin: 1 }}>
          {user?.email}
        </Typography>
        <Divider sx={{ marginY: 2 }}></Divider>
        {user ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "1.2rem" }}>ROLLER</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={user.email}>
                {user.roles.map((role) => (
                  <TableCell sx={{ fontSize: "1rem" }}>{role}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <div>Inga tilldelade roller</div>
        )}
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

export default UserDetailsDialog;
