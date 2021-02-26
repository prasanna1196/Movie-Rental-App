import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Payments from "../payments/Payments";
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
  PowerSettingsNew,
  Search,
} from "@material-ui/icons";

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

// #0c111b (hotstar background)
// #f0ffff (white shade)

const Navbar = () => {
  const classes = useStyles();

  // Drawer open and close
  const [open, setOpen] = useState(false);

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
                style={{
                  fontFamily: "'Graphik', Helvetica, Arial, sans-serif",
                  color: "#ADFF2F",
                }}
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

            <Grid item>
              <Payments />
              <IconButton>
                <Badge badgeContent={4} color="primary">
                  <ChatBubbleOutline style={{ color: "#ADFF2F" }} />
                </Badge>
              </IconButton>
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
        <MenuItem>Menu Item 2</MenuItem>
      </Drawer>
    </Fragment>
  );
};

export default Navbar;
