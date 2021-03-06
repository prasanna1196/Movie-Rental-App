import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  ADMIN_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REDIRECT_USER,
  CLEAR_ERRORS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: false,
        loading: false,
        user: action.payload,
      };
    case ADMIN_LOADED:
      return {
        ...state,
        isAuthenticated: false,
        isAdmin: true,
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      //For both of the above cases
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:

    case LOGOUT:
      //Same for all of the above cases
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isAdmin: false,
        loading: false,
        user: null,
        error: action.payload,
        prevLocation: "/",
      };
    case AUTH_ERROR:
      return {
        ...state,
      };
    case REDIRECT_USER:
      return {
        ...state,
        prevLocation: action.payload,
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
