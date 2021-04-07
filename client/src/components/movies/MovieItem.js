import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ movie }) => {
  const { Title, Poster, Plot, imdbRating } = movie;

  const baseURL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="movie">
      <div className="movie-image">
        <img src={Poster} />
        <div className="movie-overview">
          <h3>Overview</h3>
          <p>{Plot}</p>
        </div>
      </div>
      <div className="movie-info">
        <h4>
          <Link className="link-style" to={`/movies/${Title}`}>
            {Title}
          </Link>
        </h4>
        <span>{imdbRating}</span>
      </div>
    </div>
  );
};

export default MovieItem;
