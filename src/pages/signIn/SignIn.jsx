import "./SignIn.css";
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
import { useOutletContext } from "react-router-dom";
import { getData, setCurrentUser } from "../../storage/Storage";
import { regex } from "../../components/regex";

const defaultTheme = createTheme();

export default function SignIn() {
  const signInBtnRef = React.useRef(null);
  const context = useOutletContext();
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = React.useState({
    message: "",
    type: "",
    open: false,
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [flag, setFlag] = React.useState(false);

  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const [handleErrors, setHandleErrors] = React.useState({
    email: false,
    password: false,
  });

  const [helperTextMessage, setHelperTextMessage] =
    React.useState("Email is required");

  function handleData(e) {
    setData({ ...data, [e.target.name]: e.target.value });

    if (flag) {
      if (e.target.password !== "") {
        setHandleErrors({ ...handleErrors, password: false });
      }

      if (e.target.name === "email") {
        if (e.target.value === "") {
          setHelperTextMessage("Email is required");
          setHandleErrors({ ...handleErrors, email: true });
        } else if (!e.target.value.match(regex.email)) {
          setHelperTextMessage("Invalid email");
          setHandleErrors({ ...handleErrors, email: true });
        } else {
          setHelperTextMessage("");
          setHandleErrors({ ...handleErrors, email: false });
        }
      }
    }

    if (alertMessage.open) {
      setAlertMessage({ ...alertMessage, open: false });
    }
  }

  React.useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        signInBtnRef.current?.click();
      }
    });

    return () => {
      document.removeEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          signInBtnRef.current?.click();
        }
      });
    }
  }, [])



  function handleSignIn(event) {
    event.preventDefault();
    setFlag(true);
    const user = getData().find((user) => user.email === data.email);

    const { email, password } = data;

    if (email === "" && password === "") {
      setHandleErrors({ email: true, password: true });
    } else if (email === "" && password !== "") {
      setHandleErrors({ email: true, password: false });
    } else if (email.match(regex.email) && password === "") {
      setHandleErrors({ email: false, password: true });
    } else if (!email.match(regex.email) && password === "") {
      setHandleErrors({ email: true, password: true });
      setHelperTextMessage("Invalid email");
    } else if (!email.match(regex.email)) {
      setHandleErrors({ email: true, password: false });
      setHelperTextMessage("Invalid email");
    } else if (!user) {
      setAlertMessage({
        message: (<span>
          User doesn't exists. Please <Link to="/sign-up">Sign Up</Link>
        </span>),
        type: "error",
        open: true,
      });
    } else if (data.password !== user.password) {
      setAlertMessage({
        message: "Invalid password",
        type: "error",
        open: true,
      });
    } else {
      setFlag(false);
      setCurrentUser(user);
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
          className="signInContainer"
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          {alertMessage.open && (
            <Alert sx={{ width: "100%" }} severity={alertMessage.type}>
              {alertMessage.message}
            </Alert>
          )}
          <Box sx={{ mt: 1 }} component="form">
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
              helperText={handleErrors.email && helperTextMessage}
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

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              ref={signInBtnRef}
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
