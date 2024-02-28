import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Container, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomDialog from "./CustomDialog";
import { getSingleData } from "../storage/Storage";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

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

export default function BasicTable() {
  const [rows, setRows] = React.useState([]);
  const addContactBtnRef = React.useRef(null);

  React.useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem("currentUser"))?.userId;
    const currentUserData = getSingleData(userId);

    const contacts = currentUserData?.contacts || [];
    if (currentUserData) {
      setRows([...rows, ...contacts]);
    }
  }, []);

  return (
    <Container sx={{ my: 5, textAlign: "end" }}>
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
  );
}
