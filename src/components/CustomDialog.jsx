import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Avatar, Box, Container, CssBaseline, TextField } from "@mui/material";
import getUniqueId from "./UniqueId";
import { addContactDetails } from "./../storage/Storage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const regex = {
  email: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{1,5})$/,
  phoneNumber: /^\d{10}$/,
};

export default function CustomDialog({ addContactBtnRef, rows, setRows }) {
  const [open, setOpen] = React.useState(false);

  const [userContact, setUserContact] = React.useState({
    userId: getUniqueId(),
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [helperTextMessage, setHelperTextMessage] = React.useState({
    name: "This field is required",
    email: "This field is required",
    phoneNumber: "This field is required",
  });

  const [handleErrors, setHandleErrors] = React.useState({
    name: false,
    email: false,
    phoneNumber: false,
  });

  function handleContactData(e) {
    setUserContact({ ...userContact, [e.target.name]: e.target.value });

    console.log(!!e.target.value.match(regex[e.target.name]));

    setHandleErrors({
      ...handleErrors,
      [e.target.name]:
        e.target.value === ""
          ? false
          : !e.target.value.match(regex[e.target.name]),
    });
  }

  function handleNewContact() {
    if (!userContact.name && !userContact.email && !userContact.phoneNumber) {
      setHandleErrors({ name: true, email: true, phoneNumber: true });
    } else if (!userContact.name) {
      setHandleErrors({ ...handleErrors, name: true });
    } else if (!userContact.email.match(regex.email)) {
      setHandleErrors({ ...handleErrors, email: true });
      setHelperTextMessage({ ...helperTextMessage, email: "Invalid email" });
    } else if (!userContact.phoneNumber.match(regex.phoneNumber)) {
      setHandleErrors({ ...handleErrors, phoneNumber: true });
      setHelperTextMessage({
        ...helperTextMessage,
        phoneNumber: "Invalid phone number",
      });
    } else {
      const userId = JSON.parse(sessionStorage.getItem("currentUser")).userId;
      setRows([userContact, ...rows]);
      addContactDetails(userContact, userId);
      setOpen(false);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
    userContact.name = "";
    userContact.email = "";
    userContact.phoneNumber = "";
  };

  const handleClose = () => {
    setOpen(false);
    setHandleErrors({ name: false, email: false, phoneNumber: false });
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
                <Avatar
                  style={{ cursor: "pointer" }}
                  alt=" Sharp"
                  src="/static/images/avatar/1.jpg"
                >
                  <CloudUploadIcon />
                </Avatar>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={userContact.name}
                  onChange={handleContactData}
                  error={handleErrors.name}
                  helperText={handleErrors.name && helperTextMessage.name}
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
                  value={userContact.email}
                  onChange={handleContactData}
                  error={handleErrors.email}
                  helperText={handleErrors.email && helperTextMessage.email}
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
                  value={userContact.phoneNumber}
                  onChange={handleContactData}
                  error={handleErrors.phoneNumber}
                  helperText={
                    handleErrors.phoneNumber && helperTextMessage.phoneNumber
                  }
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
