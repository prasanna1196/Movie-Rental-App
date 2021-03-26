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
import AdminRoute from "./components/auth/AdminRoute";
import MovieDetails from "./components/movies/MovieDetails";
import Search from "./components/movies/Search";
import PlaceOrder from "./components/order/PlaceOrder";
import OrderConfirmation from "./components/order/OrderConfirmation";
import MyOrders from "./components/order/MyOrders";
import AddMovies from "./components/admin/movies/AddMovies";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import MovieState from "./context/movie/MovieState";
import setAuthToken from "./context/setAuthToken";

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
      default: "#f0f1f3",
    },
  },

  // #0c111b (hotstar background)
  // #f0ffff (white shade)
  // #e5eaee (grey ish background)
  // #f0f1f3 (another background)
  // #3e9fbf (Blue color for subtext and key)

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
    position: "relative",
  },
});

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

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
                <div style={{ marginTop: "64px", height: "100vw" }}>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route
                      exact
                      path="/movies/:title"
                      component={MovieDetails}
                    />
                    <Route exact path="/search/:title" component={Search} />
                    <Route exact path="/order/:title" component={PlaceOrder} />
                    <Route
                      exact
                      path="/orderConfirmation/:id"
                      component={OrderConfirmation}
                    />
                    <Route exact path="/myOrders" component={MyOrders} />
                    <AdminRoute
                      exact
                      path="/admin/addMovies"
                      component={AddMovies}
                    />
                  </Switch>
                </div>
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
