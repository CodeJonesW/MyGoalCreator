import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ element }) {
  const { token } = useSelector((state) => state.authSlice);

  return token ? element : <Navigate to="/welcome" />;
}

export default PrivateRoute;
