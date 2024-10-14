import React, { useState, useEffect } from "react";
import Results from "./Results";
import TrackGoalButton from "./TrackGoalButton";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import axios from "axios";
import {
  analyzeSubGoal,
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
  const { subGoal, goal } = useSelector((state) => state.goalSlice);
  const { recentGoal } = useSelector((state) => state.profileSlice);
  const [showSubGoalResults, setShowSubGoalResults] = useState(false);

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [buffer, setBuffer] = useState("");

  useEffect(() => {
    console.log("Result updated:", result);
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
    const dispatchData = { token, text, lineNumber, goal_id };
    // dispatch(analyzeSubGoal(dispatchData));
    handleAnalyzeSubGoal(
      goal ? goal.goal_id : recentGoal.goal_id,
      text,
      lineNumber
    );
  };

  const handleAnalyzeSubGoal = (goal_id, text, lineNumber) => {
    setLoading(true);
    setResult("");
    setBuffer("");

    try {
      const token = localStorage.getItem("authToken");

      // Open EventSource connection with query parameters
      const eventSource = new EventSource(
        `/api/subgoalv2?goal_id=${encodeURIComponent(
          goal_id
        )}&text=${encodeURIComponent(text)}&lineNumber=${encodeURIComponent(
          lineNumber
        )}&token=${encodeURIComponent(token)}`
      );

      // Listen for streaming results
      eventSource.onmessage = (event) => {
        let newChunk = event.data;
        console.log("Received chunk in UI:", newChunk);
        try {
          const parsed = JSON.parse(newChunk);
          console.log("Parsed JSON in UI:", parsed);
          if (parsed.message === "success") {
            setResult(parsed.subGoal.plan);
            return;
          }
        } catch (error) {
          // console.error("Error parsing JSON in fn:", error);
        }
        if (newChunk === "event: done") {
          return;
        }

        // Concatenate incoming markdown chunks and immediately update the result incrementally
        setBuffer((prevBuffer) => {
          let updatedBuffer = prevBuffer + (newChunk === "" ? "\n" : newChunk);

          // Split lines to handle bullet points and headings
          const lines = updatedBuffer.split("\n");

          let completeContent = ""; // To accumulate complete lines
          let remainingBuffer = ""; // To store incomplete markdown

          lines.forEach((line, index) => {
            // Check if a line starts with a markdown heading or bullet point
            if (/^\s*#{1,6}\s/.test(line) || /^\s*[-*]\s/.test(line)) {
              // If it's a heading or bullet point, ensure it starts cleanly
              if (index === lines.length - 1) {
                remainingBuffer = line; // Incomplete line stays in buffer
              } else {
                completeContent += line + "\n"; // Add complete line to content
              }
            } else {
              // For non-heading and non-bullet lines, handle normally
              if (index === lines.length - 1) {
                remainingBuffer = line; // Incomplete line stays in buffer
              } else {
                completeContent += line + "\n";
              }
            }
          });

          // Update the result with the complete content
          setResult((prevResult) => prevResult + completeContent);

          // Return the remaining incomplete buffer for the next chunk
          return remainingBuffer || "";
        });
      };

      // Handle stream closing or errors
      eventSource.onerror = (error) => {
        console.error("Error during analysis:", error);
        console.log(buffer);
        eventSource.close();
        setBuffer((prevBuffer) => {
          // console.log("Final buffer:", prevBuffer);
          if (prevBuffer) {
            setResult((prevResult) => prevResult + prevBuffer);
          }
          return ""; // Clear buffer
        });
        setLoading(false);
      };

      eventSource.onopen = () => {
        // console.log("SSE connection opened.");
      };
      // Close the stream naturally when done
      eventSource.addEventListener("close", () => {
        // If there's any remaining data in the buffer, add it to the result
        setBuffer((prevBuffer) => {
          // console.log("Final buffer:", prevBuffer);
          if (prevBuffer) {
            setResult((prevResult) => prevResult + prevBuffer);
          }
          return ""; // Clear buffer
        });
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during analysis:", error);
    }
  };

  const handleClearSubGoal = () => {
    dispatch(clearSubGoal());
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
                back={() => setResult("")}
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
