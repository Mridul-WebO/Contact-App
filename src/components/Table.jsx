import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomDialog from "./CustomDialog";

function createData(name, email, phoneNumber) {
  return { name, email, phoneNumber };
}

function handleAddContact(rows, setRows, addContactBtnRef) {
  // setRows([...rows, createData("sam", "sam@gmail.com", 9876767666)]);
  addContactBtnRef.current.click();
}

export default function BasicTable() {
  const [rows, setRows] = React.useState([]);
  const addContactBtnRef = React.useRef();

  return (
    <Container sx={{ my: 5, textAlign: "end" }}>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ my: 1 }}
        onClick={() => handleAddContact(rows, setRows, addContactBtnRef)}
      >
        <AddIcon />
      </Fab>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phoneNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomDialog addContactBtnRef={addContactBtnRef} />
    </Container>
  );
}
