import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import Logo1 from "./assets/logos/ElimLogo1.bmp";
import Logo2 from "./assets/logos/ElimLogo3.bmp";
import Logo3 from "./assets/logos/ElimLogo4.bmp";
import { Link } from "react-router-dom";
import { useState } from "react";

const logos = [Logo1, Logo2, Logo3];

const Navbar = () => {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const handleLogoClick = () => {
    setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
  };
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#444444" }}>
        <Toolbar>
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
