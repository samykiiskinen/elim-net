import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import Logo1 from "./assets/logos/ElimLogo1.png";
import Logo2 from "./assets/logos/ElimLogo3.png";
import Logo3 from "./assets/logos/ElimLogo4.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./components/Auth/AuthContext";
import LoginDialog from "./components/Auth/LoginDialog";

const logos = [Logo1, Logo2, Logo3];

const Navbar = () => {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const { isAuthenticated, logout } = useAuth();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const handleLogoClick = () => {
    setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
  };
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#444444" }}>
        <Toolbar
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Button
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
            {isAuthenticated && (
              <Button component={Link} to="/AidProjects" color="inherit">
                <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                  BISTÅND
                </Typography>
              </Button>
            )}
            {isAuthenticated && (
              <Button component={Link} to="Songs" color="inherit">
                <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                  SÅNGER
                </Typography>
              </Button>
            )}

            <Button component={Link} to="Users" color="inherit">
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                ANVÄNDARE
              </Typography>
            </Button>
          </Box>
          <Box>
            {isAuthenticated ? (
              <Button onClick={logout} color="inherit">
                <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                  LOGGA UT
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
            />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
