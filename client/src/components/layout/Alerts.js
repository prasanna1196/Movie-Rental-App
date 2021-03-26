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
          margin: "80px auto 0px",
          width: "40%",
        }}
      >
        {alert.msg}
      </Alert>
    ))
  );
};

export default Alerts;
