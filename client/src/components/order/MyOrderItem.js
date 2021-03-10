import React, { useEffect, useContext } from "react";

import MovieContext from "../../context/movie/movieContext";

const MyOrderItem = ({ rentedMovie }) => {
  const movieContext = useContext(MovieContext);

  const { getOneMovieById, oneMovie } = movieContext;

  useEffect(() => {
    getOneMovieById(rentedMovie.movie);
    if (oneMovie) {
      console.log(oneMovie);
    }
  }, []);

  return (
    <div>
      {oneMovie !== null ? <div>{oneMovie.name}</div> : <div>loading</div>}
    </div>
  );
};

export default MyOrderItem;
