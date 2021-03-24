import React, { useEffect, useState } from "react";
import recharts from "recharts";
import axios from "axios";

import NumberCounter from "./NumberCounter";

const TotalStats = () => {
  let isMounted = true;

  const [stats, setStats] = useState({
    users: null,
    movies: null,
    rentals: null,
  });

  const getStats = async () => {
    const users = await axios.get("/api/stats/users");
    const movies = await axios.get("/api/stats/movies");
    const rentals = await axios.get("/api/stats/rentals");

    if (isMounted) {
      setStats({
        users: users.data,
        movies: movies.data,
        rentals: rentals.data,
      });
    }
  };

  const { users, movies, rentals } = stats;

  useEffect(() => {
    getStats();

    return () => (isMounted = false);
  }, []);

  return (
    <div>
      {users && movies && rentals ? (
        <div className="flex-row-sa">
          <div className="total-stats-item">
            <div>
              <i className="circular inverted blue users huge icon"></i>
            </div>

            <div className="total-stats-item-data">
              <h2>Users</h2>
              <NumberCounter value={users} />
            </div>
          </div>
          <div className="total-stats-item">
            <div>
              <i className="circular inverted orange film huge icon"></i>
            </div>

            <div className="total-stats-item-data">
              <h2>Movies</h2>
              <NumberCounter value={movies} />
            </div>
          </div>
          <div className="total-stats-item">
            <div>
              <i className="circular inverted green  shopping cart huge icon"></i>
            </div>

            <div className="total-stats-item-data">
              <h2>Rentals</h2>
              <NumberCounter value={rentals} />
            </div>
          </div>
        </div>
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
};

export default TotalStats;
