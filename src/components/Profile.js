import React from "react";
import { Button, Box } from "@mui/material";

const Profile = ({ user, isShowingGoals, showGoals, showGoalCreator }) => {
  if (!user) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <Box className="profile-card">
      <h3>Profile</h3>
      <Box className="profile-info-row">
        <strong>Username:</strong> <span>{user.email}</span>
      </Box>
      <Box className="profile-info-row">
        <strong>Remaining Goal Requests:</strong>{" "}
        <span>{user.analyze_requests}</span>
      </Box>
      {!isShowingGoals ? (
        <Box className="profile-info-row">
          <span>
            <Button
              style={{ marginTop: "16px", maxWidth: "144px" }}
              className="primary-button"
              onClick={showGoals}
              variant="contained"
            >
              View Goals
            </Button>
          </span>
        </Box>
      ) : (
        <Box className="profile-info-row">
          <span>
            <Button
              style={{ marginTop: "16px", maxWidth: "144px" }}
              className="primary-button"
              onClick={showGoalCreator}
              variant="contained"
            >
              Create Goal
            </Button>
          </span>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
