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
  } = movieContext;

  // const blahf = async () => {
  //   await getOneRentedMovie(match.params.id);
  //   console.log(oneRentedMovie);
  // };

  useEffect(() => {
    clearRentalDetails();
    getOneRentedMovie(match.params.id);
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Order Details</h1>
      {!loading && oneRentedMovie !== null ? (
        <div className="movie-credits">
          <div className="credit-item">
            <p className="key">OrderId: </p>
            <p>{oneRentedMovie._id}</p>
          </div>
          <div className="credit-item">
            <p className="key">Movie: </p>
            <p>{oneRentedMovie._id}</p>
          </div>
          <div className="credit-item">
            <p className="key">Quality: </p>
            <p>{oneRentedMovie.quality}</p>
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
