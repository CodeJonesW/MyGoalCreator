import React, { useState, useEffect, useRef } from "react";
import InputForm from "./InputForm";
import Loading from "./Loading";
import Results from "./Results";
import { getProfile } from "../redux/slices/profileSlice";
import { useDispatch } from "react-redux";
import { Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Analyze = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstRender = useRef(true);
  const { loading: isProfileLoading, showUiHelp } = useSelector(
    (state) => state.profileSlice
  );
  const { token } = useSelector((state) => state.authSlice);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [buffer, setBuffer] = useState(null);

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

  const handleAnalyze = async (goalName, areaOfFocus, timeline) => {
    setLoading(true);
    setResult("");
    setBuffer("");
    console.log("creating goal", goalName, areaOfFocus, timeline);
    const result = await axios.post(
      "/api/createGoal",
      { goalName, areaOfFocus, timeline },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const goal_id = result.data.goal_id;

    try {
      const token = localStorage.getItem("authToken");

      const eventSource = new EventSource(
        `/api/analyze?goal_id=${encodeURIComponent(
          goal_id
        )}&token=${encodeURIComponent(token)}`
      );

      eventSource.onmessage = (event) => {
        let newChunk = event.data;
        console.log("newChunk is empty string", newChunk === "");
        console.log("newChunk is a space", newChunk === " ");
        if (newChunk === "event: done") {
          return;
        }
        setResult((prevResult) => {
          console.log("prevResult", prevResult);
          console.log("newChunk", newChunk);

          if (newChunk === " " && buffer === " ") {
            setBuffer(null);
            return prevResult + "\n";
          } else {
            if (newChunk === "") {
              setBuffer(" ");
            }
            return prevResult + newChunk;
          }
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
        navigate("/goal/" + goal_id);
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
        <Results
          isLoading={loading}
          back={null}
          result={result}
          lineClickDisabled={true}
        />
      ) : null}
    </Box>
  );
};

export default Analyze;
