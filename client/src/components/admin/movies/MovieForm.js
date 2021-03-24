import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import MovieContext from "../../../context/movie/movieContext";

const MovieForm = () => {
  const movieContext = useContext(MovieContext);

  const {
    oneMovie,
    loading,
    getOneMovieByName,
    error,
    clearErrors,
  } = movieContext;

  return (
    <div>
      <div>blah</div>
    </div>
  );
};

export default MovieForm;
