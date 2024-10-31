import React, { useState, useEffect, useRef } from "react";
import InputForm from "./InputForm";
import Loading from "./Loading";
import Results from "./Results";
import ViewGoals from "./Goals/ViewGoals";
import { getProfile } from "../redux/slices/profileSlice";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Analyze = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstRender = useRef(true);
  const { loading: isProfileLoading, goals } = useSelector(
    (state) => state.profileSlice
  );
  const { token } = useSelector((state) => state.authSlice);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [buffer, setBuffer] = useState(null);

  if (isProfileLoading) {
    return <Loading />;
  }

  const handleAnalyze = async (goalName, areaOfFocus, timeline) => {
    setLoading(true);
    setResult("");
    setBuffer("");
    const result = await axios.post(
      "/api/goal/createGoal",
      { goalName, areaOfFocus, timeline },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const goal_id = result.data.goal_id;
    try {
      const token = localStorage.getItem("authToken");
      const eventSource = new EventSource(
        `/api/goal/streamGoal?goal_id=${encodeURIComponent(
          goal_id
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
      {!result ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <InputForm loading={loading} onSubmit={handleAnalyze} />
          <Box sx={{ paddingTop: "16px" }} />

          {goals.length > 0 ? <ViewGoals /> : null}
        </Box>
      ) : null}
      {result ? (
        <Box sx={{ paddingTop: "16px" }}>
          <Results
            isLoading={loading}
            back={null}
            result={result}
            lineClickDisabled={true}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default Analyze;
