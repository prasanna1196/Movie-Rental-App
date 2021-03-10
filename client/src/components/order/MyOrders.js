import React, { useContext, useEffect, useState } from "react";

import MyOrderItem from "./MyOrderItem";

import MovieContext from "../../context/movie/movieContext";
import AuthContext from "../../context/auth/authContext";
import axios from "axios";

const MyOrders = () => {
  const authContext = useContext(AuthContext);
  const movieContext = useContext(MovieContext);

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

  return (
    <div style={{ padding: "25px 30px" }}>
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
