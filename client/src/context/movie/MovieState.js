import React, { useReducer, useState } from "react";
import axios from "axios";
import MovieContext from "./movieContext";
import movieReducer from "./movieReducer";
import {
  GET_MOVIES,
  DELETE_MOVIE,
  GET_ONE_MOVIE,
  PLACE_ORDER,
  GET_RENTED_MOVIES,
  GET_ONE_RENTED_MOVIE,
  RETURN_MOVIE,
  RENEW_MOVIE,
  SET_ONE_MOVIE,
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
    returnStatus: null,
    renewStatus: null,
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

  // Delete Movie
  const DeleteMovie = async (id) => {
    try {
      const res = await axios.get("/api/movies");

      dispatch({
        type: DELETE_MOVIE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: MOVIE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get one movie by _id
  const getOneMovieById = async (id) => {
    try {
      const res = await axios.get(`/api/movies/${id}`);

      dispatch({
        type: GET_ONE_MOVIE,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      dispatch({
        type: MOVIE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get one movie
  const getOneMovieByName = async (title) => {
    try {
      const res = await axios.get(`/api/movies/name/${title}`);

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
        payload: err.response.data.msg,
      });
    }
  };

  // Clear rental Details
  const clearRentalDetails = () => {
    dispatch({
      type: MOVIE_ERROR,
    });
  };

  // Return a movie
  const returnMovie = async (id) => {
    try {
      const res = await axios.get(`/api/return/${id}`);

      dispatch({ type: RETURN_MOVIE, payload: res.data.msg });
    } catch (err) {
      dispatch({
        type: MOVIE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Renew Due Date
  const renewMovie = async (id) => {
    try {
      const res = await axios.get(`/api/return/renew/${id}`);

      dispatch({ type: RENEW_MOVIE, payload: res.data.msg });
    } catch (err) {
      dispatch({
        type: MOVIE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Set one movie
  const setOneMovie = (movie) => {
    dispatch({ type: SET_ONE_MOVIE, payload: movie });
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
        returnStatus: state.returnStatus,
        renewStatus: state.renewStatus,
        error: state.error,
        getMovies,
        DeleteMovie,
        getOneMovieById,
        getOneMovieByName,
        placeOrder,
        getRentedMovies,
        getOneRentedMovie,
        clearRentalDetails,
        returnMovie,
        renewMovie,
        setOneMovie,
        clearErrors,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
