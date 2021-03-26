import React from "react";

import MovieForm from "./MovieForm";
import MovieList from "./MovieList";

const AddMovies = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "30px",
        position: "relative",
      }}
    >
      <MovieForm />
      <MovieList />
    </div>
  );
};

export default AddMovies;
