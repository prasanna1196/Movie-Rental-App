import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import ApproveReturnItem from "./ApproveReturnItem";
import MovieContext from "../../../context/movie/movieContext";
import { CircularProgress } from "@material-ui/core";

const ApproveReturns = () => {
  const movieContext = useContext(MovieContext);

  const { movies, getReturns } = movieContext;

  const [orders, setOrders] = useState(null);

  const getOrders = async () => {
    let details = [];

    for (let order of movies) {
      let detail = {};
      const rental = await axios.get(`/api/rent/one/${order.orderID}`);

      const movie = await axios.get(`/api/movies/${rental.data.movie}`);

      const user = await axios.get(`/api/users/${rental.data.user}`);

      detail.returnId = order._id;
      detail.rental = rental.data;
      detail.movie = movie.data;
      detail.user = user.data;
      details = [...details, detail];
    }
    setOrders(details);
  };

  useEffect(() => {
    getReturns();
  }, []);

  useEffect(() => {
    if (movies) {
      getOrders();
    }
  }, [movies]);

  return (
    <div style={{ padding: "25px 30px", width: "100%", margin: "0 auto" }}>
      <h1>Approve Returns</h1>
      {orders ? (
        <div>
          {orders.map((order) => (
            <ApproveReturnItem key={order.returnId} order={order} />
          ))}
        </div>
      ) : (
        <div className="flex-row sa">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default ApproveReturns;
