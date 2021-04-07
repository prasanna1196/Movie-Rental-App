import React, { useEffect, useContext, useState } from "react";

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
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";

const PlaceOrder = ({ match, history }) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const movieContext = useContext(MovieContext);

  const { isAuthenticated, loadUser, user } = authContext;

  const { setAlert } = alertContext;

  const {
    oneMovie,
    loading,
    getOneMovieByName,
    placeOrder,
    rentDetails,
    error,
    clearErrors,
  } = movieContext;

  const [info, setInfo] = useState({
    clientLoading: true,
    details: null,
  });

  const { clientLoading, details } = info;

  const getMovieDetails = async () => {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=e96c9482&t=${match.params.title}`
    );

    let response = await res.json();

    await getOneMovieByName(response.Title);

    setInfo({ clientLoading: false, details: response });

    // console.log(oneMovie);
  };

  useEffect(() => {
    loadUser();
    getMovieDetails();

    if (error) {
      setAlert(error, "error");
      console.log(error);
      clearErrors();
    }
  }, [error, isAuthenticated]);

  // useEffect(() => {
  //   if (user !== null) {
  //     setOrder({
  //       ...order,
  //       quality: "dvd",
  //       address: user.address,
  //       setDefaultAddress: true,
  //       amount: 50,
  //     });
  //     console.log(user.address);
  //   }
  // }, [user]);

  const initialOrder = {
    quality: "dvd",
    address: user.address,
    setDefaultAddress: true,
    amount: 50,
  };

  const [order, setOrder] = useState(initialOrder);
  const [addressError, setAddressError] = useState({});

  const { quality, address, setDefaultAddress, amount } = order;

  const setAmount = (quality) => {
    if (quality === "uhd") setOrder({ ...order, amount: 100 });
    if (quality === "fhd") setOrder({ ...order, amount: 70 });
    if (quality === "dvd") setOrder({ ...order, amount: 50 });
  };

  const validate = (fieldValues = order) => {
    let temp = { ...addressError };

    if ("address" in order)
      temp.address =
        fieldValues.address.length > 10
          ? ""
          : "Address should be atleast 10 characters long";

    setAddressError({
      ...temp,
    });

    if (fieldValues == order) {
      return Object.values(temp).every((x) => x == "");
    }
  };

  const onChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });

    // For simultanious form validation
    if (e.target.name !== "quality") {
      validate({ [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    validate(order);
    if (validate()) {
      placeOrder({
        movie: details.Title,
        quality,
        address,
        setDefaultAddress,
      });
    }
    console.log(order);
  };

  useEffect(() => {
    if (rentDetails) {
      // if (rentDetails._id) {
      console.log(typeof rentDetails._id);
      history.push(`/orderConfirmation/${rentDetails._id}`);
      // }
    }
  }, [rentDetails]);

  useEffect(() => {
    setAmount(quality);
  }, [quality]);

  return (
    <div>
      {!loading && !clientLoading && user !== null && details !== null ? (
        <div className="order-page">
          <Paper style={{ padding: "20px" }}>
            <h1>Product details</h1>
            <div className="product-details">
              <div className="movie-poster">
                <img style={{ width: "100%" }} src={`${details.Poster}`} />
              </div>
              <div>
                <h2>
                  {oneMovie.name} ({details.Year})
                </h2>
                <div className="movie-credits">
                  <div className="credit-item">
                    <p className="key">Director: </p>
                    <p>{details.Director}</p>
                  </div>
                  <div className="credit-item">
                    <p className="key">Language: </p>
                    <p>{details.Language}</p>
                  </div>
                  <div className="credit-item">
                    <p className="key">Genre: </p>
                    <p>{details.Genre}</p>
                  </div>
                  <div className="credit-item">
                    <p className="key">Runtime: </p>
                    <p>{details.Runtime}</p>
                  </div>
                  <div className="credit-item star-cast">
                    <p className="key">Starcast: </p>
                    <p style={{ maxWidth: "350px" }}>{details.Actors}</p>
                  </div>
                </div>
                <div style={{ marginTop: "50px" }}>
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
                </div>
              </div>
            </div>
          </Paper>
          <div className="order-details">
            <form autoComplete="off" onSubmit={onSubmit}>
              <Paper elevation={5} style={{ padding: "20px" }}>
                <h1>Order Details</h1>
                <div className="billing-details">
                  <div className="movie-credits">
                    <div className="credit-item">
                      <p className="key">Name: </p>
                      <p>
                        {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                      </p>
                    </div>
                    <div className="credit-item">
                      <p className="key">Email: </p>
                      <p>{user.email}</p>
                    </div>
                    <div className="credit-item">
                      <p className="key">Phone: </p>
                      <p>{user.phone}</p>
                    </div>
                  </div>
                  <TextField
                    variant="outlined"
                    multiline
                    color="primary"
                    name="address"
                    label="Address"
                    value={address}
                    onChange={onChange}
                    error={addressError.address ? true : false}
                    helperText={addressError.address}
                  />
                  <div>
                    <FormControl>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="setDefaultAddress"
                            color={"primary"}
                            checked={order.setDefaultAddress}
                            onChange={(e) =>
                              setOrder({
                                ...order,
                                setDefaultAddress: !setDefaultAddress,
                              })
                            }
                          />
                        }
                        label="Set as Default Address"
                      />
                    </FormControl>
                  </div>
                  <div className="flex-row">
                    <h2>Amount: </h2>
                    <h2>{" " + amount}</h2>
                  </div>

                  <div style={{ margin: "10px 25px" }}>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      type="submit"
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              </Paper>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-row sa">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
