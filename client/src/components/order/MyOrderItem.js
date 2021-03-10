import { Button, Paper } from "@material-ui/core";
import React, { useEffect, useContext } from "react";

// Verdana, Geneva, Tahoma, sans-serif  Roboto, Helvetica, Arial, sans-serif

const MyOrderItem = ({ rent, movie }) => {
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
            OrderId: {rent._id}
          </h4>
          <p>Movie: {movie.name}</p>
          <p>Quality: {rent.quality.toUpperCase()}</p>
          <p>Rented On: {rent.rentedOn.slice(0, 10)}</p>
          <p>Due Date: {rent.dueDate.slice(0, 10)}</p>
          <p>Amount: {rent.amount}</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <h4>Penalty: {rent.penalty}</h4>
          {rent.status && (
            <Button variant="contained" color="primary">
              Return
            </Button>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default MyOrderItem;
