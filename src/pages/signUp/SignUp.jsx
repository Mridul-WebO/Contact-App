import "./SignUp.css";
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
import { addData, getData, setCurrentUser } from "../../storage/Storage";
import getUniqueId from "./../../components/UniqueId";
import { useOutletContext } from "react-router-dom";

const defaultTheme = createTheme();

const regex = {
  email: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{1,5})$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
};

export default function SignUp() {
  const signUpBtnRef = React.useRef(null);
  const navigate = useNavigate();
  const context = useOutletContext();

  const [showPassword, setShowPassword] = React.useState(false);
  const [userExists, setUserExists] = React.useState(false);
  const [data, setData] = React.useState({
    userId: getUniqueId(),
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [handleErrors, setHandleErrors] = React.useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  function handleData(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    setUserExists(getData().some((user) => user.email === e.target.value));
    setHandleErrors({
      ...handleErrors,
      [e.target.name]:
        e.target.value === ""
          ? false
          : !e.target.value.match(regex[e.target.name]),
    });
  }

  document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      signUpBtnRef.current?.click();
    }
  });

  function handleSignUp(event) {
    event.preventDefault();

    if (data.email && data.password && data.confirmPassword && !userExists) {
      if (data.confirmPassword !== data.password) {
        context.setAlertMessageData({
          message: "Passwords doesn't match",
          type: "warning",
          open: true,
        });
      } else {
        addData({
          userId: data.userId,
          email: data.email,
          password: data.password,
          contacts: [],
        });

        setCurrentUser({
          userId: data.userId,
          email: data.email,
          password: data.password,
        });

        context.setAlertMessageData({
          message: "Signed Up Successfully!!",
          type: "success",
          open: true,
        });

        context.setIsUserLoggedIn(true);
        navigate("/contact-list");
      }
    } else {
      context.setAlertMessageData({
        message: "Please fill all the fields.",
        type: "warning",
        open: true,
      });
    }
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
          className="signUpContainer"
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
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
              error={handleErrors.email || userExists}
              helperText={
                userExists
                  ? "User already exists"
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
              onChange={handleData}
              error={handleErrors.password}
              helperText={
                handleErrors.password &&
                "password must contains  One UpperCase letter, One lowerCase letter and should be of atleast 8 characters "
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="current-password"
              value={data.confirmPassword}
              onChange={handleData}
              error={handleErrors.confirmPassword}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              ref={signUpBtnRef}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="/" variant="body2">
                  {"Already a user? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
