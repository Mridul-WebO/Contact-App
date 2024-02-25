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

// Storage

import { addData, setCurrentUser } from "../../storage/Storage";

const defaultTheme = createTheme();

export default function SignUp({ setIsUserLoggedIn }) {


  const navigate = useNavigate();

  const [data, setData] = React.useState({ email: '', password: '', confirmPassword: '' });


  function getUniqueId() {
    return Math.floor(100000 + Math.random() * 900000);
  }


  function handleData(e) {

    setData({ ...data, [e.target.name]: e.target.value })

  }

  function handleSignUp(event) {
    event.preventDefault();

    if (data.email && data.password && data.confirmPassword) {

      addData({ userId: getUniqueId(), email: data.email, password: data.password });
      setIsUserLoggedIn(true)
      setCurrentUser({ userId: getUniqueId(), email: data.email, password: data.password })
      navigate('/contactlist')
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
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            sx={{ mt: 1 }}
          >
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
              value={data.name}
              onChange={handleData}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={data.password}
              onChange={handleData}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              value={data.confirmPassword}
              onChange={handleData}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="/signin" variant="body2">
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
