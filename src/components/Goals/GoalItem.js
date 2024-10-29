import React, { useState } from "react";
import {
  Box,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import ExpandIcon from "@mui/icons-material/Expand";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";

const GoalItem = ({ goal, index, handleShowGoal, handleOpenDeleteDialog }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [subGoalsExpanded, setSubGoalsExpanded] = useState(false);

  const toggleSubGoals = () => {
    setSubGoalsExpanded(!subGoalsExpanded);
  };

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
                sx={{
                  color: theme.palette.primary.contrastText,
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
                }}
                onClick={toggleSubGoals}
              >
                {!subGoalsExpanded ? <ExpandIcon /> : <UnfoldLessIcon />}
              </IconButton>
            </ListItemIcon>
          ) : null}
          <ListItemIcon>
            <IconButton
              onClick={() => handleShowGoal(goal.goal_id)}
              sx={{
                color: theme.palette.primary.contrastText,
              }}
            >
              <ArticleIcon />
            </IconButton>
          </ListItemIcon>

          <ListItemText
            sx={{ textWrap: "wrap" }}
            onClick={() => handleShowGoal(goal.goal_id)}
            primary={goal.goal_name}
          />
        </ListItem>
        <IconButton
          onClick={() => handleOpenDeleteDialog(goal.goal_id)}
          sx={{
            marginLeft: "8px",
            color: theme.palette.secondary.contrastText,
          }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
      {goal.subgoals.length > 0 && subGoalsExpanded
        ? goal.subgoals.map((subgoal, index) => (
            <Box key={index} sx={{ paddingLeft: "20px" }}>
              <GoalItem
                goal={subgoal}
                index={index}
                handleShowGoal={handleShowGoal}
                handleOpenDeleteDialog={handleOpenDeleteDialog}
              />
            </Box>
          ))
        : null}
    </Box>
  );
};
export default GoalItem;
