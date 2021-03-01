import React, { useReducer, useState } from "react";
import axios from "axios";
import MovieContext from "./movieContext";
import movieReducer from "./movieReducer";
import {
  GET_MOVIES,
  ADD_MOVIE,
  DELETE_MOVIE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_MOVIE,
  FILTER_MOVIES,
  CLEAR_FILTER,
  MOVIE_ERROR,
  CLEAR_MOVIES,
} from "../types";

const MovieState = (props) => {
  const initialState = {
    movies: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(movieReducer, initialState);

  //Get Movies
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

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getMovies,
        // addContact,
        // deleteContact,
        // clearContacts,
        // setCurrent,
        // clearCurrent,
        // updateContact,
        // filterContacts,
        // clearFilter,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
