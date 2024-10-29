import React, { useState, useEffect, useRef } from "react";
import Results from "./Results.js";
import Loading from "./Loading.js";
// import TrackGoalButton from "./TrackGoalButton.js";
import { useSelector, useDispatch } from "react-redux";
import { Box, Snackbar, Alert } from "@mui/material";
import { clearSubGoal, clearGoal, getGoal } from "../redux/slices/goalSlice.js";
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
    if (goal_id) {
      setResult("");
      dispatch(getGoal({ token, goal_id }));
    }
  }, [dispatch, goal_id, token]);

  const onLineClick = (text) => {
    const goal_id = goal.goal_id;
    handleAnalyzeSubGoal(goal_id, text);
  };

  const handleAnalyzeSubGoal = async (parentGoalId, subGoalName) => {
    setResult("");
    setBuffer("");
    setLoading(true);

    try {
      const result = await axios.post(
        "/api/createSubGoal",
        { parentGoalId, subGoalName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (result.data.existed) {
        navigate(`/goal/${result.data.goal_id}`);
        setLoading(false);
        return;
      }

      const goalId = result.data.goal_id;

      const eventSource = new EventSource(
        `/api/subgoal?goalId=${encodeURIComponent(
          goalId
        )}&token=${encodeURIComponent(token)}`
      );

      eventSource.onmessage = (event) => {
        let newChunk = event.data;
        if (newChunk === "event: done") {
          return;
        }
        newChunk = newChunk.replace(/\[NEWLINE\]/g, "\n");
        setResult((prevResult) => {
          return prevResult + newChunk;
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
        navigate("/goal/" + goalId);
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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // const handleTrackGoal = async () => {
  //   await axios.post(
  //     "/api/trackgoal",
  //     {
  //       goal_id: goal.goal_id,
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   navigate(`/tracker/${goal.goal_id}`);
  // };

  const variants = {
    hidden: { x: "100vw", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: "-100vw", opacity: 0, transition: { duration: 0.5 } },
  };

  const pageVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
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
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          style={{ width: "100%" }}
        >
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
              {!loading ? <BackButton onClick={() => navigate(-1)} /> : null}
              {/* {!loading && !goal.parent_goal_id ? (
                <TrackGoalButton
                  isGoalTracked={goal.isGoalTracked}
                  onClick={handleTrackGoal}
                />
              ) : null} */}
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
                  lineClickDisabled={goal.depth >= 4}
                  isLoading={loading}
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
                  lineClickDisabled={true}
                  isLoading={loading}
                />
              </motion.div>
            ) : null}
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ViewGoal;
