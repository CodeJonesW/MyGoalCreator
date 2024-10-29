import React from "react";
import { Box } from "@mui/material";
import NavBar from "../NavBar";
import ViewGoals from "./ViewGoals";
import { useTheme } from "@mui/material/styles";

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
