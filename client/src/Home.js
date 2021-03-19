import React, { useContext } from "react";
import Movies from "./components/movies/Movies";
import AdminHome from "./components/admin/AdminHome";

import AuthContext from "./context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  const { isAdmin, loading, isAuthenticated } = authContext;

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>{isAdmin && !isAuthenticated ? <AdminHome /> : <Movies />}</div>
      )}
    </div>
  );
};

export default Home;
