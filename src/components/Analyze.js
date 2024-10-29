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
        console.log("EVENT", event);
        let newChunk = event.data;
        console.log("newChunk is empty string", newChunk === "");
        if (newChunk === "event: done") {
          return;
        }
        setResult((prevResult) => {
          console.log("newChunk is empty string", newChunk === "");
          console.log("newChunk is a space", newChunk === " ");
          console.log("newChunk is newline", newChunk === "\n");
          console.log("newChunk", newChunk);

          const lines = newChunk.split("\n");
          console.log("lines", lines);

          return prevResult + newChunk;
        });

        // setBuffer((prevBuffer) => {
        //   if (prevBuffer === "" && newChunk === "") {
        //     let updatedBuffer = prevBuffer + "\n";
        //     setResult((prevResult) => prevResult + updatedBuffer);
        //     return "";
        //   }

        //   let updatedBuffer =
        //     prevBuffer +
        //     (newChunk === "" || newChunk === "\n" ? "\n" : newChunk);

        //   console.log("updatedBuffer", updatedBuffer);

        //   const lines = updatedBuffer.split("\n");

        //   let completeContent = "";
        //   let remainingBuffer = "";

        //   lines.forEach((line, index) => {
        //     if (index === lines.length - 1) {
        //       remainingBuffer = line + "\n";
        //     } else {
        //       if (line !== "\n") {
        //         completeContent += line + "\n";
        //       } else {
        //         completeContent += line;
        //       }
        //     }
        //   });

        //   console.log("completeContent", completeContent);
        //   console.log("remainingBuffer", remainingBuffer);

        //   setResult((prevResult) => prevResult + completeContent);

        //   return remainingBuffer || "";
        // });
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
