import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { Button, Paper, IconButton } from "@material-ui/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";

import TotalStats from "./stats/TotalStats";
import { Add } from "@material-ui/icons";

const AdminHome = () => {
  const [graphData, setGraphData] = useState(null);
  const getData = async () => {
    const res = await axios.get("/api/stats/graph");

    setGraphData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="dashboard-title">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="total-stats">
        <TotalStats />
      </div>

      <div className="admin-dashboard">
        {graphData && (
          <Paper
            style={{
              minWidth: "400px",
              width: "50%",
              backgroundColor: "white",
              padding: "0 0 20px",
            }}
          >
            <div className="flex-row sb">
              <h1 style={{ margin: "10px 20px" }}>Rentals</h1>
              <div>
                <p style={{ margin: "10px 20px" }}>
                  {`${DateTime.now().monthLong} ${DateTime.now().year}`}
                </p>
                <p style={{ margin: "10px 20px" }}>Total: 7</p>
              </div>
            </div>
            <ResponsiveContainer width={"90%"} height={300}>
              <BarChart
                data={graphData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        )}
        <div
          className="flex-column sa"
          style={{ width: "25%", padding: "30px, 0" }}
        >
          <Paper
            className="flex-column sa ace"
            style={{ minWidth: "200px", minHeight: "300px", padding: "20px" }}
          >
            <h1>Approve Returns</h1>
            <h2>Pending: 15</h2>
            <Button style={{ backgroundColor: "#0F495C", width: "70%" }}>
              <Link
                style={{ textDecoration: "none", color: "#ADFF2F" }}
                to="/admin/addMovies"
              >
                APPROVE
              </Link>
            </Button>
          </Paper>
        </div>
      </div>

      <IconButton
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          borderRadius: "100px",
          backgroundColor: "teal",
          width: "70px",
          height: "70px",
          marginRight: "10px",
          boxShadow: "10px",
        }}
      >
        <Link style={{ paddingTop: "5px" }} to="/admin/addMovies">
          <Add style={{ width: "auto", height: "50px", color: "white" }}></Add>
        </Link>
      </IconButton>
    </div>
  );
};

export default AdminHome;
