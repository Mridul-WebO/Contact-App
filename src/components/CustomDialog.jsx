import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  Alert,
  Avatar,
  Box,
  Container,
  CssBaseline,
  TextField,
} from "@mui/material";
import getUniqueId from "./uniqueId";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { regex } from "./regex";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog({ open, data, onSubmit, onClose }) {
  const imageUploadBtnRef = React.useRef(null);
  const handleNewContactBtnRef = React.useRef(null);

  const [alertMessage, setAlertMessage] = React.useState({
    message: "",
    type: "",
    open: false,
  });

  document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleNewContactBtnRef.current?.click();
    }
  });

  const [userContact, setUserContact] = React.useState(
    (data.userId !== "" && data) || {
      userId: getUniqueId(),
      name: "",
      email: "",
      phoneNumber: "",
      imageUrl: "",
    }
  );

  const [handleErrors, setHandleErrors] = React.useState({
    name: false,
    email: false,
    phoneNumber: false,
  });

  function handleContactData(e) {
    setUserContact({ ...userContact, [e.target.name]: e.target.value });

    if (e.target.value !== "") {
      setHandleErrors({ ...handleErrors, [e.target.name]: false });
    }
    if (alertMessage.open) {
      setAlertMessage({ ...alertMessage, open: false });
    }
  }

  function handleNewContact() {
    const { name, email, phoneNumber } = userContact;

    if (email === "" && name !== "" && phoneNumber !== "") {
      setHandleErrors({ email: true, name: false, phoneNumber: false });
    } else if (email !== "" && name === "" && phoneNumber === "") {
      setHandleErrors({ email: false, name: true, phoneNumber: true });
    } else if (email === "" && name === "" && phoneNumber !== "") {
      setHandleErrors({ email: true, name: true, phoneNumber: false });
    } else if (email === "" && name !== "" && phoneNumber === "") {
      setHandleErrors({ email: true, name: false, phoneNumber: true });
    } else if (email !== "" && name === "" && phoneNumber !== "") {
      setHandleErrors({ email: false, name: true, phoneNumber: false });
    } else if (email !== "" && name !== "" && phoneNumber === "") {
      setHandleErrors({ email: false, name: false, phoneNumber: true });
    } else if (email === "" && name === "" && phoneNumber === "") {
      setHandleErrors({ email: true, name: true, phoneNumber: true });
    } else if (!email.match(regex.email)) {
      setAlertMessage({
        message: "Invalid email",
        type: "error",
        open: true,
      });
    } else if (!phoneNumber.match(regex.phoneNumber)) {
      setAlertMessage({
        message: "Please enter a valid 10 digit phone number",
        type: "error",
        open: true,
      });
    } else {
      onSubmit(userContact);
    }
  }

  const handlePhotoUpload = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.addEventListener("load", () => {
      setUserContact({ ...userContact, imageUrl: reader.result });
    });
    e.target.value = null;
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {data.userId === "" ? "Add new contact" : "Update contact"}
        </DialogTitle>
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
              <Avatar
                style={{ cursor: "pointer" }}
                sx={{ mx: 25, width: 75, height: 75 }}
                alt=" Sharp"
                src={userContact?.imageUrl}
                onClick={() => {
                  imageUploadBtnRef.current?.click();
                }}
              >
                <CloudUploadIcon />
              </Avatar>
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                ref={imageUploadBtnRef}
                onChange={handlePhotoUpload}
                style={{ display: "none" }}
              />
              {alertMessage.open && (
                <Alert
                  sx={{ width: "100%", my: 3 }}
                  severity={alertMessage.type}
                >
                  {alertMessage.message}
                </Alert>
              )}
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
                  value={userContact?.name}
                  onChange={handleContactData}
                  error={handleErrors.name}
                  helperText={handleErrors.name && "Name is required"}
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
                  value={userContact?.email}
                  onChange={handleContactData}
                  error={handleErrors.email}
                  helperText={handleErrors.email && "Email is required"}
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
                  value={userContact?.phoneNumber}
                  onChange={handleContactData}
                  error={handleErrors.phoneNumber}
                  helperText={
                    handleErrors.phoneNumber && "Phone number is required"
                  }
                />

                <Button
                  onClick={handleNewContact}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  ref={handleNewContactBtnRef}
                >
                  {data.userId === "" ? "Add" : "Update"}
                </Button>
              </Box>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
