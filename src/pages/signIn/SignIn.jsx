/* eslint-disable react/no-unescaped-entities */
/* eslint-disable quotes */
import './SignIn.css';
import * as React from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Alert, InputAdornment } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link, useOutletContext } from 'react-router-dom';

import { userLoggedIn } from '../../features/auth/authSlice';
import { regex } from '../../utils/helperFunctions';

// redux

export default function SignIn() {
  const dispatch = useDispatch();
  const signInBtnRef = React.useRef(null);
  const context = useOutletContext();
  const navigate = useNavigate();

  const registeredUsersData = useSelector(
    (state) => state.registeredUsers.data
  );

  const [alertMessage, setAlertMessage] = React.useState({
    message: '',
    type: '',
    open: false,
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [onChangeValidation, setOnChangeValidation] = React.useState(false);

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const [handleErrors, setHandleErrors] = React.useState({
    email: { show: false, message: 'Email is required' },
    password: { show: false, message: 'Password is required' },
  });

  function handleData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (onChangeValidation) {
      switch (e.target.name) {
        case 'email':
          if (!e.target.value) {
            setHandleErrors({
              ...handleErrors,
              email: {
                show: true,
                message: 'Email is required',
              },
            });
          } else if (!e.target.value.match(regex.email)) {
            setHandleErrors({
              ...handleErrors,
              email: { show: true, message: 'Invalid email' },
            });
          } else {
            setHandleErrors({
              ...handleErrors,
              email: { show: false, message: '' },
            });
          }
          break;
        case 'password':
          if (!e.target.value) {
            setHandleErrors({
              ...handleErrors,
              password: { show: true, message: 'Password is required' },
            });
          } else {
            setHandleErrors({
              ...handleErrors,
              password: { show: false, message: '' },
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

  React.useEffect(() => {
    const signInBtn = signInBtnRef.current;
    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        signInBtn?.click();
      }
    });

    return () => {
      document.removeEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          signInBtn?.click();
        }
      });
    };
  }, []);

  function handleSignIn(event) {
    event.preventDefault();
    setOnChangeValidation(true);

    const user = registeredUsersData?.find(
      (user) => user.email === formData.email
    );

    //  Yup validation
    // try {
    //   await validateForm(formData);
    //   console.log(formData);
    // } catch (error) {
    //   console.log(error.inner);
    //   const newErrors = {};
    //   error.inner.forEach((err) => {
    //     newErrors[err.path] = err.message;
    //   });

    //   setErrors(newErrors);
    // }

    const { email, password } = formData;

    if (!email && !password) {
      setHandleErrors({
        ...handleErrors,
        email: { ...handleErrors.email, show: true },
        password: { ...handleErrors.password, show: true },
      });
    } else if (!email) {
      setHandleErrors({
        ...handleErrors,
        email: { ...handleErrors.email, show: true },
        password: { ...handleErrors.password, show: false },
      });
    } else if (!password) {
      if (!email.match(regex.email)) {
        setHandleErrors({
          ...handleErrors,
          email: { show: true, message: 'Invalid email' },
          password: { ...handleErrors.password, show: true },
        });
      } else {
        setHandleErrors({
          ...handleErrors,
          email: { show: false, message: '' },
        });
      }
    } else if (!email.match(regex.email)) {
      setHandleErrors({
        ...handleErrors,
        email: { show: true, message: 'Invalid email' },
      });
    } else if (!user) {
      setAlertMessage({
        message: (
          <span>
            User doesn't exists. Please <Link to="/sign-up">Sign Up</Link>
          </span>
        ),
        type: 'error',
        open: true,
      });
    } else if (formData.password !== user.password) {
      setAlertMessage({
        message: 'Invalid password',
        type: 'error',
        open: true,
      });
    } else {
      dispatch(userLoggedIn(user));

      setOnChangeValidation(false);

      navigate('/contact-list');

      context.setAlertMessageData({
        message: 'Signed Up Successfully!!',
        type: 'success',
        open: true,
      });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        className="signInContainer"
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {alertMessage.open && (
          <Alert sx={{ width: '100%' }} severity={alertMessage.type}>
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
            type={showPassword ? 'text' : 'password'}
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
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <VisibilityOffIcon
                      style={{ cursor: 'pointer' }}
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
  );
}
