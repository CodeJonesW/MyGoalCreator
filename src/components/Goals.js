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
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getGoal } from "../redux/slices/goalSlice";
import { getProfile } from "../redux/slices/profileSlice";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Goals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { goals } = useSelector((state) => state.profileSlice);
  const { token } = useSelector((state) => state.authSlice);

  const [open, setOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);

  const handleShowGoal = async (goal_id) => {
    dispatch(getGoal({ token, goal_id }));
    navigate("/goal");
  };

  const handleDeleteGoal = async () => {
    if (!goalToDelete) return;

    console.log("DELETE GOAL", goalToDelete);
    const response = await fetch("/api/deletegoal", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        goal_id: goalToDelete,
      }),
    });

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
      <Box sx={{ padding: "24px" }}>
        <Card
          style={{ minWidth: "300px", padding: "24px", borderRadius: "16px" }}
        >
          <h2>My Goals</h2>
          <List>
            {goals.length > 0 ? (
              goals.map((goal, index) => (
                <GoalItem
                  goal={goal}
                  index={index}
                  handleShowGoal={handleShowGoal}
                  handleDeleteGoal={handleOpenDeleteDialog} // Pass the dialog handler here
                />
              ))
            ) : (
              <p>No goals available</p>
            )}
          </List>
        </Card>
      </Box>

      {/* Delete Confirmation Dialog */}
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
          <Button variant="outlined" onClick={handleDeleteGoal} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const GoalItem = ({ goal, index, handleShowGoal, handleDeleteGoal }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ListItem
        key={index}
        onClick={() => handleShowGoal(goal.goal_id)}
        sx={{
          cursor: "pointer",
          backgroundColor: "transparent",
          border: "1px solid",
          borderColor: theme.palette.primary.contrastText,
          transition: "background-color 0.3s",
          borderRadius: "16px",
        }}
      >
        <ListItemIcon>
          <IconButton
            className="icon-button"
            sx={{
              color: theme.palette.primary.contrastText,
              display: "inline-flex",
              transition: "display 0.3s",
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary={goal.goal_name} />
      </ListItem>
      <IconButton
        onClick={() => handleDeleteGoal(goal.goal_id)}
        sx={{
          display: "inline-flex",
          marginLeft: "8px",
          color: theme.palette.secondary.contrastText,
        }}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
};

export default Goals;
