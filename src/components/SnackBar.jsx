import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SnackBar({ alertMessageData, setAlertMessageData }) {
  const handleClose = () => {
    setAlertMessageData({ open: false });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alertMessageData?.open}
        onClose={handleClose}
        autoHideDuration={alertMessageData?.hideDuration || 2000}
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
