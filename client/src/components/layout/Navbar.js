import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Badge,
  Drawer,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  ChatBubbleOutline,
  Close,
  Menu,
  MonetizationOn,
  Search,
} from "@material-ui/icons";

import Payments from "./Payments";
import AuthContext from "../../context/auth/authContext";
import setAuthToken from "../../context/setAuthToken";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#0F495C",
    marginRight: "0px",
  },
  searchInput: {
    // opacity: "0.6",
    padding: "0px 8px",
    fontSize: "0.8rem",
    backgroundColor: "#f0ffff",
    borderRadius: "4px",

    "&:hover": {
      backgroundColor: "#ADFF2F",
    },
    "& .MuiSvgIcon-root": {
      marginRight: "8px",
    },
  },
});

const Navbar = () => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, loadUser, user } = authContext;

  // Drawer open and close
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Grid item>
      <Payments />
      <IconButton>
        <Badge badgeContent={4} color="primary">
          <ChatBubbleOutline style={{ color: "#ADFF2F" }} />
        </Badge>
      </IconButton>
      <IconButton onClick={onLogout}>
        <Typography>
          <Link
            to="/login"
            style={{ color: "#ADFF2F", textDecoration: "none" }}
          >
            Logout
          </Link>
        </Typography>
      </IconButton>
    </Grid>
  );

  const guestLinks = (
    <Grid item>
      <IconButton>
        <Typography>
          <Link
            to="/login"
            style={{ color: "#ADFF2F", textDecoration: "none" }}
          >
            Sign In
          </Link>
        </Typography>
      </IconButton>
    </Grid>
  );

  return (
    <Fragment>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: "10px" }}>
              <IconButton onClick={() => setOpen(true)}>
                <Menu style={{ color: "#ADFF2F" }} />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography
                variant="h4"
                color="secondary"
                // style={{
                //   fontFamily: "'Graphik', Helvetica, Arial, sans-serif",
                //   color: "#ADFF2F",
                // }}
              >
                Nutflix
              </Typography>
            </Grid>
            {/* <Grid item xs></Grid> */}

            <Grid item style={{ marginLeft: "auto", marginRight: "20px" }}>
              <InputBase
                className={classes.searchInput}
                style={{
                  border: "3px solid #ADFF2F",
                }}
                placeholder="Search Movies"
                startAdornment={<Search fontSize="small" />}
              />
            </Grid>
            {isAuthenticated ? authLinks : guestLinks}
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        width={300}
        style={{ marginTop: "40px" }}
        onClose={() => setOpen(false)}
      >
        <MenuItem>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </MenuItem>
        <MenuItem>Really Long Menu Item</MenuItem>
        <MenuItem>
          <Link
            to="/myOrders"
            style={{ color: "#0F495C", textDecoration: "none" }}
          >
            My Orders
          </Link>
        </MenuItem>
      </Drawer>
    </Fragment>
  );
};

export default Navbar;
