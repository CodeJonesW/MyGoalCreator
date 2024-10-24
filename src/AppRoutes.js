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
  ViewGoal,
  ViewGoalV2,
  Tracker,
  TermsOfService,
  PrivacyPolicy,
} from "./components/index.js";
import App from "./App.js";

function AppRoutes() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authSlice);

  useEffect(() => {
    if (token) {
      dispatch(getProfile({ token: token, setLatestGoal: false }));
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<LandingPage />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/" element={<PrivateRoute element={<App />} />} />
        <Route path="/goals" element={<PrivateRoute element={<Goals />} />} />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} />}
        />
        <Route
          path="/goal/:goal_id"
          element={<PrivateRoute element={<ViewGoalV2 />} />}
        />
        <Route
          path="/tracker/:goal_id"
          element={<PrivateRoute element={<Tracker />} />}
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
