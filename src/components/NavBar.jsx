import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useNavigate } from "react-router";
import { removeCurrentUser } from "../storage/Storage";

function NavBar({ setIsUserLoggedIn, setAlertMessageData }) {
  const navigate = useNavigate();

  function handleLogOut(event) {
    event.preventDefault();

    removeCurrentUser();
    setIsUserLoggedIn(false);
    navigate("/");

    setAlertMessageData({
      message: "Logged Out SuccessFully",
      type: "success",
      open: true,
    });
  }

  return (
    <AppBar position="static" sx={{ bgcolor: "#404040" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CONTACT APP
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CONTACT APP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Typography sx={{ cursor: "pointer" }} onClick={handleLogOut}>
              LOGOUT
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
