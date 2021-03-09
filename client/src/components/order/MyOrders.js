import React, { useContext, useEffect } from "react";

import MyOrderItem from "./MyOrderItem";

import MovieContext from "../../context/movie/movieContext";
import AuthContext from "../../context/auth/authContext";

const MyOrders = () => {
  const authContext = useContext(AuthContext);
  const movieContext = useContext(MovieContext);

  const { rentedMovies, getRentedMovies, loading } = movieContext;

  useEffect(() => {
    getRentedMovies();
  }, []);

  return (
    <div style={{ padding: "25px 30px" }}>
      {rentedMovies !== null && !loading ? (
        <div>
          <h1>Active Orders</h1>
          {rentedMovies.map((rentedMovie) => (
            <MyOrderItem key={rentedMovie._id} rentedMovie={rentedMovie} />
          ))}
        </div>
      ) : (
        <div>loading..</div>
      )}
    </div>
  );
};

export default MyOrders;
