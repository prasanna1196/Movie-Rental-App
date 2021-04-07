import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu, NotificationsActiveOutlined, Search } from "@material-ui/icons";

import SideMenu from "./SideMenu";
import Payments from "./Payments";
import AuthContext from "../../context/auth/authContext";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#0F495C",
    marginRight: "0px",
    width: "100vw",
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

  const { isAuthenticated, isAdmin, logout, loadUser, user } = authContext;

  const [messageCount, setMessageCount] = useState(0);

  const getMessages = async () => {
    const messageCount = await axios.get("/api/messages/count");
    setMessageCount(messageCount.data);
  };

  useEffect(() => {
    loadUser();
    getMessages();
  }, []);

  const onLogout = () => {
    logout();
  };

  // Drawer open and close
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  // Search Movie
  const [searchValue, setSearchValue] = useState("");

  // For using history outside <Switch> in <BrowserRouter> in App.js file
  let history = useHistory();

  const authLinks = (
    <Grid item>
      <Payments />
      <IconButton>
        <Link to="/messages">
          <Badge color="error" badgeContent={messageCount}>
            <NotificationsActiveOutlined style={{ color: "#ADFF2F" }} />
          </Badge>
        </Link>
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
      <AppBar position="fixed" className={classes.root}>
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
                  RentFlix
                </Typography>
              </Link>
            </Grid>
            {/* <Grid item xs></Grid> */}

            <Grid item style={{ marginLeft: "auto", marginRight: "20px" }}>
              <InputBase
                className={classes.searchInput}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    history.push(`/search/${e.target.value}`);
                    setSearchValue("");
                  }
                }}
                style={{
                  border: "3px solid #ADFF2F",
                }}
                placeholder="Search Movies"
                startAdornment={<Search fontSize="small" />}
              />
            </Grid>
            {isAuthenticated || isAdmin ? authLinks : guestLinks}
          </Grid>
        </Toolbar>
      </AppBar>
      <SideMenu handleDrawer={handleDrawer} open={open} />
    </Fragment>
  );
};

export default Navbar;
