import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useOutletContext } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../features/user_contact_list/userContactListSlice";

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

export default function BasicTable({ setOpen, setCurrentRow }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.currentUser.userId);

  const contactsListData = useSelector((state) => state.contactsList.data);

  const contactList = contactsListData?.filter((contact) => {
    return contact.userId === userId;
  });

  const context = useOutletContext();

  const handleEditRow = (row) => {
    setCurrentRow(row);
    setOpen(true);
  };

  const handleDeleteRow = (userId) => {
    dispatch(deleteContact(userId));

    context.setAlertMessageData({
      message: "Contact deleted successfully!",
      type: "success",
      hideDuration: 2000,
      open: true,
    });
  };

  return (
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
          {contactList?.map((row) => (
            <StyledTableRow key={parseInt(row._id)}>
              <StyledTableCell component="th" scope="row">
                <Avatar
                  style={{ cursor: "pointer" }}
                  alt=" Sharp"
                  src={row?.imageUrl}
                >
                  {!row.imageURL && row.email?.slice(0, 1).toUpperCase()}
                </Avatar>
              </StyledTableCell>
              <StyledTableCell align="center">{row._id}</StyledTableCell>
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
                    onClick={() => handleEditRow(row)}
                  />
                </Tooltip>

                <Tooltip title="Delete">
                  <DeleteIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteRow(row._id)}
                  />
                </Tooltip>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
