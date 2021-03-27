import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Drawer, IconButton, MenuItem, Typography } from "@material-ui/core";

import AuthContext from "../../context/auth/authContext";

import { Close } from "@material-ui/icons";

const linkStyle = { color: "#0F495C", textDecoration: "none" };

const SideMenu = (props) => {
  const { handleDrawer } = props;

  const authContext = useContext(AuthContext);

  const { isAuthenticated, isAdmin } = authContext;

  return (
    <Drawer
      open={props.open}
      width={300}
      style={{ marginTop: "40px" }}
      onClose={handleDrawer}
    >
      <MenuItem>
        <IconButton onClick={handleDrawer}>
          <Close />
        </IconButton>
      </MenuItem>
      <MenuItem>Really Long Menu Item</MenuItem>
      <MenuItem>
        {isAuthenticated ? (
          <Link to="/myOrders" style={linkStyle} onClick={handleDrawer}>
            My Orders
          </Link>
        ) : (
          <Link to="/login" style={linkStyle} onClick={handleDrawer}>
            My Orders
          </Link>
        )}
      </MenuItem>
    </Drawer>
  );
};

export default SideMenu;
