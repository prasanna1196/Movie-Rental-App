import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";

import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0F495C",
      light: "#3c44b126",
    },
    secondary: {
      main: "#ADFF2F",
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
    height: "100vh",
    display: "flex",
    flexFlow: "column",
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appMain}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </Router>
      </div>

      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;
