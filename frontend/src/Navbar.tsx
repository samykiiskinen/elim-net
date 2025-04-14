import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import Logo from "./assets/logos/ElimLogo1.bmp";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#444444" }}>
        <Toolbar>
          <Button component={Link} to="/" sx={{ backgroundColor: "#444444" }}>
            <img
              src={Logo}
              alt="Home"
              style={{
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "#444444",
              }}
            />
          </Button>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button component={Link} to="/Program" color="inherit">
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                PROGRAM
              </Typography>
            </Button>
            <Button component={Link} to="/AidProjects" color="inherit">
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                BISTÅND
              </Typography>
            </Button>
            <Button component={Link} to="Songs" color="inherit">
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                SÅNGER
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
