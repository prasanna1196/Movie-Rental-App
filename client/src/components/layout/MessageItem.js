import React, { useState, useContext } from "react";
import {
  Paper,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  TextField,
  IconButton,
} from "@material-ui/core";

import { Close } from "@material-ui/icons";

const MessageItem = ({ message, onDelete }) => {
  // const handleClose = () => setOpen(false);

  return (
    <div>
      <Paper
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
          margin: "10px auto",
          fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
        }}
      >
        <div>
          <h4 style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}>
            {message.message}
          </h4>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <IconButton onClick={() => onDelete(message._id)}>
            <Close />
          </IconButton>
        </div>
      </Paper>
    </div>
  );
};

export default MessageItem;
