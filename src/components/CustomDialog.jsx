import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Container, CssBaseline, TextField } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog({ addContactBtnRef }) {
  const [open, setOpen] = React.useState(false);

  const [userContactList, setUserContactList] = React.useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  function handleContactData(e) {
    setUserContactList({ ...userContactList, [e.target.name]: e.target.value });
  }

  function handleNewContact() {
    console.log(userContactList);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button ref={addContactBtnRef} onClick={handleClickOpen}></Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add new contact"}</DialogTitle>
        <DialogContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={userContactList.name}
                  onChange={handleContactData}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={userContactList.email}
                  onChange={handleContactData}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phoneNUmber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  autoFocus
                  value={userContactList.phoneNumber}
                  onChange={handleContactData}
                />

                <Button
                  onClick={handleNewContact}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
