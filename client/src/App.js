import React from "react";
import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";

import Navbar from "./layout/Navbar";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
      light: "#3c44b126",
    },
    secondary: {
      main: "#0000ff",
      light: "#f8324526",
    },
    background: {
      default: "#e5eaee",
    },
  },

  // #0c111b (hotstar background)
  // #f0ffff (white shade)

  // Global changes
  overrides: {
    MuiAppBar: {
      root: {
        // For searchbar shadow
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      //disableRipple: true,
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    width: "100%",
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appMain}>
        <Navbar />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;
