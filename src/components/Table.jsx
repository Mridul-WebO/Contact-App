import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Container, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomDialog from "./CustomDialog";
import { fetchContactsDetails, fetchCurrentUser } from "../storage/Storage";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import exportFromJSON from "export-from-json";

import Papa from "papaparse";
import { useOutletContext } from "react-router-dom";
// import FileUploadIcon from "@mui/icons-material/FileUpload";

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

function handleEditRow() {
  console.log("Edit Row");
}

function handleDeleteRow() {
  console.log("Delete Row");
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

        setRows([...newContacts, ...rows]);
        console.log(newContacts);

        context.setAlertMessageData({
          message: "Contacts imported successfully!!",
          type: "success",
          hideDuration: 3000,
          ref: null,
        });
      } else {
        context.setAlertMessageData({
          message: "Couldn't export data. Please try again after sometime",
          type: "error",
          ref: null,
        });
      }
      context.alertMessageData.ref?.current.click();
    },
  });

  // console.log(csvFile);
}

export default function BasicTable() {
  const contacts = fetchContactsDetails();
  const context = useOutletContext();

  const [rows, setRows] = React.useState(contacts);

  const addContactBtnRef = React.useRef(null);
  const importRef = React.useRef(null);

  const userName = fetchCurrentUser()?.email.split("@")[0];

  return (
    <>
      <div className="container">
        <div className="row my-4">
          <div className="col">
            <h4>Welcome!! {userName} </h4>
          </div>
        </div>
      </div>
      <Container sx={{ my: 5, textAlign: "end" }}>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ my: 1 }}
          onClick={handleExportContacts}
        >
          <Typography sx={{ fontSize: 10 }}>Export data</Typography>
        </Fab>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ my: 1, mx: 1 }}
          onClick={() => importRef.current.click()}
        >
          <Typography sx={{ fontSize: 10 }}>Import data</Typography>
          <input
            type="file"
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
          onClick={() => addContactBtnRef.current.click()}
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
                <StyledTableRow key={row.userId}>
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
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={handleEditRow}
                    />
                    <DeleteIcon
                      style={{ cursor: "pointer" }}
                      onClick={handleDeleteRow}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomDialog
          addContactBtnRef={addContactBtnRef}
          rows={rows}
          setRows={setRows}
        />
      </Container>
    </>
  );
}
