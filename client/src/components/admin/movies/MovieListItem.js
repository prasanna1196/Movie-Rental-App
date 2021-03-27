import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import MovieContext from "../../../context/movie/movieContext";

const MovieListItem = ({ movie }) => {
  const movieContext = useContext(MovieContext);

  const { setCurrent, deleteMovie } = movieContext;

  const title = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    handleClose();
    console.log(movie._id);
    deleteMovie(movie._id);
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        backgroundColor: "white",
        marginBottom: "15px",
        paddingLeft: "15px",
        paddingBottom: "15px",
      }}
    >
      <div className="flex-row sb">
        <h2>{movie.name}</h2>
        <div>
          <IconButton onClick={() => setOpen(true)}>
            <Delete />
          </IconButton>
          <IconButton onClick={() => setCurrent(movie)}>
            <Edit />
          </IconButton>
        </div>
      </div>
      <div className="movie-credits-a flex-row-sa">
        <div className="flex-column sb">
          {/* <div className="credit-item-a">
            <p className="key">Director: </p>
            <p>{title(movie.director)}</p>
          </div> */}
          <div className="credit-item-a">
            <p className="key">Language: </p>
            <p>{title(movie.language)}</p>
          </div>
          {/* <div className="credit-item-a">
            <p className="key">Starcast: </p>
            <p>{title(movie.starCast[0])}</p>
          </div> */}
          <div>
            <Link
              style={{ textDecoration: "none", color: "#0F495C" }}
              to={`/movies/${movie.name}`}
            >
              <h3>Details...</h3>
            </Link>
          </div>
        </div>
        <div className="movie-availability-a">
          <h3>Availability</h3>
          <div className="flex-column">
            <div className="credit-item-a">
              <p className="quality">UltraHD (4k):</p>
              <p className="quantity">{movie.uhd}</p>
            </div>
            <div className="credit-item-a">
              <p className="quality">Blu-ray:</p>
              <p className="quantity">{movie.fhd}</p>
            </div>
            <div className="credit-item-a">
              <p className="quality">DVD:</p>
              <p className="quantity">{movie.dvd}</p>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {`Are you sure want to delete ${movie.name} ?`}
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button color="primary" onClick={handleDelete}>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieListItem;
