import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box } from "@mui/material";
import "./App.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  LandingPage,
  Register,
  Login,
  Analyze,
  Goals,
  NavBar,
} from "./components/index.js";
import { getProfile } from "./redux/slices/profileSlice.js";
import { clearAuthToken, getAuthToken } from "./redux/slices/authSlice.js";
import { useTheme } from "@mui/material/styles";

const App = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authSlice);
  const { user, goals } = useSelector((state) => state.profileSlice);
  const [showGoals, setShowGoals] = useState(false);
  const [displayComponent, setDisplayComponent] = useState("welcome");

  useEffect(() => {
    if (token) {
      try {
        dispatch(getProfile(token));
        setDisplayComponent("analyze");
      } catch (error) {
        setDisplayComponent("welcome");
        dispatch(clearAuthToken());
      }
    }
  }, [token, dispatch]);

  useEffect(() => {
    dispatch(getAuthToken());
  }, [dispatch]);

  const handleShowGoals = () => {
    setShowGoals(true);
  };

  const handleShowGoalCreator = () => {
    setShowGoals(false);
  };

  const handleLogout = () => {
    setDisplayComponent("welcome");
    dispatch(clearAuthToken());
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        className="main"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          overflow: "scroll",
          background: theme.palette.primary.main,
        }}
      >
        <Box style={{ width: "100%", paddingBottom: "24px" }}>
          <NavBar />
        </Box>
        <Analyze />
      </Box>
    </Box>
  );
};

export default App;
