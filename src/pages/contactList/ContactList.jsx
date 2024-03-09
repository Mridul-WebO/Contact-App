/* eslint-disable quotes */
import * as React from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Button, Container, Fab, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

import BasicTable from '../../components/BasicTable';
import AlertDialog from '../../components/ConfirmAlert';
import CustomDialog from '../../components/CustomDialog';
import {
  addContact,
  deleteAllContacts,
  updateContact,
  importContacts,
} from '../../features/user_contact_list/userContactListSlice';
import {
  handleContactsExport,
  handleContactsImport,
} from '../../utils/helperFunctions';

export default function ContactList() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.currentUser.userId);
  const contactsListData = useSelector((state) => state.contactsList.data);

  const contactList = React.useMemo(() => {
    return contactsListData?.filter((contact) => {
      return parseInt(contact.userId) === parseInt(userId);
    });
  }, [contactsListData, userId]);

  const userName = useSelector((state) => state.auth.currentUser).email.split(
    '@'
  )[0];

  const importRef = React.useRef(null);
  const context = useOutletContext();

  const [currentRow, setCurrentRow] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [openAlertBox, setOpenAlertBox] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setCurrentRow({
        userId: '',
        name: '',
        email: '',
        phoneNumber: '',
        imageUrl: '',
      });
    }
  }, [open]);

  const onSubmit = (submittedData) => {
    const contactExits = contactList.some(
      (contact) => contact._id === submittedData._id
    );

    if (!contactExits) {
      dispatch(addContact(submittedData));
    } else {
      dispatch(updateContact(submittedData));
    }

    setOpen(false);

    context.setAlertMessageData({
      message: !contactExits
        ? 'Contact added successfully!'
        : 'Contact updated successfully!',
      type: 'success',
      hideDuration: 2000,
      open: true,
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleDeleteAllContacts = () => {
    setOpenAlertBox(true);
  };

  const handleImportContacts = (event) => {
    const file = event.target.files[0];

    function handleImportRes(res) {
      if (res.data) {
        const newContacts = res.data.filter((newContact) => {
          return !contactList.some((oldContact) => {
            return parseInt(newContact._id) === parseInt(oldContact._id);
          });
        });
        if (!newContacts[0]?.userId && newContacts?.length !== 0) {
          context.setAlertMessageData({
            message: 'Error importing data. Please try again later.',
            type: 'error',
            hideDuration: 2000,
            open: true,
          });
        } else {
          if (newContacts[0]?._id) {
            const importedContacts = newContacts.map((contact) => {
              contact.userId = userId;
              contact._id = parseInt(contact._id);
              return contact;
            });

            dispatch(importContacts(importedContacts));

            context.setAlertMessageData({
              message: 'Contacts imported successfully!',
              type: 'success',
              hideDuration: 2000,
              open: true,
            });
          } else if (newContacts.length === 0) {
            context.setAlertMessageData({
              message: 'Duplicate contacts Merged successfully',
              type: 'success',
              hideDuration: 2000,
              open: true,
            });
          } else {
            context.setAlertMessageData({
              message: 'Error importing data. Please try again later.',
              type: 'error',
              hideDuration: 2000,
              open: true,
            });
          }
        }
      } else {
        context.setAlertMessageData({
          message: "Couldn't import data. Please try again later.",
          type: 'error',
          hideDuration: 2000,
          open: true,
        });
      }
    }

    handleContactsImport(file, handleImportRes);

    event.target.value = null;
  };

  const handleExportContacts = () => {
    const fileName = 'Contact-List';
    const res = handleContactsExport(contactList, fileName);
    if (res) {
      context.setAlertMessageData({
        message: 'Contacts exported successfully!!',
        type: 'success',
        hideDuration: 1500,
        open: true,
      });
    } else {
      context.setAlertMessageData({
        message: "Couldn't export contacts. Pleas try again later.",
        type: 'error',
        hideDuration: 1500,
        open: true,
      });
    }
  };

  return (
    <>
      <Container>
        <Typography sx={{ my: 3, fontSize: 30 }}>
          Welcome!! {userName}
        </Typography>
      </Container>
      <Container sx={{ textAlign: 'end' }}>
        {contactList.length !== 0 && (
          <>
            <Button
              sx={{ mx: 4 }}
              variant="outlined"
              onClick={handleDeleteAllContacts}
            >
              Delete All
            </Button>
            <Fab
              color="primary"
              aria-label="add"
              sx={{ my: 1 }}
              onClick={handleExportContacts}
            >
              <Typography sx={{ fontSize: 10 }}>Export data</Typography>
            </Fab>
          </>
        )}
        <Fab
          color="primary"
          aria-label="add"
          sx={{ my: 1, mx: 1 }}
          onClick={() => importRef.current?.click()}
        >
          <Typography sx={{ fontSize: 10 }}>Import data</Typography>
          <input
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            ref={importRef}
            onChange={handleImportContacts}
          />
        </Fab>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ my: 1 }}
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
        <BasicTable setCurrentRow={setCurrentRow} setOpen={setOpen} />
      </Container>

      {open && (
        <CustomDialog
          open={open}
          data={currentRow}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      )}

      {openAlertBox && (
        <AlertDialog
          open={openAlertBox}
          message={'Are you sure?'}
          handleCancel={() => {
            setOpenAlertBox(false);
          }}
          handleConfirm={() => {
            dispatch(deleteAllContacts(userId));

            context.setAlertMessageData({
              message: 'Contacts deleted successfully!',
              type: 'success',
              hideDuration: 2000,
              open: true,
            });
            setOpenAlertBox(false);
          }}
          confirmBtnText={'Delete All'}
        />
      )}
    </>
  );
}
