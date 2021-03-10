import { Button } from "@material-ui/core";
import React, { useEffect, useContext } from "react";

import MovieContext from "../../context/movie/movieContext";

const OrderConfirmation = ({ match }) => {
  const movieContext = useContext(MovieContext);

  const {
    getOneRentedMovie,
    clearRentalDetails,
    loading,
    oneRentedMovie,
    getOneMovieById,
    oneMovie,
  } = movieContext;

  const getOrderDetails = async () => {
    await getOneRentedMovie(match.params.id);

    await getOneMovieById(oneRentedMovie.movie);
  };

  useEffect(() => {
    clearRentalDetails();
    // getOrderDetails();
    getOneRentedMovie(match.params.id);
  }, []);

  useEffect(() => {
    if (oneRentedMovie) {
      getOneMovieById(oneRentedMovie.movie);
    }
  }, [oneRentedMovie]);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Order Details</h1>
      {!loading && oneRentedMovie !== null && oneMovie !== null ? (
        <div className="movie-credits">
          <div className="credit-item">
            <p className="key">OrderId: </p>
            <p>{oneRentedMovie._id}</p>
          </div>
          <div className="credit-item">
            <p className="key">Movie: </p>
            <p>{oneMovie.name}</p>
          </div>
          <div className="credit-item">
            <p className="key">Quality: </p>
            <p>{oneRentedMovie.quality.toUpperCase()}</p>
          </div>
          <div className="credit-item">
            <p className="key">Rented On: </p>
            <p>{oneRentedMovie.rentedOn.slice(0, 10)}</p>
          </div>
          <div className="credit-item">
            <p className="key">Due Date: </p>
            <p>{oneRentedMovie.dueDate.slice(0, 10)}</p>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button color="primary">
              <a href="/">Continue Shopping..</a>
            </Button>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default OrderConfirmation;
