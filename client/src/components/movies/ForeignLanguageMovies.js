import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";
import { CircularProgress } from "@material-ui/core";

const ForeignLanguageMovies = () => {
  const [some, setSome] = useState({
    movies: null,
    loading: true,
    movieApi: null,
  });

  const { movies, loading, movieApi } = some;

  const getMovies = async () => {
    const response = await axios.get("/api/movies/foreignLanguageMovies");

    let tmdb = [];
    for (let res of response.data) {
      let api = await fetch(
        `http://www.omdbapi.com/?apikey=e96c9482&t=${res.name}`
      );
      let apiData = await api.json();
      tmdb = [...tmdb, apiData];
    }

    if (isMounted) {
      setSome({ loading: false, movies: response.data, movieApi: tmdb });
    }
  };

  let isMounted = true;

  useEffect(() => {
    getMovies();
    return () => (isMounted = false);
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      <h1 style={{ margin: "10px 15px 0" }}>Foreign Language Movies</h1>
      {!loading && movies !== null && movieApi.length == movies.length ? (
        <div className="movie-container">
          {movieApi.map((movie, index) => (
            <MovieItem key={movie.imdbID} movie={movie} />
          ))}
          <div style={{ minWidth: "8px" }}></div>
        </div>
      ) : (
        <div className="flex-row sa">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default ForeignLanguageMovies;
