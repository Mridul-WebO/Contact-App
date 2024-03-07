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

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Alert, InputAdornment } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { regex, getUniqueId } from "../../utils/helperFunctions";
import { userLoggedIn } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./../../features/user/userSlice";

export default function SignUp() {
  const dispatch = useDispatch();

  const registeredUsersData = useSelector(
    (state) => state.registeredUsers?.userData
  );

  const signUpBtnRef = React.useRef(null);
  const navigate = useNavigate();
  const context = useOutletContext();

  const [showPassword, setShowPassword] = React.useState(false);
  const [flag, setFlag] = React.useState(false);

  const [formData, setFormData] = React.useState({
    userId: getUniqueId(),
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [handleErrors, setHandleErrors] = React.useState({
    email: { show: false, message: "Email is required" },
    password: { show: false, message: "Password is required" },
    confirmPassword: { show: false, message: "Confirm password is required" },
  });

  const [alertMessage, setAlertMessage] = React.useState({
    message: "",
    type: "",
    open: false,
  });

  function handleData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (flag) {
      switch (e.target.name) {
        case "email":
          if (e.target.value === "") {
            setHandleErrors({
              ...handleErrors,
              email: { show: true, message: "Email is required" },
            });
          } else if (!e.target.value.match(regex.email)) {
            setHandleErrors({
              ...handleErrors,
              email: { show: true, message: "Invalid email" },
            });
          } else {
            setHandleErrors({
              ...handleErrors,
              email: { show: false, message: "" },
            });
          }

          break;
        case "password":
          if (e.target.value === "") {
            setHandleErrors({
              ...handleErrors,
              password: { show: true, message: " Password is required" },
            });
          } else if (!e.target.value.match(regex.password)) {
            setHandleErrors({
              ...handleErrors,
              password: {
                show: true,
                message:
                  "password must contains 'One UpperCase letter, One lowerCase letter and should be of atleast 8 characters'",
              },
            });
          } else if (e.target.value.match(regex.password)) {
            setHandleErrors({
              ...handleErrors,
              password: { show: false, message: "" },
            });
          }
          break;

        case "confirmPassword":
          if (e.target.value === "") {
            setHandleErrors({
              ...handleErrors,
              confirmPassword: {
                show: true,
                message: "Confirm password is required",
              },
            });
          } else if (e.target.value !== formData.password) {
            setHandleErrors({
              ...handleErrors,
              confirmPassword: {
                show: true,
                message: "Confirm password doesn't match",
              },
            });
          } else if (e.target.value === formData.password) {
            setHandleErrors({
              ...handleErrors,
              confirmPassword: { show: false, message: "" },
            });
          }
          break;

        default:
          break;
      }
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
    setFlag(true);

    const { email, password, confirmPassword } = formData;

    const userExists = registeredUsersData?.some(
      (user) => user.email === email
    );

    if (!email && !password && !confirmPassword) {
      setHandleErrors({
        ...handleErrors,
        email: { ...handleErrors.email, show: true },
        password: { ...handleErrors.password, show: true },
        confirmPassword: { ...handleErrors.confirmPassword, show: true },
      });
    } else if (!email && !password) {
      setHandleErrors({
        ...handleErrors,
        email: { ...handleErrors.email, show: true },
        password: { ...handleErrors.password, show: true },
        confirmPassword: {
          show: true,
          message: "Confirm password doesn't match",
        },
      });
    } else if (!email && !confirmPassword) {
      if (!password.match(regex.password)) {
        setHandleErrors({
          ...handleErrors,
          email: { ...handleErrors.email, show: true },
          password: {
            show: true,
            message:
              "password must contains 'One UpperCase letter, One lowerCase letter and should be of atleast 8 characters'",
          },
          confirmPassword: { ...handleErrors.confirmPassword, show: true },
        });
      } else {
        setHandleErrors({
          ...handleErrors,
          email: { ...handleErrors.email, show: true },
          password: { show: false, message: "" },
          confirmPassword: { ...handleErrors.confirmPassword, show: true },
        });
      }
    } else if (!password && !confirmPassword) {
      if (!email.match(regex.email)) {
        setHandleErrors({
          ...handleErrors,
          email: { show: true, message: "Invalid email" },
          password: { show: true, message: "" },
          confirmPassword: { ...handleErrors.confirmPassword, show: true },
        });
      } else {
        setHandleErrors({
          ...handleErrors,
          email: { show: false, message: "" },
          password: { show: true, message: "" },
          confirmPassword: { ...handleErrors.confirmPassword, show: true },
        });
      }
    } else if (!email) {
      if (!password.match(regex.password)) {
        if (confirmPassword !== password) {
          setHandleErrors({
            ...handleErrors,
            email: { ...handleErrors.email, show: true },
            password: {
              ...handleErrors.password,
              show: true,
              message:
                "password must contains 'One UpperCase letter, One lowerCase letter and should be of atleast 8 characters'",
            },
            confirmPassword: {
              ...handleErrors.confirmPassword,
              show: true,
              message: "Confirm password doesn't match",
            },
          });
        } else {
          setHandleErrors({
            ...handleErrors,
            email: { ...handleErrors.email, show: true },
            password: {
              ...handleErrors.password,
              show: true,
              message:
                "password must contains 'One UpperCase letter, One lowerCase letter and should be of atleast 8 characters'",
            },
            confirmPassword: {
              ...handleErrors.confirmPassword,
              show: false,
              message: "",
            },
          });
        }
      } else {
        if (confirmPassword !== password) {
          setHandleErrors({
            ...handleErrors,
            email: { ...handleErrors.email, show: true },
            password: { ...handleErrors.password, show: false },
            confirmPassword: {
              ...handleErrors.confirmPassword,
              show: true,
              message: "Confirm password doesn't match",
            },
          });
        } else {
          setHandleErrors({
            ...handleErrors,
            email: { ...handleErrors.email, show: true },
            password: { ...handleErrors.password, show: false },
            confirmPassword: {
              ...handleErrors.confirmPassword,
              show: false,
              message: "",
            },
          });
        }
      }
    } else if (!password) {
      if (!email.match(regex.email)) {
        setHandleErrors({
          ...handleErrors,
          email: {
            ...handleErrors.email,
            show: true,
            message: "Invalid email",
          },
          password: { ...handleErrors.password, show: true },
          confirmPassword: {
            ...handleErrors.confirmPassword,
            show: true,
            message: "Confirm password doesn't match",
          },
        });
      } else {
        setHandleErrors({
          ...handleErrors,
          email: { ...handleErrors.email, show: false, message: " " },
          password: { ...handleErrors.password, show: true },
          confirmPassword: {
            ...handleErrors.confirmPassword,
            show: true,
            message: "Confirm password doesn't match",
          },
        });
      }
    } else if (!confirmPassword) {
      if (!email.match(regex.email)) {
        if (!password.match(regex.password)) {
          setHandleErrors({
            ...handleErrors,
            email: {
              ...handleErrors.email,
              show: true,
              message: "Invalid email ",
            },
            password: {
              ...handleErrors.password,
              show: true,
              message:
                "password must contains 'One UpperCase letter, One lowerCase letter and should be of atleast 8 characters'",
            },
            confirmPassword: {
              ...handleErrors.confirmPassword,
              show: true,
            },
          });
        } else {
          setHandleErrors({
            ...handleErrors,
            email: {
              ...handleErrors.email,
              show: true,
              message: "Invalid email ",
            },
            password: { ...handleErrors.password, show: false, message: "" },
            confirmPassword: {
              ...handleErrors.confirmPassword,
              show: true,
            },
          });
        }
      } else {
        if (!password.match(regex.password)) {
          setHandleErrors({
            ...handleErrors,
            email: { ...handleErrors.email, show: false, message: " " },
            password: {
              ...handleErrors.password,
              show: true,
              message:
                "password must contains 'One UpperCase letter, One lowerCase letter and should be of atleast 8 characters'",
            },
            confirmPassword: {
              ...handleErrors.confirmPassword,
              show: true,
            },
          });
        } else {
          setHandleErrors({
            ...handleErrors,
            email: {
              ...handleErrors.email,
              show: false,
              message: "Invalid email ",
            },
            password: { ...handleErrors.password, show: false, message: "" },
            confirmPassword: {
              ...handleErrors.confirmPassword,
              show: true,
            },
          });
        }
      }
    } else if (!email.match(regex.email) && !password.match(regex.password)) {
      if (confirmPassword !== password) {
        setHandleErrors({
          ...handleErrors,
          email: {
            ...handleErrors.email,
            show: true,
            message: "Invalid email",
          },
          password: {
            ...handleErrors.password,
            show: true,
            message:
              "password must contains 'One UpperCase letter, One lowerCase letter and should be of atleast 8 characters'",
          },
          confirmPassword: {
            ...handleErrors.confirmPassword,
            show: true,
            message: "Confirm password doesn't match",
          },
        });
      } else {
        setHandleErrors({
          ...handleErrors,
          email: {
            ...handleErrors.email,
            show: true,
            message: "Invalid email",
          },
          password: {
            ...handleErrors.password,
            show: true,
            message:
              "password must contains 'One UpperCase letter, One lowerCase letter and should be of atleast 8 characters'",
          },
          confirmPassword: {
            ...handleErrors.confirmPassword,
            show: false,
            message: "",
          },
        });
      }
    } else if (email.match(regex.email) && !password.match(regex.password)) {
      if (confirmPassword !== password) {
        setHandleErrors({
          ...handleErrors,
          email: {
            ...handleErrors.email,
            show: false,
            message: "",
          },
          password: {
            ...handleErrors.password,
            show: true,
            message:
              "password must contains 'One UpperCase letter, One lowerCase letter and should be of atleast 8 characters'",
          },
          confirmPassword: {
            ...handleErrors.confirmPassword,
            show: true,
            message: "Confirm password doesn't match",
          },
        });
      } else {
        setHandleErrors({
          ...handleErrors,
          email: {
            ...handleErrors.email,
            show: false,
            message: "",
          },
          password: {
            ...handleErrors.password,
            show: true,
            message:
              "password must contains 'One UpperCase letter, One lowerCase letter and should be of atleast 8 characters'",
          },
          confirmPassword: {
            ...handleErrors.confirmPassword,
            show: false,
            message: "",
          },
        });
      }
    } else if (!email.match(regex.email) && password.match(regex.password)) {
      if (confirmPassword !== password) {
        setHandleErrors({
          ...handleErrors,
          email: {
            ...handleErrors.email,
            show: true,
            message: "Invalid email",
          },
          password: { ...handleErrors.password, show: false, message: "" },
          confirmPassword: {
            ...handleErrors.confirmPassword,
            show: true,
            message: "Confirm password doesn't match",
          },
        });
      } else {
        setHandleErrors({
          ...handleErrors,
          email: {
            ...handleErrors.email,
            show: true,
            message: "Invalid email",
          },
          password: {
            ...handleErrors.password,
            show: false,
            message: "",
          },
          confirmPassword: {
            ...handleErrors.confirmPassword,
            show: false,
            message: "",
          },
        });
      }
    } else if (confirmPassword !== password) {
      setHandleErrors({
        ...handleErrors,
        email: {
          ...handleErrors.email,
          show: false,
        },
        password: { ...handleErrors.password, show: false },
        confirmPassword: {
          ...handleErrors.confirmPassword,
          show: true,
          message: "Confirm password doesn't match",
        },
      });
    } else if (userExists) {
      setAlertMessage({
        message: (
          <span>
            User already exists. Please <Link to="/">Sign In</Link>
          </span>
        ),
        type: "error",
        open: true,
      });
    } else {
      setFlag(false);

      dispatch(addUser(formData));
      dispatch(userLoggedIn(formData));

      navigate("/contact-list");

      context.setAlertMessageData({
        message: "Signed Up Successfully!!",
        type: "success",
        open: true,
      });
    }
  }

  return (
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
            value={formData.email}
            onChange={handleData}
            error={handleErrors.email.show}
            helperText={handleErrors.email.show && handleErrors.email.message}
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
            value={formData.password}
            onChange={handleData}
            error={handleErrors.password.show}
            helperText={
              handleErrors.password.show && handleErrors.password.message
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
            value={formData.confirmPassword}
            onChange={handleData}
            error={handleErrors.confirmPassword.show}
            helperText={
              handleErrors.confirmPassword.show &&
              handleErrors.confirmPassword.message
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
  );
}
