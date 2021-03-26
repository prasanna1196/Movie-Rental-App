import React, { useContext, useState, useEffect } from "react";
import MovieContext from "../../../context/movie/movieContext";
import MovieListItem from "./MovieListItem";

const MovieList = () => {
  const movieContext = useContext(MovieContext);

  const { getMovies, movies, error, clearErrors } = movieContext;

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div style={{ width: "50%", position: "absolute", right: "40px" }}>
      {movies ? (
        <div>
          {movies.map((movie) => (
            <MovieListItem key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <div>loading. .</div>
      )}
    </div>
  );
};

export default MovieList;
