import React from "react";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import { useDispatch } from "react-redux";
import { getProfile } from "../redux/slices/profileSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { user } = useSelector((state) => state.profileSlice);
  const { token } = useSelector((state) => state.authSlice);

  const handleGoToCreateGoal = () => {
    navigate("/");
  };

  const handleNavigateToGoals = () => {
    dispatch(getProfile({ token, setLatestGoal: false }));
    navigate("/goals");
  };

  if (!user) {
    return (
      <Box
        className="main"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          background: theme.palette.primary.main,
        }}
      >
        <NavBar />
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
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
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          background: theme.palette.primary.main,
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
            width: "300px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
          >
            Profile
          </Typography>
          <Box>
            <Typography>{user.email}</Typography>
          </Box>

          <Box>
            <Typography>
              Remaining Goal Requests: {user.analyze_requests}
            </Typography>
          </Box>
          <Box>
            <span>
              <Button
                style={{ marginTop: "16px", maxWidth: "144px" }}
                onClick={handleNavigateToGoals}
                variant="contained"
              >
                View Goals
              </Button>
            </span>
          </Box>
          <Box>
            <span>
              <Button
                style={{ marginTop: "16px", maxWidth: "144px" }}
                onClick={handleGoToCreateGoal}
                variant="contained"
              >
                Create Goal
              </Button>
            </span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
