import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import AddIcon from "@mui/icons-material/Add";
import BasicTable from "../../components/Table";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ContactList() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BasicTable />
    </ThemeProvider>
  );
}
