import React, { useState, useEffect, useRef } from "react";
import Results from "./Results";
import Loading from "./Loading";
import TrackGoalButton from "./TrackGoalButton";
import { useSelector, useDispatch } from "react-redux";
import { Box, Snackbar, Alert } from "@mui/material";
import { clearSubGoal, clearGoal, getGoal } from "../redux/slices/goalSlice";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { NavBar } from "./index.js";
import { useNavigate } from "react-router-dom";
import { BackButton } from "./index.js";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewGoal = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const { token } = useSelector((state) => state.authSlice);
  const { goal } = useSelector((state) => state.goalSlice);
  const { showUiHelp } = useSelector((state) => state.profileSlice);
  const [showSubGoalResults, setShowSubGoalResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [result, setResult] = useState("");
  const [, setBuffer] = useState("");
  const { goal_id } = useParams();
  console.log("ViewGoal.js goal_id", goal_id, goal);

  useEffect(() => {
    if (result) {
      setShowSubGoalResults(true);
    } else {
      setShowSubGoalResults(false);
    }
  }, [result]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      if (showUiHelp) {
        setOpenSnackbar(true);
      }
      return;
    }
  }, [showUiHelp]);

  useEffect(() => {
    return () => {
      dispatch(clearSubGoal());
      dispatch(clearGoal());
    };
  }, [dispatch]);

  useEffect(() => {
    console.log("ViewGoal.js useEffect");
    if (goal_id && !goal) {
      console.log("ViewGoal.js useEffect getGoal", goal_id);
      dispatch(getGoal({ token, goal_id }));
    }
  }, [dispatch, goal_id, token]);

  const onLineClick = (text) => {
    const goal_id = goal.goal_id;
    handleAnalyzeSubGoal(goal_id, text);
  };

  const handleAnalyzeSubGoal = (goal_id, text, lineNumber = 0) => {
    setResult("");
    setBuffer("");
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      const eventSource = new EventSource(
        `/api/subgoal?goal_id=${encodeURIComponent(
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
          if (prevBuffer === "" && newChunk === "") {
            let updatedBuffer = prevBuffer + "\n";
            setResult((prevResult) => prevResult + updatedBuffer);
            return "";
          }

          let updatedBuffer =
            prevBuffer +
            (newChunk === "" || newChunk === " " || newChunk === "\n"
              ? "\n"
              : newChunk);

          const lines = updatedBuffer.split("\n");

          let completeContent = "";
          let remainingBuffer = "";

          lines.forEach((line, index) => {
            if (index === lines.length - 1) {
              remainingBuffer = line;
            } else {
              if (line !== "\n") {
                completeContent += line + "\n";
              } else {
                completeContent += line;
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

  const handleClearGoal = () => {
    navigate("/goals");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
    navigate(`/tracker/${goal.goal_id}`);
  };

  const variants = {
    hidden: { x: "100vw", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: "-100vw", opacity: 0, transition: { duration: 0.5 } },
  };

  if (!goal) {
    return <Loading />;
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
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <Snackbar
              open={openSnackbar}
              autoHideDuration={4000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              variant="filled"
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity="info"
                sx={{ width: "100%" }}
              >
                Select a line of interest to learn more! 🚀
              </Alert>
            </Snackbar>
            {!loading ? (
              <BackButton
                onClick={!result ? handleClearGoal : handleClearSubGoal}
              />
            ) : null}
            <TrackGoalButton
              isGoalTracked={goal.isGoalTracked}
              onClick={handleTrackGoal}
            />
          </Box>
          {goal && !result ? (
            <motion.div
              variants={variants}
              initial="visible"
              animate={showSubGoalResults ? "exit" : "visible"}
              exit="exit"
            >
              <Results
                onLineClick={onLineClick}
                result={goal.plan}
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
