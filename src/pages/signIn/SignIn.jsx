import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { InputAdornment } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import "./SignIn.css";
// Storage

import { getData } from "../../storage/Storage";
const defaultTheme = createTheme();

const regex = {
  email: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{1,5})$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
};

export default function SignIn() {
  const context = useOutletContext();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const [handleErrors, setHandleErrors] = React.useState({
    email: false,
    password: false,
  });

  function handleData(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    setHandleErrors({
      ...handleErrors,
      [e.target.name]:
        e.target.value === ""
          ? false
          : !e.target.value.match(regex[e.target.name]),
    });
  }

  function handleSignIn(event) {
    event.preventDefault();

    const user = getData().find((user) => user.email === data.email);

    console.log({ user });

    if (!!data.email && !!data.password) {
      if (!user) {
        context.setAlertMessageData({
          message: "User doesn't exists",
          type: "error",
          ref: null,
        });
      } else if (data.password !== user.password) {
        context.setAlertMessageData({
          message: "Incorrect Password.",
          type: "error",
          ref: null,
        });
      } else {
        context.setCurrentUser(user);
        sessionStorage.setItem("currentUser", JSON.stringify(user));

        context.setAlertMessageData({
          message: "Signed Up Successfully!!",
          type: "success",
          ref: null,
        });
        navigate("/contact-list");
        context.setIsUserLoggedIn(true);
      }
    } else {
      context.setAlertMessageData({
        message: "Please fill all the fields",
        type: "warning",
        ref: null,
      });
    }
    context.alertMessageData.ref?.current.click();
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="signInContainer"
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={data.email}
              onChange={handleData}
              error={handleErrors.email}
              helperText={handleErrors.email && "Please enter a valid email"}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={data.password}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {showPassword ? (
                      <VisibilityIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <VisibilityOffIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="/sign-up" variant="body2">
                  {"Don't have an account?? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
