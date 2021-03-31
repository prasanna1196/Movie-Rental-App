import React, { useState } from "react";
import {
  Paper,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  TextField,
} from "@material-ui/core";

import MovieContext from "../../../context/movie/movieContext";
import AlertContext from "../../../context/alert/alertContext";
import { useContext } from "react";

const ApproveReturnItem = ({ order: { returnId, rental, movie, user } }) => {
  const movieContext = useContext(MovieContext);
  const alertContext = useContext(AlertContext);

  const { approveReturn, declineReturn } = movieContext;
  const { setAlert } = alertContext;

  const [reason, setReason] = useState(null);

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const onApprove = () => {
    approveReturn(returnId);
  };

  const onDecline = () => {
    if (reason.length < 10) {
      return setAlert("Reason shoud be atleast 10 characters long", "warning");
    }
    handleClose();
    const info = {
      reason: reason,
      user: user._id,
      movie: movie.name,
      returnId,
    };
    declineReturn(info);
  };

  return (
    <div>
      <Paper
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
          margin: "10px 0",
          fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
        }}
      >
        <div>
          <h4 style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}>
            Movie: {movie.name}
          </h4>
          <p>User: {user.name}</p>
          {/* <p>OrderId: {rental._id}</p> */}
          <p>Quality: {rental.quality.toUpperCase()}</p>
          <p>Rented On: {rental.rentedOn.slice(0, 10)}</p>
          <p>Due Date: {rental.dueDate.slice(0, 10)}</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          {rental.penalty ? (
            <h4 style={{ color: "red" }}>Penalty: {rental.penalty}</h4>
          ) : (
            <h4>Penalty: {rental.penalty}</h4>
          )}

          <div>
            <Button
              style={{
                marginRight: "15px",
                backgroundColor: "grey",
                color: "white",
              }}
              onClick={() => setOpen(true)}
              variant="contained"
            >
              Decline
            </Button>
            <Button
              style={{ color: "#ADFF2F" }}
              onClick={onApprove}
              variant="contained"
              color="primary"
            >
              Approve
            </Button>
          </div>
        </div>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Decline</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure want to delete ${movie.name} ?`}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="reason"
            label="Reason for Declining"
            onChange={(e) => setReason(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button color="primary" onClick={onDecline}>
            DECLINE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ApproveReturnItem;
