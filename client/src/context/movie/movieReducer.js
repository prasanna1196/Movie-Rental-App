import {
  GET_MOVIES,
  ADD_MOVIE,
  UPDATE_MOVIE,
  DELETE_MOVIE,
  GET_ONE_MOVIE,
  PLACE_ORDER,
  GET_RENTED_MOVIES,
  GET_ONE_RENTED_MOVIE,
  RETURN_MOVIE,
  RENEW_MOVIE,
  APPROVE_RETURN,
  DECLINE_RETURN,
  SET_CURRENT,
  CLEAR_CURRENT,
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
    case ADD_MOVIE:
      return {
        ...state,
        movies: [action.payload, ...state.movies],
        loading: false,
      };
    case UPDATE_MOVIE:
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie._id === action.payload._id ? action.payload : movie
        ),
        loading: false,
      };
    case DELETE_MOVIE:
    case APPROVE_RETURN:
    case DECLINE_RETURN:
      return {
        ...state,
        movies: state.movies.filter((movie) => movie._id !== action.payload),

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
    case RETURN_MOVIE:
      return {
        ...state,
        returnStatus: action.payload,
        loading: false,
      };
    case RENEW_MOVIE:
      return {
        ...state,
        renewStatus: action.payload,
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
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
        returnStatus: null,
        renewStatus: null,
        error: null,
      };
    default:
      return state;
  }
};
