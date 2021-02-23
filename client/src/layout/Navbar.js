import React, { Fragment, useState } from "react";
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
  NotificationsNone,
  PowerSettingsNew,
  Search,
} from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#0F495C",
    marginRight: "0px",
  },
  searchInput: {
    opacity: "0.6",
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
              <IconButton>
                <Menu style={{ color: "#fff" }} onClick={() => setOpen(true)} />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography
                variant="h4"
                style={{
                  fontFamily: "'Graphik', Helvetica, Arial, sans-serif",
                }}
              >
                Nutflix
              </Typography>
            </Grid>
            {/* <Grid item xs></Grid> */}

            <Grid item style={{ marginLeft: "auto", marginRight: "20px" }}>
              <InputBase
                className={classes.searchInput}
                placeholder="Search Topics"
                startAdornment={<Search fontSize="small" />}
              />
            </Grid>

            <Grid item>
              <IconButton>
                <Badge badgeContent={4} color="secondary">
                  <MonetizationOn style={{ color: "#fff" }} />
                </Badge>
              </IconButton>
              <IconButton>
                <Badge badgeContent={4} color="primary">
                  <ChatBubbleOutline style={{ color: "#fff" }} />
                </Badge>
              </IconButton>
              <IconButton>
                <PowerSettingsNew style={{ color: "#fff" }} />
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
          <IconButton>
            <Close onClick={() => setOpen(false)} />
          </IconButton>
        </MenuItem>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </Drawer>
    </Fragment>
  );
};

export default Navbar;
