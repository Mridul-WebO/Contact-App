import * as React from "react";
import BasicTable from "../../components/BasicTable";
import { Button, Container, Fab, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import {
  addContactDetails,
  addImportedContactDetails,
  deleteAllContacts,
  editContact,
  fetchContactsDetails,
} from "../../storage/Storage";
import AddIcon from "@mui/icons-material/Add";
import { exportContacts, importContacts } from "../../utils/helperFunctions";
import CustomDialog from "../../components/CustomDialog";

// const cols = [
// {
//   key: 'userId',
//   title: 'UserID',
//   render: (row)=>{
//     retunr <Box><
//   }
// },
// ];

export default function ContactList() {
  const importRef = React.useRef(null);
  const contacts = fetchContactsDetails();
  const context = useOutletContext();

  const [rows, setRows] = React.useState(contacts);
  const [currentRow, setCurrentRow] = React.useState({});
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setCurrentRow({
        userId: "",
        name: "",
        email: "",
        phoneNumber: "",
        imageUrl: "",
      });
    }
  }, [open]);

  const onSubmit = (submittedData) => {
    const contacts = fetchContactsDetails();
    const contactExits = contacts.some(
      (contact) => contact.userId === submittedData.userId
    );

    if (!contactExits) {
      setRows([submittedData, ...rows]);
      addContactDetails(submittedData);
    } else {
      const data = rows.map((row) => {
        if (row.userId === submittedData.userId) {
          return submittedData;
        }
        return row;
      });
      setRows([...data]);
      editContact(submittedData);
    }

    setOpen(false);

    context.setAlertMessageData({
      message: !contactExits
        ? "Contact added successfully!"
        : "Contact updated successfully!",
      type: "success",
      hideDuration: 2000,
      open: true,
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleDeleteAllContacts = () => {
    setRows([]);
    deleteAllContacts();

    context.setAlertMessageData({
      message: "Contacts deleted successfully!",
      type: "success",
      hideDuration: 2000,
      open: true,
    });
  };

  const handleImportContacts = (event) => {
    const file = event.target.files[0];
    const existingContacts = fetchContactsDetails();

    function handleImportRes(res) {
      if (res.data) {
        const newContacts = res.data.filter((newContact) => {
          return !existingContacts.some((oldContact) => {
            return parseInt(newContact.userId) === parseInt(oldContact.userId);
          });
        });
        if (!newContacts[0]?.userId && newContacts?.length !== 0) {
          context.setAlertMessageData({
            message: "Error importing data. Please try again later.",
            type: "error",
            hideDuration: 2000,
            open: true,
          });
        } else {
          setRows([...newContacts, ...rows]);
          addImportedContactDetails(newContacts);

          context.setAlertMessageData({
            message:
              newContacts?.length === 0
                ? "Duplicate contacts Merged successfully"
                : "Contacts imported successfully!",
            type: "success",
            hideDuration: 2000,
            open: true,
          });
        }
      } else {
        context.setAlertMessageData({
          message: "Couldn't import data. Please try again later.",
          type: "error",
          hideDuration: 2000,
          open: true,
        });
      }
    }

    importContacts(file, handleImportRes);

    event.target.value = null;
  };

  const handleExportContacts = () => {
    const existingContacts = fetchContactsDetails();
    const fileName = "Contact-List";
    const res = exportContacts(existingContacts, fileName);
    if (res) {
      context.setAlertMessageData({
        message: "Contacts exported successfully!!",
        type: "success",
        hideDuration: 1500,
        open: true,
      });
    } else {
      context.setAlertMessageData({
        message: "Couldn't export contacts. Pleas try again later.",
        type: "error",
        hideDuration: 1500,
        open: true,
      });
    }
  };
  return (
    <>
      <Container>
        <Typography sx={{ my: 3, fontSize: 30 }}>
          Welcome!! {context.userName}
        </Typography>
      </Container>
      <Container sx={{ textAlign: "end" }}>
        {rows.length !== 0 && (
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
            style={{ display: "none" }}
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
        <BasicTable
          rows={rows}
          setRows={setRows}
          setCurrentRow={setCurrentRow}
          setOpen={setOpen}
          contacts={contacts}
        />
      </Container>

      {open && (
        <CustomDialog
          open={open}
          data={currentRow}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      )}
    </>
  );
}
