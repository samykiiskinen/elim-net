import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  DialogActions,
  DialogContent,
  Divider,
  Dialog,
} from "@mui/material";
import Logo1 from "./assets/logos/ElimLogo1.png";
import Logo2 from "./assets/logos/ElimLogo2.png";
import Logo3 from "./assets/logos/ElimLogo3.png";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "./components/Auth/AuthContext";
import LoginDialog from "./components/Auth/LoginDialog";
import { jwtDecode } from "jwt-decode";

const logos = [Logo1, Logo2, Logo3];

const Navbar = () => {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const { isAuthenticated, logout, userEmail, userRoles } = useAuth();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openUserInfoDialog, setOpenUserInfoDialog] = useState(false);
  const handleLogoClick = () => {
    setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
  };
  const appBarRef = useRef<HTMLButtonElement | null>(null);
  const hasRoles = (rolesToCheck: string[]) => {
    return rolesToCheck.some((role) => userRoles.includes(role));
  };

  const getEmailUsername = (email: string) => {
    return email.split("@")[0].replace(/\./g, " ");
  };

  const getTokenExpiryDate = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const expiry = decodedToken.exp;

        if (expiry) {
          return new Date(expiry * 1000).toLocaleString();
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    return "N/A";
  };

  const getDialogPosition = () => {
    if (appBarRef.current) {
      const rect = appBarRef.current.getBoundingClientRect();
      return {
        top: `${rect.bottom}px`,
        left: `${rect.right * 0.75}px`,
        transform: "translateX(-50%)",
      };
    }
    return {
      top: "20%",
      left: "50%",
      transform: "translateX(-50%)",
    };
  };

  return (
    <>
      <AppBar
        ref={appBarRef}
        position="static"
        sx={{ backgroundColor: "#444444" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Button
            disableTouchRipple
            component={Link}
            to="/"
            sx={{ backgroundColor: "#444444" }}
            onClick={handleLogoClick}
          >
            <img
              src={logos[currentLogoIndex]}
              alt="Home"
              style={{
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "#444444",
              }}
            />
          </Button>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexGrow: 1,
            }}
          >
            <Button component={Link} to="/Program" color="inherit">
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                PROGRAM
              </Typography>
            </Button>
            {isAuthenticated &&
              hasRoles(["Admin", "AidProjects", "Finance"]) && (
                <Button component={Link} to="/AidProjects" color="inherit">
                  <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                    BISTÅND
                  </Typography>
                </Button>
              )}
            {isAuthenticated && hasRoles(["Admin", "Music"]) && (
              <Button component={Link} to="Songs" color="inherit">
                <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                  SÅNGER
                </Typography>
              </Button>
            )}
            {isAuthenticated && hasRoles(["Admin"]) && (
              <Button component={Link} to="Users" color="inherit">
                <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                  ANVÄNDARE
                </Typography>
              </Button>
            )}
          </Box>

          <Box>
            {isAuthenticated ? (
              <Button
                onClick={() => setOpenUserInfoDialog(true)}
                color="inherit"
              >
                <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                  {getEmailUsername(userEmail!)}
                </Typography>
              </Button>
            ) : (
              <Button onClick={() => setOpenLoginDialog(true)} color="inherit">
                <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                  LOGGA IN
                </Typography>
              </Button>
            )}
            <LoginDialog
              open={openLoginDialog}
              onClose={() => setOpenLoginDialog(false)}
              slotProps={{
                paper: {
                  sx: {
                    position: "absolute",
                    top: getDialogPosition().top,
                    left: getDialogPosition().left,
                    transform: getDialogPosition().transform,
                    width: "40%",
                  },
                },
              }}
            />
            <Dialog
              open={openUserInfoDialog}
              onClose={() => setOpenUserInfoDialog(false)}
              slotProps={{
                paper: {
                  sx: {
                    position: "absolute",
                    top: getDialogPosition().top,
                    left: getDialogPosition().left,
                    transform: getDialogPosition().transform,
                    width: "40%",
                  },
                },
              }}
            >
              <DialogContent>
                <Typography variant="h6">E-post:</Typography>
                <Typography sx={{ marginBottom: 1 }}>{userEmail}</Typography>
                <Divider sx={{ marginY: 1 }}></Divider>
                <Typography variant="h6">Token giltig till:</Typography>
                <Typography sx={{ marginBottom: 1 }}>
                  {getTokenExpiryDate()}
                </Typography>
                <Divider sx={{ marginY: 1 }}></Divider>
                <Typography variant="h6">Roller:</Typography>
                {userRoles?.length > 0 ? (
                  userRoles.map((role, index) => (
                    <Typography key={index}>{role}</Typography>
                  ))
                ) : (
                  <Typography>Inga tilldelade roller</Typography>
                )}
              </DialogContent>
              <DialogActions>
                <Box sx={{ marginBottom: 1, marginRight: 1 }}>
                  <Button
                    onClick={() => setOpenUserInfoDialog(false)}
                    color="secondary"
                    variant="contained"
                    sx={{ marginRight: 1 }}
                  >
                    {"<<"}
                  </Button>
                  <Button
                    onClick={() => {
                      logout();
                      setOpenUserInfoDialog(false);
                    }}
                    color="primary"
                    variant="contained"
                  >
                    LOGGA UT
                  </Button>
                </Box>
              </DialogActions>
            </Dialog>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
