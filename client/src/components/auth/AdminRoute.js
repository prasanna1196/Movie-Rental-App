import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAdmin, loading } = authContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <div>loading..</div>
        ) : isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
