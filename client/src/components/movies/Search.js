import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";
import { CircularProgress } from "@material-ui/core";

const Search = ({ match }) => {
  const [movieInfo, setMovieInfo] = useState({
    movies: null,
    loading: true,
    movieApi: null,
  });

  const { movies, loading, movieApi } = movieInfo;

  const searchMovie = async () => {
    const response = await axios.get(
      `/api/movies/search/${match.params.title}`
    );

    let tmdb = [];
    for (let res of response.data) {
      let api = await fetch(
        `http://www.omdbapi.com/?apikey=e96c9482&t=${res.name}`
      );
      let apiData = await api.json();
      tmdb = [...tmdb, apiData];
    }

    setMovieInfo({ loading: false, movies: response.data, movieApi: tmdb });
  };

  useEffect(() => {
    searchMovie();
  }, [match.params.title]);

  return (
    <div>
      {!loading && movies !== null && movieApi.length == movies.length ? (
        <div className="movie-container">
          {movieApi.map((movie, index) => (
            <MovieItem key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex-row sa">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Search;
