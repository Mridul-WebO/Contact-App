import * as React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import BasicTable from "../../components/Table";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

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
  return (
    <ThemeProvider theme={defaultTheme}>
      <BasicTable rows={rows} />
    </ThemeProvider>
  );
}
