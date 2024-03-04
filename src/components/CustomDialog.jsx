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

  const [flag, setFlag] = React.useState(false);
  const [handleErrors, setHandleErrors] = React.useState({
    name: false,
    email: false,
    phoneNumber: false,
  });
  const [helperTextMessage, setHelperTextMessage] = React.useState({
    email: "Email is required",
    phoneNumber: "Phone number is required",
  });

  function handleContactData(e) {
    setUserContact({ ...userContact, [e.target.name]: e.target.value });
    if (flag) {
      switch (e.target.name) {
        case "name":
          if (e.target.value === "") {
            setHandleErrors({ ...handleErrors, name: true });
          } else if (e.target.value !== "") {
            setHandleErrors({ ...handleErrors, name: false });
          }
          break;
        case "email":
          if (e.target.value === "") {
            setHelperTextMessage({
              ...helperTextMessage,
              email: "Email is required",
            });
            setHandleErrors({ ...handleErrors, email: true });
          } else if (!e.target.value.match(regex.email)) {
            setHelperTextMessage({
              ...helperTextMessage,
              email: "Invalid email",
            });
            setHandleErrors({ ...handleErrors, email: true });
          } else if (e.target.value.match(regex.email)) {
            setHelperTextMessage({ ...helperTextMessage, email: "" });
            setHandleErrors({ ...handleErrors, email: false });
          }
          break;
        case "phoneNumber":
          if (e.target.value === "") {
            setHelperTextMessage({
              ...helperTextMessage,
              phoneNumber: "Phone number is required",
            });
            setHandleErrors({ ...handleErrors, phoneNumber: true });
          } else if (!e.target.value.match(regex.phoneNumber)) {
            setHelperTextMessage({
              ...helperTextMessage,
              phoneNumber: "Please enter a valid 10 digit phone number",
            });
            setHandleErrors({ ...handleErrors, phoneNumber: true });
          } else if (e.target.value.match(regex.phoneNumber)) {
            setHelperTextMessage({ ...helperTextMessage, phoneNumber: "" });
            setHandleErrors({ ...handleErrors, phoneNumber: false });
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

  function handleNewContact(event) {
    event.preventDefault();
    setFlag(true);

    const { name, email, phoneNumber } = userContact;

    if (!name && !email && !phoneNumber) {
      setHandleErrors({ name: true, email: true, phoneNumber: true });
    } else if (!name && !email) {
      if (!phoneNumber.match(regex.phoneNumber)) {
        setHelperTextMessage({
          ...helperTextMessage,
          phoneNumber: "Please enter a valid 10 digit phone number",
        });
        setHandleErrors({ name: true, email: true, phoneNumber: true });
      } else {
        setHandleErrors({ name: true, email: true, phoneNumber: false });
      }
    } else if (!name && !phoneNumber) {
      if (!email.match(regex.email)) {
        setHelperTextMessage({ ...helperTextMessage, email: "Invalid email" });
        setHandleErrors({ name: true, email: true, phoneNumber: true });
      } else {
        setHandleErrors({ name: true, email: false, phoneNumber: true });
      }
    } else if (!email && !phoneNumber) {
      setHandleErrors({ name: false, email: true, phoneNumber: true });
    } else if (
      !email.match(regex.email) &&
      !phoneNumber.match(regex.phoneNumber)
    ) {
      if (!phoneNumber) {
        setHelperTextMessage({
          ...helperTextMessage,
          email: "Invalid email",
          phoneNumber: "Phone number is required",
        });
        setHandleErrors({ ...handleErrors, email: true, phoneNumber: true });
      } else {
        setHelperTextMessage({
          ...helperTextMessage,
          email: "Invalid email",
          phoneNumber: "Please enter a valid 10 digit phone number",
        });
        setHandleErrors({ ...handleErrors, email: true, phoneNumber: true });
      }
    } else if (
      !email.match(regex.email) &&
      phoneNumber.match(regex.phoneNumber)
    ) {
      if (!email) {
        setHelperTextMessage({
          ...helperTextMessage,
          email: "Email is required",
          phoneNumber: "",
        });
        setHandleErrors({ ...handleErrors, email: true, phoneNumber: false });
      } else {
        setHelperTextMessage({
          ...helperTextMessage,
          email: "Invalid email",
          phoneNumber: "",
        });
        setHandleErrors({ ...handleErrors, email: true, phoneNumber: false });
      }
    } else if (!phoneNumber.match(regex.phoneNumber)) {
      if (!phoneNumber) {
        setHelperTextMessage({
          ...helperTextMessage,
          phoneNumber: "Phone number is required",
        });
        setHandleErrors({ ...handleErrors, phoneNumber: true });
      } else {
        setHelperTextMessage({
          ...helperTextMessage,
          phoneNumber: "Please enter a valid 10 digit phone number",
        });
        setHandleErrors({ ...handleErrors, phoneNumber: true });
      }
    } else if (!name) {
      setHandleErrors({ ...handleErrors, name: true });
    } else {
      onSubmit(userContact);
      setFlag(false);
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
                  value={userContact?.phoneNumber}
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
