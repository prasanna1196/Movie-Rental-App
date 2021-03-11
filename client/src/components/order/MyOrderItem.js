import { Button, Paper } from "@material-ui/core";
import React, { useEffect, useContext } from "react";
import MovieContext from "../../context/movie/movieContext";

// Verdana, Geneva, Tahoma, sans-serif  Roboto, Helvetica, Arial, sans-serif

const MyOrderItem = ({ rent, movie }) => {
  const movieContext = useContext(MovieContext);

  const { returnMovie, renewMovie } = movieContext;

  const onRenew = async () => {
    await renewMovie(rent._id);
  };

  const onReturn = async () => {
    await returnMovie(rent._id);
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
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          {rent.status && rent.penalty ? (
            <h4 style={{ color: "red" }}>Penalty: {rent.penalty}</h4>
          ) : (
            <h4>Penalty: {rent.penalty}</h4>
          )}
          {rent.status && (
            <div>
              <Button
                style={{ marginRight: "15px" }}
                onClick={onRenew}
                variant="contained"
                color="primary"
              >
                Renew
              </Button>
              <Button
                style={{ color: "#ADFF2F" }}
                onClick={onReturn}
                variant="contained"
                color="primary"
              >
                Return
              </Button>
            </div>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default MyOrderItem;
