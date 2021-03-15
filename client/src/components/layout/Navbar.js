import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ChatBubbleOutline, Close, Menu, Search } from "@material-ui/icons";

import SideMenu from "./SideMenu";
import Payments from "./Payments";
import AuthContext from "../../context/auth/authContext";

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

  const handleDrawer = () => {
    setOpen(!open);
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
              <IconButton onClick={handleDrawer}>
                <Menu style={{ color: "#ADFF2F" }} />
              </IconButton>
            </Grid>
            <Grid item>
              <Link to="/" style={{ color: "#ADFF2F", textDecoration: "none" }}>
                <Typography variant="h4" color="secondary">
                  Nutflix
                </Typography>
              </Link>
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
      <SideMenu handleDrawer={handleDrawer} open={open} />
    </Fragment>
  );
};

export default Navbar;
