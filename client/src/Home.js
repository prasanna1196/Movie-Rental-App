import React, { useContext } from "react";
import Movies from "./components/movies/Movies";
import AdminHome from "./components/admin/AdminHome";

import AuthContext from "./context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  const { isAdmin, loading } = authContext;

  return <div>{isAdmin && !loading ? <AdminHome /> : <Movies />}</div>;
};

export default Home;
