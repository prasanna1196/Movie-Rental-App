import React, { useEffect, useContext } from "react";

import MovieContext from "../../context/movie/movieContext";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const PlaceOrder = ({ match, history }) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const movieContext = useContext(MovieContext);

  const { isAuthenticated, loadUser, prevLocation, redirectUser } = authContext;
  const { setAlert } = alertContext;
  const { oneMovie, loading, getOneMovie } = movieContext;

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="order-page">
      <h1>Place Order</h1>
      <h2>{oneMovie.name}</h2>
    </div>
  );
};

export default PlaceOrder;
