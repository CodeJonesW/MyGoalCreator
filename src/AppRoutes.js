import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "./redux/slices/profileSlice";
import {
  Profile,
  Login,
  LandingPage,
  Register,
  PrivateRoute,
  Goals,
} from "./components/index.js";
import App from "./App.js";

function AppRoutes() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authSlice);

  useEffect(() => {
    if (token) {
      dispatch(getProfile(token));
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<LandingPage />} />
        <Route path="/" element={<PrivateRoute element={<App />} />} />
        <Route path="/goals" element={<PrivateRoute element={<Goals />} />} />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} />}
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
