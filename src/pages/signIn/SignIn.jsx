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

// Storage

import { getData } from "../../storage/Storage";
const defaultTheme = createTheme();

const regex = {
  email: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{1,5})$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
};

const userData = getData();

export default function SignIn({
  setIsUserLoggedIn,
  setCurrentUser,
  setAlertMessageData,
  alertMessageData,
}) {
  const navigate = useNavigate();

  // const alertMessageBtnRef = React.useRef(null);

  const [showPassword, setShowPassword] = React.useState(false);
  const [userExists, setUserExists] = React.useState(true);

  // const [alertMessage, setAlertMessage] = React.useState({
  //   message: "",
  //   type: "",
  // });

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

    if (e.target.value === "") {
      setUserExists(true);
    } else {
      setUserExists(userData.some((user) => user.email === e.target.value));
    }

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
    const userData = getData().find((user) => user.email === data.email);

    if (data?.email && data.password?.match(userData?.password) && userExists) {
      setCurrentUser(userData);
      sessionStorage.setItem("currentUser", JSON.stringify(userData));

      setAlertMessageData({
        message: "Signed Up Successfully!!",
        type: "success",
        ref: null,
      });
      navigate("/contactList");
      setIsUserLoggedIn(true);
    } else if (!data.password?.match(userData?.password)) {
      setAlertMessageData({
        message: "Incorrect Password.",
        type: "error",
        ref: null,
      });
    } else {
      setAlertMessageData({
        message: "Please fill all the fields",
        type: "warning",
        ref: null,
      });
    }
    alertMessageData.ref?.current.click();
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
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              // helperText={"Please enter your email"}
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
              error={handleErrors.email || !userExists}
              helperText={
                !userExists
                  ? "User doesn't exists. Please Sign Up."
                  : handleErrors.email && "Please enter a valid email"
              }
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
                <Link to="/signUp" variant="body2">
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
