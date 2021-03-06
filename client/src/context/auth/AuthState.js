import React, { useReducer } from "react";
import axios from "axios";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import setAuthToken from "../setAuthToken";
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

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isAdmin: false,
    loading: true,
    user: null,
    prevLocation: "/",
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
        const res = await axios.get("/api/auth");

        if (res.data.role === "admin") {
          dispatch({ type: ADMIN_LOADED, payload: res.data });
        } else {
          dispatch({ type: USER_LOADED, payload: res.data });
        }
      }
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post("api/users", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post("api/auth", formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //Logout
  const logout = () => dispatch({ type: LOGOUT });

  //Redirect User
  const redirectUser = (location) =>
    dispatch({ type: REDIRECT_USER, payload: location });

  // Clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
        loading: state.loading,
        user: state.user,
        prevLocation: state.prevLocation,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        redirectUser,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
