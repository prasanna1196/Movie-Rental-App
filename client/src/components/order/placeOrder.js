import React, { useEffect, useContext, useState } from "react";
import axios from "axios";

import MovieContext from "../../context/movie/movieContext";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import {
  Button,
  TextField,
  Paper,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@material-ui/core";

const PlaceOrder = ({ match, history }) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const movieContext = useContext(MovieContext);

  const {
    isAuthenticated,
    loadUser,
    prevLocation,
    redirectUser,
    user,
  } = authContext;
  const { setAlert } = alertContext;
  const { oneMovie, loading, getOneMovie, placeOrder, error } = movieContext;

  const [info, setInfo] = useState({
    clientLoading: true,
    details: null,
  });

  const { clientLoading, details } = info;

  const getMovieDetails = async () => {
    await loadUser();

    const res = await fetch(
      `http://www.omdbapi.com/?apikey=e96c9482&t=${match.params.title}`
    );

    let response = await res.json();

    await getOneMovie(response.Title);

    setInfo({ clientLoading: false, details: response });

    // console.log(oneMovie);
  };

  const initialOrder = {
    quality: "dvd",
    address: "",
    setDefaultAddress: true,
  };

  const [order, setOrder] = useState(initialOrder);

  const { quality, address, setDefaultAddress } = order;

  const onChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });

    // For simultanious form validation
    // validate({ [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    placeOrder({
      movie: details.Title,
      quality,
      address,
      setDefaultAddress,
    });
    console.log(order);
  };

  useEffect(() => {
    if (error) {
      setAlert(error, "error");
    }
    getMovieDetails();
    // console.log(isAuthenticated);
  }, [isAuthenticated, error]);

  return (
    <div>
      {!loading && !clientLoading && user !== null && details !== null ? (
        <div className="order-page">
          <div>
            <h1>Place Order</h1>
            <h2>{oneMovie.name}</h2>
            <div className="movie-poster">
              <img style={{ width: "100%" }} src={`${details.Poster}`} />
            </div>
          </div>
          <div className="order-details">
            <form autoComplete="off" onSubmit={onSubmit}>
              <h2>Select quality</h2>
              <FormControl>
                <RadioGroup
                  row
                  name="quality"
                  value={quality}
                  onChange={onChange}
                >
                  <FormControlLabel
                    value="uhd"
                    control={<Radio />}
                    label="UHD"
                  />
                  <FormControlLabel
                    value="fhd"
                    control={<Radio />}
                    label="FHD"
                  />
                  <FormControlLabel
                    value="dvd"
                    control={<Radio />}
                    label="DVD"
                  />
                </RadioGroup>
              </FormControl>
              <h2>address</h2>
              <TextField
                variant="outlined"
                name="address"
                label="Address"
                value={address}
                onChange={onChange}
              />
              <Button
                variant="contained"
                size="large"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div>loading..</div>
      )}
    </div>
  );
};

export default PlaceOrder;
