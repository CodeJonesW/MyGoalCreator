import React, { useState } from "react";
import {
  Box,
  Card,
  List,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import GoalItem from "./GoalItem";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/slices/profileSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ViewGoals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { goals } = useSelector((state) => state.profileSlice);
  const { token } = useSelector((state) => state.authSlice);

  const [open, setOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);

  const handleShowGoal = async (goal_id) => {
    navigate(`/goal/${goal_id}`);
  };

  const handleDeleteGoal = async () => {
    if (!goalToDelete) return;

    try {
      await fetch("/api/goal/deleteGoal", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          goal_id: goalToDelete,
        }),
      });
    } catch (error) {
      console.error("Failed to delete goal", error);
    }

    dispatch(getProfile({ token, setLatestGoal: false }));

    setOpen(false);
    setGoalToDelete(null);
  };

  const handleOpenDeleteDialog = (goal_id) => {
    setGoalToDelete(goal_id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setGoalToDelete(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Box sx={{ padding: "24px" }}>
        <Box className="main">
          <Card
            style={{
              padding: "20px",
              borderRadius: "16px",
              maxWidth: "300px",
            }}
          >
            <h2>Goals Research</h2>
            <List>
              {goals.length > 0 ? (
                goals.map((goal, index) => (
                  <GoalItem
                    key={index}
                    goal={goal}
                    index={index}
                    handleShowGoal={handleShowGoal}
                    handleOpenDeleteDialog={handleOpenDeleteDialog}
                  />
                ))
              ) : (
                <p>No goals available</p>
              )}
            </List>
          </Card>

          <Dialog
            sx={{ borderRadius: "16px" }}
            open={open}
            onClose={handleCloseDialog}
          >
            <DialogTitle>Delete Goal</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this goal? This action cannot be
                undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button
                variant="outlined"
                onClick={handleDeleteGoal}
                color="error"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ViewGoals;
