import React, { Fragment, useContext, useState, useEffect } from "react";
import axios from "axios";
import MovieContext from "../../context/movie/movieContext";
import MovieCard from "./MovieCard";

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

    // let tmdb = await response.data.forEach(async (res) => {
    //   return await axios.get(
    //     "https://api.themoviedb.org/3/search/movie?api_key=82f3aa84f64fab6fc7f4286e28e9df24&query=saving private ryan"
    //   );
    // });
    let tmdb = [];
    for (let res of response.data) {
      let api = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=82f3aa84f64fab6fc7f4286e28e9df24&query=${res.name}`
      );
      tmdb = [...tmdb, api.data];
    }
    // console.log(tmdb);
    // let tmdb = await axios.get(
    //   `https://api.themoviedb.org/3/search/movie?api_key=82f3aa84f64fab6fc7f4286e28e9df24&query=${response.data[0].name}`
    // );

    // response.data.forEach((res) => console.log(res.name));
    setSome({ loading: false, movies: response.data, movieApi: tmdb });
    console.log(movieApi);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Fragment>
      {!loading && movies !== null ? (
        <div>
          {/* {movies[2].name} */}

          <img src={`${baseURL}${movie.results[0].poster_path}`} />
        </div>
      ) : (
        <div>loading...</div>
      )}
    </Fragment>
  );
};

export default Movies;
