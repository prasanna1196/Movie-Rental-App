import React, { Fragment, useEffect, useState, useContext } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

import MovieContext from "../../context/movie/movieContext";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const MovieDetails = ({ match, history }) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const movieContext = useContext(MovieContext);

  const { isAuthenticated, prevLocation, redirectUser } = authContext;
  const { setAlert } = alertContext;
  const { oneMovie, loading, getOneMovie } = movieContext;

  const [info, setInfo] = useState({
    clientLoading: true,
    details: null,
  });

  const { clientLoading, details } = info;

  const getMovieDetails = async () => {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=e96c9482&t=${match.params.title}`
    );

    await getOneMovie(response.data.Title);

    setInfo({ clientLoading: false, details: response.data });

    // console.log(oneMovie);
  };

  const onClick = () => {
    if (isAuthenticated) {
      history.push("/");
    } else {
      setAlert("Please login to proceed", "warning");
      history.push("/login");
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <div className="movie-details">
      {
        (!clientLoading && !loading && oneMovie.name !== null,
        details !== null ? (
          <Fragment>
            <div className="flex-row">
              <div className="movie-poster">
                <img style={{ width: "100%" }} src={`${details.Poster}`} />
              </div>
              <div className="detail-info">
                <div className="flex-row">
                  <h1>{details.Title}</h1>
                </div>
                <div className="sub-text">
                  <p>{details.Year}</p>
                  <p>{details.Genre}</p>
                  <p>{details.Runtime}</p>
                  <p style={{ border: "none" }}>{details.Language}</p>
                </div>
                <div className="movie-plot">
                  <p>{details.Plot}</p>
                </div>
                <div className="movie-credits">
                  <div className="credit-item">
                    <p className="key">Director: </p>
                    <p>{details.Director}</p>
                  </div>
                  <div className="credit-item">
                    <p className="key">Writers: </p>
                    <p>{details.Writer}</p>
                  </div>
                  <div className="credit-item">
                    <p className="key">Starcast: </p>
                    <p>{details.Actors}</p>
                  </div>
                  <div className="movie-availability">
                    <h3>Availability</h3>
                    <div className="flex-row">
                      <div className="credit-item">
                        <p className="quality">UltraHD (4k):</p>
                        <p className="quantity">{oneMovie.uhd}</p>
                      </div>
                      <div className="credit-item">
                        <p className="quality">Blu-ray:</p>
                        <p className="quantity">{oneMovie.fhd}</p>
                      </div>
                      <div className="credit-item">
                        <p className="quality">DVD:</p>
                        <p className="quantity">{oneMovie.dvd}</p>
                      </div>
                    </div>
                  </div>
                  <div className="rent-button">
                    <Button
                      style={{ marginTop: "10px" }}
                      variant="contained"
                      color="primary"
                      onClick={onClick}
                    >
                      <ShoppingCart />
                      <p style={{ padding: "0 30px" }}>Rent Now</p>
                    </Button>
                  </div>
                </div>
                <div>
                  <h2>Ratings and Reviews</h2>
                  <div className="credit-item">
                    <p className="key">IMDb: </p>
                    {details.imdbRating !== "N/A" ? (
                      <p>{details.imdbRating}/10</p>
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                  <div className="credit-item">
                    <p className="key">Rotten Tomatoes: </p>
                    {details.Ratings[1].Value ? (
                      <p>{details.Ratings[1].Value}</p>
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                  <div className="credit-item">
                    <p className="key">Metacritic: </p>
                    {details.Metascore !== "N/A" ? (
                      <p>{details.Metascore}/100</p>
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          <div>clientLoading...</div>
        ))
      }
    </div>
  );
};

export default MovieDetails;
