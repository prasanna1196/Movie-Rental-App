import React from "react";

const MovieItem = ({ movie }) => {
  const { title, release_date, poster_path, overview, vote_average } = movie;

  const baseURL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="movie">
      <div className="movie-image">
        <img src={`${baseURL}${poster_path}`} />
        <div className="movie-overview">
          <h3>Overview</h3>
          <p>{overview}</p>
        </div>
      </div>
      <div className="movie-info">
        <h4>{title}</h4>
        <span>{vote_average}</span>
      </div>
    </div>
  );
};

export default MovieItem;
