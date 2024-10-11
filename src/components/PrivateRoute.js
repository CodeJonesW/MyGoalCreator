import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAuthToken } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

function PrivateRoute({ element }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authSlice);

  return token ? element : <Navigate to="/welcome" />;
}

export default PrivateRoute;
