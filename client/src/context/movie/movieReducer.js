import {
  GET_MOVIES,
  GET_ONE_MOVIE,
  PLACE_ORDER,
  GET_RENTED_MOVIES,
  GET_ONE_RENTED_MOVIE,
  MOVIE_ERROR,
  CLEAR_ERRORS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };
    case GET_ONE_MOVIE:
      return {
        ...state,
        oneMovie: action.payload,
        loading: false,
      };
    case PLACE_ORDER:
      return {
        ...state,
        rentDetails: action.payload,
        loading: false,
      };
    case GET_RENTED_MOVIES:
      return {
        ...state,
        rentedMovies: action.payload,
        loading: false,
      };
    case GET_ONE_RENTED_MOVIE:
      return {
        ...state,
        oneRentedMovie: action.payload,
        loading: false,
      };
    case MOVIE_ERROR:
      return {
        ...state,
        error: action.payload,
        rentDetails: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
