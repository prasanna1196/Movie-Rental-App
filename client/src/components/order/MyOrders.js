import React, { useContext, useEffect, useState } from "react";

import MyOrderItem from "./MyOrderItem";

import MovieContext from "../../context/movie/movieContext";
import AlertContext from "../../context/alert/alertContext";
import axios from "axios";

const MyOrders = () => {
  const alertContext = useContext(AlertContext);
  const movieContext = useContext(MovieContext);

  const { setAlert } = alertContext;
  const { returnStatus, renewStatus, error, clearErrors } = movieContext;

  const [rentInfo, setrentInfo] = useState({
    rentList: null,
    loading: true,
    movies: null,
  });

  const { rentList, loading, movies } = rentInfo;

  const getMovies = async () => {
    const response = await axios.get("/api/rent/all");

    let movieList = [];
    for (let res of response.data) {
      let movie = await axios.get(`/api/movies/${res.movie}`);
      movieList = [...movieList, movie.data];
    }

    setrentInfo({ loading: false, rentList: response.data, movies: movieList });
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    if (error) {
      setAlert(error, "error");
      console.log(error);
      clearErrors();
    }
    if (returnStatus) {
      setAlert(returnStatus, "success");
      clearErrors();
    }
    if (renewStatus) {
      setAlert(renewStatus, "success");
      clearErrors();
    }
  }, [error, renewStatus, returnStatus]);

  return (
    <div style={{ padding: "25px 30px", width: "100%", margin: "0 auto" }}>
      {movies !== null && !loading ? (
        <div>
          <div>
            <h1>Active Orders</h1>
            {rentList.map(
              (rent, index) =>
                rent.status && (
                  <MyOrderItem
                    key={rent._id}
                    movie={movies[index]}
                    rent={rent}
                  />
                )
            )}
          </div>
          <div>
            <h1 style={{ marginTop: "60px" }}>Order History</h1>
            {rentList.map(
              (rent, index) =>
                !rent.status && (
                  <MyOrderItem
                    key={rent._id}
                    movie={movies[index]}
                    rent={rent}
                  />
                )
            )}
          </div>
        </div>
      ) : (
        <div>loading..</div>
      )}
    </div>
  );
};

export default MyOrders;
