import { Button, Paper } from "@material-ui/core";
import React from "react";

import TotalStats from "./TotalStats";

const AdminHome = () => {
  return (
    <div>
      <div className="dashboard-title">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="admin-dashboard">
        <TotalStats />
      </div>

      <div className="admin-dashboard">
        <div style={{ width: "25%" }}>
          <Paper>
            <h2 style={{ marginLeft: "22%" }}>Approve Returns</h2>
            <p>Pending: 15</p>
            <Button style={{ backgroundColor: "#0F495C" }} color="secondary">
              Approve
            </Button>
          </Paper>
        </div>
        <div style={{ width: "25%" }}>
          <Paper>
            <h2>This weeks</h2>
          </Paper>
        </div>
        <div style={{ width: "25%" }}>
          <Paper>
            <h2>Movie Library</h2>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
