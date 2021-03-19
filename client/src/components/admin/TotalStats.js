import React, { useEffect, useState } from "react";
import recharts from "recharts";
import axios from "axios";

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
              blah
              {/* <i className="circular inverted teal power off huge icon"></i> */}
            </div>
            <div>{users}</div>
          </div>
        </div>
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
};

export default TotalStats;
