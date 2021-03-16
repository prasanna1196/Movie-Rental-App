import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";

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
        `https://api.themoviedb.org/3/search/movie?api_key=82f3aa84f64fab6fc7f4286e28e9df24&query=${res.name}`
      );
      let apiData = await api.json();
      tmdb = [...tmdb, apiData];
    }

    setMovieInfo({ loading: false, movies: response.data, movieApi: tmdb });
  };

  useEffect(() => {
    searchMovie();
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

export default Search;
