import React, { useReducer, useState } from "react";
import axios from "axios";
import MovieContext from "./movieContext";
import movieReducer from "./movieReducer";
import { GET_MOVIES, GET_ONE_MOVIE, PLACE_ORDER, MOVIE_ERROR } from "../types";

const MovieState = (props) => {
  const initialState = {
    loading: true,
    movies: null,
    oneMovie: null,
    rentDetails: null,
    error: null,
  };

  const [state, dispatch] = useReducer(movieReducer, initialState);

  // Get movies
  const getMovies = async () => {
    try {
      const res = await axios.get("/api/movies");

      dispatch({
        type: GET_MOVIES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: MOVIE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get one movie
  const getOneMovie = async (title) => {
    try {
      const res = await axios.get(`/api/movies/${title}`);

      dispatch({
        type: GET_ONE_MOVIE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: MOVIE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Rent a movie
  const placeOrder = async (order) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/rent", order, config);

      dispatch({
        type: PLACE_ORDER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: MOVIE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        oneMovie: state.oneMovie,
        loading: state.loading,
        rentDetails: state.rentDetails,
        error: state.error,
        getMovies,
        getOneMovie,
        placeOrder,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
