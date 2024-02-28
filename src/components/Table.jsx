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
// import { read, writeFileXLSX, utils } from "xlsx";

import { csv2json, json2csv } from "json-2-csv";
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
function handleAddContact(addContactBtnRef) {
  addContactBtnRef.current.click();
}

function convertToCSV(json) {
  const fields = Object.keys(json[0]); // get the headers from the first object in the array
  const csv = json2csv({ data: json, fields }); // convert the JSON to CSV using the json2csv package
  return csv;
}

function handleExportContacts() {
  console.log("Export");

  // const contactDetailsArr = fetchContactsDetails();

  // const csv = convertToCSV(fetchContactsDetails());
  // const blob = new Blob([csv], { type: "text/csv" });
  // const url = window.URL.createObjectURL(blob);
  // const a = document.createElement("a");
  // a.href = url;
  // a.download = "data.csv";
  // document.body.appendChild(a);
  // a.click();
  // document.body.removeChild(a);
}

function handleImportContacts(event) {
  console.log("Import");

  // const csvFile = csv2json(event.target.files[0]);

  // console.log(csvFile);
}

export default function BasicTable() {
  const contacts = fetchContactsDetails();

  const [rows, setRows] = React.useState(contacts);

  const addContactBtnRef = React.useRef(null);
  const importRef = React.useRef(null);
  const exportRef = React.useRef(null);
  console.log("rows", rows);

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
          onClick={() => exportRef.current.click()}
        >
          <Typography sx={{ fontSize: 10 }}>Export CSV</Typography>
          <input
            type="file"
            style={{ display: "none" }}
            ref={exportRef}
            onChange={(event) => handleExportContacts(event)}
          />
        </Fab>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ my: 1, mx: 1 }}
          onClick={() => importRef.current.click()}
        >
          <Typography sx={{ fontSize: 10 }}>Import CSV</Typography>
          <input
            type="file"
            style={{ display: "none" }}
            ref={importRef}
            onChange={(event) => handleImportContacts(event)}
          />
        </Fab>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ my: 1 }}
          onClick={() => handleAddContact(addContactBtnRef)}
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
                      {!row.imageURL && row.email.slice(0, 1).toUpperCase()}
                    </Avatar>
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.userId}</StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.phoneNumber}
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
