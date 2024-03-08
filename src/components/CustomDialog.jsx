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

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { regex, getUniqueId } from "../utils/helperFunctions";

// redux
import { useSelector } from "react-redux";

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

  const userId = useSelector((state) => state.auth.currentUser.userId);
  const [userContact, setUserContact] = React.useState(
    (data.userId !== "" && data) || {
      _id: getUniqueId(),
      userId: userId,
      name: "",
      email: "",
      phoneNumber: "",
      imageUrl: "",
    }
  );

  const [onChangeValidation, setOnChangeValidation] = React.useState(false);

  const [handleErrors, setHandleErrors] = React.useState({
    name: { show: false, message: "Name is required" },
    email: { show: false, message: "Email is required" },
    phoneNumber: { show: false, message: "Phone number is required" },
  });

  function handleContactData(e) {
    setUserContact({ ...userContact, [e.target.name]: e.target.value });

    if (onChangeValidation) {
      switch (e.target.name) {
        case "name":
          if (e.target.value === "") {
            setHandleErrors({
              ...handleErrors,
              name: { ...handleErrors, show: true },
            });
          } else if (e.target.value !== "") {
            setHandleErrors({
              ...handleErrors,
              name: { ...handleErrors, show: false },
            });
          }
          break;
        case "email":
          if (e.target.value === "") {
            setHandleErrors({
              ...handleErrors,
              email: { show: true, message: "Email is required" },
            });
          } else if (!e.target.value.match(regex.email)) {
            setHandleErrors({
              ...handleErrors,
              email: { show: true, message: "Invalid Email" },
            });
          } else if (e.target.value.match(regex.email)) {
            setHandleErrors({
              ...handleErrors,
              email: { show: false, message: "" },
            });
          }

          break;
        case "phoneNumber":
          if (e.target.value === "") {
            setHandleErrors({
              ...handleErrors,
              phoneNumber: { show: true, message: "Phone number is required" },
            });
          } else if (!e.target.value.match(regex.phoneNumber)) {
            setHandleErrors({
              ...handleErrors,
              phoneNumber: {
                show: true,
                message: "Please enter a valid 10 digit phone number",
              },
            });
          } else if (e.target.value.match(regex.phoneNumber)) {
            setHandleErrors({
              ...handleErrors,
              phoneNumber: { show: false, message: "" },
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

  function handleNewContact(event) {
    event.preventDefault();
    setOnChangeValidation(true);

    const { name, email, phoneNumber } = userContact;

    if (!name && !email && !phoneNumber) {
      setHandleErrors({
        name: { ...handleErrors.name, show: true },
        email: { ...handleErrors.email, show: true },
        phoneNumber: { ...handleErrors.phoneNumber, show: true },
      });
    } else if (!name && !email) {
      if (!phoneNumber.match(regex.phoneNumber)) {
        setHandleErrors({
          phoneNumber: {
            show: true,
            message: "Please enter a valid 10 digit phone number",
          },
          email: { ...handleErrors.email, show: true },
          name: { ...handleErrors.name, show: true },
        });
      } else {
        setHandleErrors({
          phoneNumber: { ...handleErrors.phoneNumber, show: true },
          email: { ...handleErrors.email, show: true },
          name: { ...handleErrors.name, show: true },
        });
      }
    } else if (!name && !phoneNumber) {
      if (!email.match(regex.email)) {
        setHandleErrors({
          name: { ...handleErrors.name, show: true },
          email: {
            ...handleErrors.email,
            show: true,
            message: "Invalid email",
          },
          phoneNumber: { ...handleErrors.phoneNumber, show: true },
        });
      } else {
        setHandleErrors({
          name: { ...handleErrors.name, show: true },
          email: { ...handleErrors.email, show: false },
          phoneNumber: { ...handleErrors.phoneNumber, show: true },
        });
      }
    } else if (!email && !phoneNumber) {
      setHandleErrors({
        name: { ...handleErrors.name, show: false },
        email: { ...handleErrors.email, show: true },
        phoneNumber: { ...handleErrors.phoneNumber, show: true },
      });
    } else if (
      !email.match(regex.email) &&
      !phoneNumber.match(regex.phoneNumber)
    ) {
      if (!phoneNumber) {
        setHandleErrors({
          ...handleErrors,
          email: {
            ...handleErrors.email,
            show: true,
            message: "Invalid email",
          },
          phoneNumber: {
            ...handleErrors.phoneNumber,
            show: true,
            message: "Phone number is required",
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
          phoneNumber: {
            ...handleErrors.phoneNumber,
            show: true,
            message: "Please enter a valid 10 digit phone number",
          },
        });
      }
    } else if (
      !email.match(regex.email) &&
      phoneNumber.match(regex.phoneNumber)
    ) {
      if (!email) {
        setHandleErrors({
          ...handleErrors,
          email: {
            show: true,
            message: "Email is required",
          },
          phoneNumber: {
            show: false,
            message: "",
          },
        });
      } else {
        setHandleErrors({
          ...handleErrors,
          email: {
            show: true,
            message: "Invalid email",
          },
          phoneNumber: {
            show: false,
            message: "",
          },
        });
      }
    } else if (!phoneNumber.match(regex.phoneNumber)) {
      if (!phoneNumber) {
        setHandleErrors({
          ...handleErrors,
          phoneNumber: {
            show: true,
            message: "Please enter a valid 10 digit phone number",
          },
        });
      } else {
        setHandleErrors({
          ...handleErrors,
          phoneNumber: {
            show: true,
            message: "Please enter a valid 10 digit phone number",
          },
        });
      }
    } else if (!name) {
      setHandleErrors({
        ...handleErrors,
        name: { ...handleErrors.name, show: true },
      });
    } else {
      onSubmit(userContact);
      setOnChangeValidation(false);
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
                  error={handleErrors.name.show}
                  helperText={
                    handleErrors.name.show && handleErrors.name.message
                  }
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
                  error={handleErrors.email.show}
                  helperText={
                    handleErrors.email.show && handleErrors.email.message
                  }
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
                  error={handleErrors.phoneNumber.show}
                  helperText={
                    handleErrors.phoneNumber.show &&
                    handleErrors.phoneNumber.message
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
