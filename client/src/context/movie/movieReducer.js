import { GET_MOVIES, GET_ONE_MOVIE, PLACE_ORDER, MOVIE_ERROR } from "../types";

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
