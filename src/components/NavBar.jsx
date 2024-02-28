// const NavBar = ({
//   setIsUserLoggedIn,
//   setAlertMessageData,
//   alertMessageData,
// }) => {
//   const navigate = useNavigate();
//   function handleLogOut(event) {
//     event.preventDefault();

//     // setAlertMessageData({
//     //   message: "Logged Out SuccessFully",
//     //   type: "Success",
//     //   ref: null,
//     // });
//     // console.log(alertMessageData.ref.current);

//     // alertMessageData.ref.current?.click();

//     removeCurrentUser();
//     setIsUserLoggedIn(false);
//     navigate("/");
//   }

//   const userName = fetchCurrentUser()?.email.split("@")[0];

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="/">
//             Contact App
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <a className="nav-link active" aria-current="page" href="/">
//                   Welcome!!{" "}
//                   <span style={{ fontWeight: "bold" }}>
//                     {userName || "User"}
//                   </span>
//                 </a>
//               </li>
//             </ul>
//             <form className="d-flex" role="search">
//               <button
//                 className="btn btn-outline-success"
//                 onClick={handleLogOut}
//               >
//                 Logout
//               </button>
//             </form>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default NavBar;

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { useNavigate } from "react-router";
import { fetchCurrentUser, removeCurrentUser } from "../storage/Storage";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function NavBar({ setIsUserLoggedIn, setAlertMessageData, alertMessageData }) {
  const navigate = useNavigate();
  function handleLogOut(event) {
    event.preventDefault();

    // setAlertMessageData({
    //   message: "Logged Out SuccessFully",
    //   type: "Success",
    //   ref: null,
    // });
    // console.log(alertMessageData.ref.current);

    // alertMessageData.ref.current?.click();

    removeCurrentUser();
    setIsUserLoggedIn(false);
    navigate("/");
  }

  const userName = fetchCurrentUser()?.email.split("@")[0];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
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
