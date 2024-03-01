import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button, Container, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomDialog from "./CustomDialog";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import exportFromJSON from "export-from-json";
import Papa from "papaparse";
import { useOutletContext } from "react-router-dom";
import {
  addContactDetails,
  addImportedContactDetails,
  deleteAllContacts,
  deleteContact,
  editContact,
  fetchContactsDetails,
} from "../storage/Storage";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function handleEditRow(row, setCurrentRow, setOpen) {
  setCurrentRow(row);
  setOpen(true);
}

function handleDeleteRow(userId, contacts, setRows, context) {
  const updatedContacts = contacts.filter(
    (contact) => parseInt(contact.userId) !== userId
  );
  setRows(updatedContacts);
  deleteContact(updatedContacts);

  context.setAlertMessageData({
    message: "Contact deleted successfully!",
    type: "success",
    hideDuration: 2000,
    open: true,
  });
  console.log(context);
}

function handleExportContacts() {
  const data = fetchContactsDetails();

  const fileName = "Contact-List";
  const exportType = exportFromJSON.types.csv;

  exportFromJSON({ data, fileName, exportType });
}

function handleImportContacts(event, context, rows, setRows) {
  const existingContacts = fetchContactsDetails();
  const file = event.target.files[0];

  Papa.parse(file, {
    header: true,
    complete: (res) => {
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
    },
  });

  event.target.value = null; // setting the value of input field to null in order to update the profile image
}

export default function BasicTable() {
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

  return (
    <>
      <Container>
        <Typography sx={{ my: 3, fontSize: 30 }}>
          Welcome!! {context.userName}
        </Typography>
      </Container>

      <Container sx={{ my: 5, textAlign: "end" }}>
        {rows.length !== 0 && (
          <Button
            sx={{ mx: 4 }}
            variant="outlined"
            onClick={handleDeleteAllContacts}
          >
            Delete All
          </Button>
        )}
        {rows.length !== 0 && (
          <Fab
            color="primary"
            aria-label="add"
            sx={{ my: 1 }}
            onClick={handleExportContacts}
          >
            <Typography sx={{ fontSize: 10 }}>Export data</Typography>
          </Fab>
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
            onChange={(event) =>
              handleImportContacts(event, context, rows, setRows)
            }
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

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Photo</StyledTableCell>
                <StyledTableCell align="center">User Id</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Phone Number</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={parseInt(row.userId)}>
                  <StyledTableCell component="th" scope="row">
                    <Avatar
                      style={{ cursor: "pointer" }}
                      alt=" Sharp"
                      src={row?.imageUrl}
                    >
                      {!row.imageURL && row.email?.slice(0, 1).toUpperCase()}
                    </Avatar>
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.userId}</StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.phoneNumber}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Tooltip title="Edit">
                      <EditIcon
                        sx={{ mx: 2 }}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleEditRow(row, setCurrentRow, setOpen)
                        }
                      />
                    </Tooltip>

                    <Tooltip title="Delete">
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleDeleteRow(
                            parseInt(row.userId),
                            contacts,
                            setRows,
                            context
                          )
                        }
                      />
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {open && (
          <CustomDialog
            open={open}
            data={currentRow}
            onSubmit={onSubmit}
            onClose={onClose}
          />
        )}
      </Container>
    </>
  );
}
