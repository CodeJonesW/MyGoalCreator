import React, { useState, useEffect, useRef } from "react";
import InputForm from "./InputForm";
import Loading from "./Loading";
import Results from "./Results";
import { getProfile } from "../redux/slices/profileSlice";
import { useDispatch } from "react-redux";
import { Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Analyze = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstRender = useRef(true);
  const { loading: isProfileLoading, showUiHelp } = useSelector(
    (state) => state.profileSlice
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [buffer, setBuffer] = useState("");

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      if (showUiHelp) {
        setOpenSnackbar(true);
      }
      return;
    }
  }, [showUiHelp]);

  if (isProfileLoading) {
    return <Loading />;
  }

  const handleAnalyze = (goal, prompt, timeline) => {
    setLoading(true);
    setResult("");
    setBuffer("");

    try {
      const token = localStorage.getItem("authToken");

      const eventSource = new EventSource(
        `/api/analyze?goal=${encodeURIComponent(
          goal
        )}&prompt=${encodeURIComponent(prompt)}&timeline=${encodeURIComponent(
          timeline
        )}&token=${encodeURIComponent(token)}`
      );

      eventSource.onmessage = (event) => {
        let newChunk = event.data;
        if (newChunk === "event: done") {
          return;
        }

        setBuffer((prevBuffer) => {
          let updatedBuffer =
            prevBuffer +
            (newChunk === "" || newChunk === "\n" ? "\n" : newChunk);

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
        console.log(buffer);
        eventSource.close();
        setBuffer((prevBuffer) => {
          if (prevBuffer) {
            setResult((prevResult) => prevResult + prevBuffer);
          }
          return "";
        });
        setLoading(false);
        dispatch(getProfile({ token: token, setLatestGoal: true }));
        navigate("/goal");
      };

      eventSource.addEventListener("close", () => {
        setBuffer((prevBuffer) => {
          if (prevBuffer) {
            setResult((prevResult) => prevResult + prevBuffer);
          }
          return "";
        });
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during analysis:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        variant="filled"
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="info"
          sx={{ width: "100%" }}
        >
          Welcome! Enter a goal to get started! 🎯
        </Alert>
      </Snackbar>
      {!result ? (
        <Box>
          <InputForm loading={loading} onSubmit={handleAnalyze} />
        </Box>
      ) : null}
      {result ? (
        <Results back={null} result={result} isSubGoal={false} />
      ) : null}
    </Box>
  );
};

export default Analyze;
