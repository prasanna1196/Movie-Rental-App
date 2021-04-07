import React, { useContext } from "react";
import Alert from "@material-ui/lab/Alert";
import AlertContext from "../../context/alert/alertContext";

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <Alert
        key={alert.id}
        variant="filled"
        severity={alert.type}
        style={{
          top: "80px",
          left: "30%",
          width: "40%",
          position: "fixed",
        }}
      >
        {alert.msg}
      </Alert>
    ))
  );
};

export default Alerts;
