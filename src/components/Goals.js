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
import { getProfile } from "../redux/slices/profileSlice";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import ExpandIcon from "@mui/icons-material/Expand";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";

const Goals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { goals } = useSelector((state) => state.profileSlice);
  const { token } = useSelector((state) => state.authSlice);

  const [open, setOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);

  const handleShowGoal = async (goal_id) => {
    // dispatch(getGoal({ token, goal_id }));
    navigate(`/goal/${goal_id}`);
  };

  const handleDeleteGoal = async () => {
    if (!goalToDelete) return;

    try {
      await fetch("/api/deletegoal", {
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
                  handleOpenDeleteDialog={handleOpenDeleteDialog}
                />
              ))
            ) : (
              <p>No goals available</p>
            )}
          </List>
        </Card>
      </Box>

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

const GoalItem = ({ goal, index, handleShowGoal, handleOpenDeleteDialog }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [subGoalsExpanded, setSubGoalsExpanded] = useState(false);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ListItem
          key={index}
          sx={{
            cursor: "pointer",
          }}
        >
          {goal.isGoalTracked ? (
            <ListItemIcon>
              <IconButton
                onClick={() => navigate(`/tracker/${goal.goal_id}`)}
                className="icon-button"
                sx={{
                  color: theme.palette.primary.contrastText,
                  display: "inline-flex",
                  transition: "display 0.3s",
                }}
              >
                <TrackChangesIcon />
              </IconButton>
            </ListItemIcon>
          ) : null}
          {goal.subgoals.length > 0 ? (
            <ListItemIcon>
              <IconButton
                sx={{
                  color: theme.palette.primary.contrastText,
                  display: "inline-flex",
                  transition: "display 0.3s",
                }}
                onClick={() => setSubGoalsExpanded(!subGoalsExpanded)}
              >
                {!subGoalsExpanded ? <ExpandIcon /> : <UnfoldLessIcon />}
              </IconButton>
            </ListItemIcon>
          ) : null}
          <ListItemIcon>
            <IconButton
              onClick={() => handleShowGoal(goal.goal_id)}
              className="icon-button"
              sx={{
                color: theme.palette.primary.contrastText,
                display: "inline-flex",
                transition: "display 0.3s",
              }}
            >
              <ArticleIcon />
            </IconButton>
          </ListItemIcon>

          <ListItemText
            onClick={() => handleShowGoal(goal.goal_id)}
            primary={goal.goal_name}
          />
        </ListItem>
        <IconButton
          onClick={() => handleOpenDeleteDialog(goal.goal_id)}
          sx={{
            display: "inline-flex",
            marginLeft: "8px",
            color: theme.palette.secondary.contrastText,
          }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
      {goal.subgoals.length > 0 && subGoalsExpanded
        ? goal.subgoals.map((subgoal, index) => (
            <ListItem
              sx={{
                marginLeft: goal.isGoalTracked ? "112px" : "56px",
                cursor: "pointer",
              }}
              key={index}
            >
              <ListItemIcon>
                <IconButton
                  onClick={() => handleShowGoal(subgoal.goal_id)}
                  className="icon-button"
                  sx={{
                    color: theme.palette.primary.contrastText,
                    display: "inline-flex",
                    transition: "display 0.3s",
                  }}
                >
                  <ArticleIcon />
                </IconButton>
              </ListItemIcon>
              <ListItemText
                onClick={() => handleShowGoal(subgoal.goal_id)}
                primary={subgoal.goal_name}
              />
            </ListItem>
          ))
        : null}
    </Box>
  );
};

export default Goals;
