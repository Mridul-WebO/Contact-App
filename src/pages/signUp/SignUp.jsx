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
import { Alert, InputAdornment } from "@mui/material";
import { addData, getData, setCurrentUser } from "../../storage/Storage";
import getUniqueId from "./../../components/UniqueId";
import { useOutletContext } from "react-router-dom";
import { regex } from "../../components/regex";
const defaultTheme = createTheme();

export default function SignUp() {
  const signUpBtnRef = React.useRef(null);
  const navigate = useNavigate();
  const context = useOutletContext();

  const [showPassword, setShowPassword] = React.useState(false);

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

  const [alertMessage, setAlertMessage] = React.useState({
    message: "",
    type: "",
    open: false,
  });
  function handleData(e) {
    setData({ ...data, [e.target.name]: e.target.value });

    if (e.target.value !== "") {
      setHandleErrors({ ...handleErrors, [e.target.name]: false });
    }
    if (alertMessage.open) {
      setAlertMessage({ ...alertMessage, open: false });
    }
  }

  document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      signUpBtnRef.current?.click();
    }
  });

  function handleSignUp(event) {
    event.preventDefault();
    const { email, password, confirmPassword } = data;
    const userExits = getData().some((user) => user.email === email);

    if (email === "" && password !== "" && confirmPassword !== "") {
      setHandleErrors({ email: true, password: false, confirmPassword: false });
    } else if (email !== "" && password === "" && confirmPassword === "") {
      setHandleErrors({ email: false, password: true, confirmPassword: true });
    } else if (email === "" && password === "" && confirmPassword !== "") {
      setHandleErrors({ email: true, password: true, confirmPassword: false });
    } else if (email === "" && password !== "" && confirmPassword === "") {
      setHandleErrors({ email: true, password: false, confirmPassword: true });
    } else if (email !== "" && password === "" && confirmPassword !== "") {
      setHandleErrors({ email: false, password: true, confirmPassword: false });
    } else if (email !== "" && password !== "" && confirmPassword === "") {
      setHandleErrors({ email: false, password: false, confirmPassword: true });
    } else if (email === "" && password === "" && confirmPassword === "") {
      setHandleErrors({ email: true, password: true, confirmPassword: true });
    } else if (password !== confirmPassword) {
      setAlertMessage({
        message: "Password doesn't match",
        type: "error",
        open: true,
      });
    } else if (!email.match(regex.email)) {
      setAlertMessage({
        message: "Invalid email",
        type: "error",
        open: true,
      });
    } else if (userExits) {
      setAlertMessage({
        message: "User already exists. Please Sign In",
        type: "error",
        open: true,
      });
    } else if (!password.match(regex.password)) {
      setAlertMessage({
        message:
          "password must contains 'One UpperCase letter, One lowerCase letter and should be of atleast 8 characters'",
        type: "error",
        open: true,
      });
    } else {
      setCurrentUser(data);
      addData({
        userId: data.userId,
        email: data.email,
        password: data.password,
        contacts: [],
      });

      context.setIsUserLoggedIn(true);
      navigate("/contact-list");

      context.setAlertMessageData({
        message: "Signed Up Successfully!!",
        type: "success",
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
          {alertMessage.open && (
            <Alert sx={{ width: "100%" }} severity={alertMessage.type}>
              {alertMessage.message}
            </Alert>
          )}
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
              error={handleErrors.email}
              helperText={handleErrors.email && "Email is required"}
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
              helperText={handleErrors.password && "Password is required"}
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
              helperText={
                handleErrors.confirmPassword && "Confirm Password is required"
              }
            />

            <Button
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
