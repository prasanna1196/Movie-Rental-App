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
      return {
        ...state,
        movies: state.movies.filter((movie) => movie._id !== action.payload),
        loading: false,
      };
    case CLEAR_MOVIES:
      return {
        ...state,
        movies: null,
        filtered: null,
        error: null,
        current: null,
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
    case FILTER_MOVIES:
      return {
        ...state,
        filtered: state.movies.filter((movie) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return movie.name.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case MOVIE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
