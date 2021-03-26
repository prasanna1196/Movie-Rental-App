import React, { useContext } from "react";
import Movies from "./components/movies/Movies";
import AdminHome from "./components/admin/AdminHome";

import AuthContext from "./context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  const { isAdmin, loading, isAuthenticated } = authContext;

  return <div>{isAdmin ? <AdminHome /> : <Movies />}</div>;
};

export default Home;
