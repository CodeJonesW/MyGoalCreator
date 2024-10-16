import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

function PrivateRoute({ element }) {
  const { token, loading: authLoading } = useSelector(
    (state) => state.authSlice
  );
  const { loading: profileLoading } = useSelector(
    (state) => state.profileSlice
  );

  if (authLoading) {
    return <Loading />;
  }

  if (profileLoading) {
    return <Loading />;
  }

  return token ? element : <Navigate to="/welcome" />;
}

export default PrivateRoute;
