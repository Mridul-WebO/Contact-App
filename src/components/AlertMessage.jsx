import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function AlertMessage({ alertMessageData }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const ref = React.useRef(null);
  alertMessageData.ref = ref;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button ref={ref} onClick={handleClick}></Button>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        autoHideDuration={alertMessageData.hideDuration || 2000}
      >
        <Alert
          onClose={handleClose}
          severity={alertMessageData?.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMessageData?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
