import React, { useState, useEffect } from "react";
import Results from "./Results";
import TrackGoalButton from "./TrackGoalButton";
import BackButton from "./BackButton";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button } from "@mui/material";
import {
  analyzeSubGoal,
  clearSubGoal,
  clearGoal,
} from "../redux/slices/goalSlice";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { NavBar } from "./index.js";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const ViewGoal = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authSlice);
  const { subGoal, goal } = useSelector((state) => state.goalSlice);
  const { recentGoal } = useSelector((state) => state.profileSlice);
  const [showSubGoalResults, setShowSubGoalResults] = useState(false);

  useEffect(() => {
    if (subGoal) {
      setShowSubGoalResults(true);
    } else {
      setShowSubGoalResults(false);
    }
  }, [subGoal]);

  useEffect(() => {
    return () => {
      dispatch(clearSubGoal());
      dispatch(clearGoal());
    };
  }, [dispatch]);

  const onLineClick = (lineNumber, text) => {
    const goal_id = goal ? goal.goal_id : recentGoal.goal_id;
    const dispatchData = { token, text, lineNumber, goal_id };
    dispatch(analyzeSubGoal(dispatchData));
  };

  const handleClearSubGoal = () => {
    dispatch(clearSubGoal());
  };

  const handleViewAllGoals = () => {
    dispatch(clearGoal());
    navigate("/goals");
  };
  const handleTrackGoal = () => {
    console.log("Track Goal");
  };

  const variants = {
    hidden: { x: "100vw", opacity: 0 }, // Start off-screen to the right
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }, // Animate to the screen
    exit: { x: "-100vw", opacity: 0, transition: { duration: 0.5 } }, // Exit off-screen to the left
  };

  if (!goal && !recentGoal) {
    return <div>Loading...</div>;
  }

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

        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "80%",
            }}
          >
            <TrackGoalButton onClick={handleTrackGoal} />
          </Box>
          {!subGoal ? (
            <motion.div
              variants={variants}
              initial="visible"
              animate={showSubGoalResults ? "exit" : "visible"}
              exit="exit"
            >
              <Results
                back={null}
                onLineClick={onLineClick}
                result={goal ? goal?.plan : recentGoal?.plan}
                isSubGoal={false}
              />
            </motion.div>
          ) : null}

          {subGoal ? (
            <motion.div
              variants={variants}
              initial="hidden"
              animate={showSubGoalResults ? "visible" : "hidden"}
              exit="exit"
            >
              <Results
                back={handleClearSubGoal}
                onLineClick={onLineClick}
                result={subGoal.plan}
                isSubGoal={true}
              />
            </motion.div>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default ViewGoal;
