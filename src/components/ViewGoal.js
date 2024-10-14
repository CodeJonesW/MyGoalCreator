import React, { useState, useEffect } from "react";
import Results from "./Results";
import TrackGoalButton from "./TrackGoalButton";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import axios from "axios";
import {
  // analyzeSubGoal,
  clearSubGoal,
  clearGoal,
} from "../redux/slices/goalSlice";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { NavBar } from "./index.js";

const ViewGoal = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authSlice);
  const { goal } = useSelector((state) => state.goalSlice);
  const { recentGoal } = useSelector((state) => state.profileSlice);
  const [showSubGoalResults, setShowSubGoalResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState("");
  const [, setBuffer] = useState("");

  useEffect(() => {
    if (result) {
      setShowSubGoalResults(true);
    } else {
      setShowSubGoalResults(false);
    }
  }, [result]);

  useEffect(() => {
    return () => {
      dispatch(clearSubGoal());
      dispatch(clearGoal());
    };
  }, [dispatch]);

  const onLineClick = (lineNumber, text) => {
    const goal_id = goal ? goal.goal_id : recentGoal.goal_id;
    handleAnalyzeSubGoal(goal_id, text, lineNumber);
  };

  const handleAnalyzeSubGoal = (goal_id, text, lineNumber) => {
    setResult("");
    setBuffer("");
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      const eventSource = new EventSource(
        `/api/subgoalv2?goal_id=${encodeURIComponent(
          goal_id
        )}&text=${encodeURIComponent(text)}&lineNumber=${encodeURIComponent(
          lineNumber
        )}&token=${encodeURIComponent(token)}`
      );

      eventSource.onmessage = (event) => {
        let newChunk = event.data;
        try {
          const parsed = JSON.parse(newChunk);
          if (parsed.message === "success") {
            setResult(parsed.subGoal.plan);
            setLoading(false);
            return;
          }
        } catch (error) {}
        if (newChunk === "event: done") {
          return;
        }

        setBuffer((prevBuffer) => {
          let updatedBuffer = prevBuffer + (newChunk === "" ? "\n" : newChunk);

          const lines = updatedBuffer.split("\n");

          let completeContent = "";
          let remainingBuffer = "";

          lines.forEach((line, index) => {
            if (/^\s*#{1,6}\s/.test(line) || /^\s*[-*]\s/.test(line)) {
              if (index === lines.length - 1) {
                remainingBuffer = line;
              } else {
                completeContent += line + "\n";
              }
            } else {
              if (index === lines.length - 1) {
                remainingBuffer = line;
              } else {
                completeContent += line + "\n";
              }
            }
          });

          setResult((prevResult) => prevResult + completeContent);

          return remainingBuffer || "";
        });
      };

      eventSource.onerror = (error) => {
        console.error("Error during analysis:", error);
        eventSource.close();
        setBuffer((prevBuffer) => {
          if (prevBuffer) {
            setResult((prevResult) => prevResult + prevBuffer);
          }
          return "";
        });
        setLoading(false);
      };

      eventSource.addEventListener("close", () => {
        setBuffer((prevBuffer) => {
          if (prevBuffer) {
            setResult((prevResult) => prevResult + prevBuffer);
          }
          return "";
        });
      });
    } catch (error) {
      console.error("Error during analysis:", error);
    }
  };

  const handleClearSubGoal = () => {
    setResult("");
  };

  const handleTrackGoal = async () => {
    await axios.post(
      "/api/trackgoal",
      {
        goal_id: goal.goal_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const variants = {
    hidden: { x: "100vw", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: "-100vw", opacity: 0, transition: { duration: 0.5 } },
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
          {!result ? (
            <motion.div
              variants={variants}
              initial="visible"
              animate={showSubGoalResults ? "exit" : "visible"}
              exit="exit"
            >
              <Results
                onLineClick={onLineClick}
                result={goal ? goal?.plan : recentGoal?.plan}
                isSubGoal={false}
              />
            </motion.div>
          ) : null}

          {result ? (
            <motion.div
              variants={variants}
              initial="hidden"
              animate={showSubGoalResults ? "visible" : "hidden"}
              exit="exit"
            >
              <Results
                back={!loading ? handleClearSubGoal : null}
                onLineClick={onLineClick}
                result={result}
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
