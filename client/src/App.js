import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";

import "./App.css";

import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";
import Home from "./Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Movies from "./components/movies/Movies";
import MovieDetails from "./components/movies/MovieDetails";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import MovieState from "./context/movie/MovieState";

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
  // #e5eaee (grey ish background)

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
      <AuthState>
        <AlertState>
          <MovieState>
            <div className={classes.appMain}>
              <Router>
                <Navbar />
                <Alerts />
                <Switch>
                  <Route exact path="/" component={Movies} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/movies/:title" component={MovieDetails} />
                </Switch>
              </Router>
            </div>
          </MovieState>
        </AlertState>
      </AuthState>

      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;
