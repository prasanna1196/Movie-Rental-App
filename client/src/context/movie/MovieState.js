import React, { useReducer, useState } from "react";
import axios from "axios";
import MovieContext from "./movieContext";
import movieReducer from "./movieReducer";
import {
  GET_MOVIES,
  GET_ONE_MOVIE,
  PLACE_ORDER,
  GET_RENTED_MOVIES,
  GET_ONE_RENTED_MOVIE,
  MOVIE_ERROR,
  CLEAR_ERRORS,
} from "../types";

const MovieState = (props) => {
  const initialState = {
    loading: true,
    movies: null,
    oneMovie: null,
    rentedMovies: null,
    rentDetails: null,
    oneRentedMovie: null,
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

  // Get a list of rented movies
  const getRentedMovies = async () => {
    try {
      const res = await axios.get("/api/rent/all");

      dispatch({
        type: GET_RENTED_MOVIES,
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

  // Get one rented movie
  const getOneRentedMovie = async (id) => {
    try {
      const res = await axios.get(`/api/rent/${id}`);

      dispatch({
        type: GET_ONE_RENTED_MOVIE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: MOVIE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Clear rental Details
  const clearRentalDetails = () => {
    dispatch({
      type: MOVIE_ERROR,
    });
  };

  // Clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <MovieContext.Provider
      value={{
        loading: state.loading,
        movies: state.movies,
        oneMovie: state.oneMovie,
        rentedMovies: state.rentedMovies,
        rentDetails: state.rentDetails,
        oneRentedMovie: state.oneRentedMovie,
        error: state.error,
        getMovies,
        getOneMovie,
        placeOrder,
        getRentedMovies,
        getOneRentedMovie,
        clearRentalDetails,
        clearErrors,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
