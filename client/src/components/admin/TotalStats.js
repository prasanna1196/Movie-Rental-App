import React, { useEffect, useState } from "react";
import recharts from "recharts";
import axios from "axios";

const TotalStats = () => {
  const [stats, setStats] = useState({
    movies: null,
  });

  const getStats = async () => {
    const movies = await axios.get("/api/stats/movies");
    console.log(movies.data);
    setStats({ movies: movies.data });
  };

  useEffect(() => {
    getStats();
  }, []);

  return <div>{stats.movies ? <h1>{stats.movies}</h1> : <h1>loading</h1>}</div>;
};

export default TotalStats;
