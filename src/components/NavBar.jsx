import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import AlertDialog from './ConfirmAlert';
import { userLoggedOut } from '../features/auth/authSlice';
import useHideElements from '../useHideElements';

function NavBar({ setAlertMessageData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState();

  function handleLogOut(event) {
    event.preventDefault();
    setOpen(true);
  }

  const [hide] = useHideElements();
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#404040' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
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
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CONTACT APP
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            ></Box>

            <Box sx={{ flexGrow: 0 }}>
              {hide && (
                <Typography sx={{ cursor: 'pointer' }} onClick={handleLogOut}>
                  LOGOUT
                </Typography>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {open && (
        <AlertDialog
          open={open}
          message={'Are you sure?'}
          handleCancel={() => {
            setOpen(false);
          }}
          handleConfirm={() => {
            dispatch(userLoggedOut());
            navigate('/');

            setAlertMessageData({
              message: 'Logged Out SuccessFully',
              type: 'success',
              open: true,
            });
          }}
          confirmBtnText={'Logout'}
        />
      )}
    </>
  );
}
export default NavBar;
