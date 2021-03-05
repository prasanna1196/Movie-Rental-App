import React, { Fragment, useContext, useState, useEffect } from "react";
import axios from "axios";
import MovieContext from "../../context/movie/movieContext";
import MovieItem from "./MovieItem";

const Movies = () => {
  const movieContext = useContext(MovieContext);

  // const { movies, loading, getMovies } = movieContext;

  const [some, setSome] = useState({
    movies: null,
    loading: true,
    movieApi: null,
  });

  let baseURL = "https://image.tmdb.org/t/p/w500";

  const { movies, loading, movieApi } = some;

  const getMovies = async () => {
    const response = await axios.get("/api/movies");

    let tmdb = [];
    for (let res of response.data) {
      let api = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=82f3aa84f64fab6fc7f4286e28e9df24&query=${res.name}`
      );
      let apiData = await api.json();
      tmdb = [...tmdb, apiData];
    }

    setSome({ loading: false, movies: response.data, movieApi: tmdb });
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {!loading && movies !== null && movieApi.length == movies.length ? (
        <div className="movie-container">
          {movieApi.map((movie, index) => (
            <MovieItem key={movie.results[0].id} movie={movie.results[0]} />
          ))}
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default Movies;
