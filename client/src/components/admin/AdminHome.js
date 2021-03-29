import { Button, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import TotalStats from "./stats/TotalStats";

const AdminHome = () => {
  const [graphData, setGraphData] = useState(null);
  const getData = async () => {
    const res = await axios.get("/api/stats/graph");
    console.log(res.data);

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
        <div style={{ width: "25%" }}>
          <Paper>
            <h2 style={{ marginLeft: "22%" }}>Approve Returns</h2>
            <p>Pending: 15</p>
            <Button style={{ backgroundColor: "#0F495C" }} color="secondary">
              <Link to="/admin/addMovies">addMovies</Link>
            </Button>
          </Paper>
        </div>
        {graphData && (
          <div style={{ width: "50%", backgroundColor: "white" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
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
                {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                <Line type="monotone" dataKey="count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
