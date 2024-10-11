import React, { useState, useEffect, useRef } from "react";
import InputForm from "./InputForm";
import Results from "./Results";
import { getProfile } from "../redux/slices/profileSlice";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";

const Analyze = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authSlice);
  const { recentGoal } = useSelector((state) => state.profileSlice);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [buffer, setBuffer] = useState("");
  const [refreshProfile, setRefreshProfile] = useState(false);
  const prevGoalIdRef = useRef(null);

  useEffect(() => {
    if (refreshProfile) {
      dispatch(getProfile(token));
      setRefreshProfile(false);
    }
  }, [refreshProfile, token, dispatch]);

  useEffect(() => {
    if (recentGoal && recentGoal.GoalId) {
      const prevGoalId = prevGoalIdRef.current;

      if (prevGoalId !== recentGoal.GoalId) {
        // GoalId has changed
        setResult(recentGoal.plan);
      }

      // Update the ref with the current GoalId
      prevGoalIdRef.current = recentGoal.GoalId;
    }
  }, [recentGoal]);

  const handleAnalyze = (goal, prompt, timeline) => {
    setLoading(true);
    setResult("");
    setBuffer("");

    try {
      const token = localStorage.getItem("authToken");

      // Open EventSource connection with query parameters
      const eventSource = new EventSource(
        `/api/analyze?goal=${encodeURIComponent(
          goal
        )}&prompt=${encodeURIComponent(prompt)}&timeline=${encodeURIComponent(
          timeline
        )}&token=${encodeURIComponent(token)}`
      );

      // Listen for streaming results
      eventSource.onmessage = (event) => {
        let newChunk = event.data;
        // console.log("Received chunk in UI:", newChunk);
        if (newChunk === "event: done") {
          // console.log("Analysis complete.");
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
        setLoading(false); // Stop loading when stream is done or errored
        setRefreshProfile(true);
      };

      eventSource.onopen = () => {
        // console.log("SSE connection opened.");
      };
      // Close the stream naturally when done
      eventSource.addEventListener("close", () => {
        // console.log("Stream closed");
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

  return (
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
      <Box>
        <InputForm loading={loading} onSubmit={handleAnalyze} />
      </Box>
      {result ? <Results result={result} /> : null}
    </Box>
  );
};

export default Analyze;
