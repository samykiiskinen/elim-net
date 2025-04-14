import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Box,
  Typography,
} from "@mui/material";
import Logo from "./assets/images/ElimLogo.bmp";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      {" "}
      <AppBar position="static" sx={{ backgroundColor: "#444444" }}>
        <Container>
          <Toolbar>
            <Button component={Link} to="/" sx={{ backgroundColor: "#444444" }}>
              <img
                src={Logo}
                alt="Home"
                style={{
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#444444",
                }}
              />
            </Button>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button component={Link} to="/Program" color="inherit">
                <Typography sx={{ fontSize: "1.6rem", fontWeight: "bold" }}>
                  PROGRAM
                </Typography>
              </Button>
              <Button component={Link} to="/AidProjects" color="inherit">
                <Typography sx={{ fontSize: "1.6rem", fontWeight: "bold" }}>
                  BISTÅND
                </Typography>
              </Button>
              <Button component={Link} to="Songs" color="inherit">
                <Typography sx={{ fontSize: "1.6rem", fontWeight: "bold" }}>
                  SÅNGER
                </Typography>
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
