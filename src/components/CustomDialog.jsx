import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Avatar, Box, Container, CssBaseline, TextField } from "@mui/material";
import getUniqueId from "./UniqueId";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const regex = {
  email: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{1,5})$/,
  phoneNumber: /^\d{10}$/,
};

export default function CustomDialog({ open, data, onSubmit, onClose }) {
  const imageUploadBtnRef = React.useRef(null);

  const [userContact, setUserContact] = React.useState(
    (data.userId !== "" && data) || {
      userId: getUniqueId(),
      name: "",
      email: "",
      phoneNumber: "",
      imageUrl: "",
    }
  );

  const [helperTextMessage, setHelperTextMessage] = React.useState({
    name: "Name is required",
    email: "Email is required",
    phoneNumber: "Phone Number is required",
  });

  const [handleErrors, setHandleErrors] = React.useState({
    name: false,
    email: false,
    phoneNumber: false,
  });

  function handleContactData(e) {
    setUserContact({ ...userContact, [e.target.name]: e.target.value });
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
        phoneNumber: "Please enter a valid 10 digit phone number",
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
                {data.userId === "" ? (
                  <Button
                    onClick={handleNewContact}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add
                  </Button>
                ) : (
                  <Button
                    onClick={handleNewContact}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Update
                  </Button>
                )}
              </Box>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
