/* eslint-disable quotes */
import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function AlertDialog({
  open,
  handleCancel,
  handleConfirm,
  message,
  cancelBtnText,
  confirmBtnText,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>{cancelBtnText || 'Cancel'}</Button>
          <Button onClick={handleConfirm} autoFocus>
            {confirmBtnText || 'Yes'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
