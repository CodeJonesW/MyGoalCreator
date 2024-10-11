import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import "./App.css";
import { Analyze, NavBar } from "./components/index.js";
import { getProfile } from "./redux/slices/profileSlice.js";
import { clearAuthToken, getAuthToken } from "./redux/slices/authSlice.js";
import { useTheme } from "@mui/material/styles";

const App = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authSlice);
  const { user, goals } = useSelector((state) => state.profileSlice);
  const [showGoals, setShowGoals] = useState(false);

  useEffect(() => {
    dispatch(getAuthToken());
  }, [dispatch]);

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
