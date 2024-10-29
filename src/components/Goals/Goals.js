import React, { useState } from "react";
import { Box } from "@mui/material";
import NavBar from "../NavBar";
import GoalItem from "./GoalItem";
import ViewGoals from "./ViewGoals";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/slices/profileSlice";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Goals = () => {
  const theme = useTheme();

  return (
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
      <NavBar />
      <ViewGoals />
    </Box>
  );
};

export default Goals;
