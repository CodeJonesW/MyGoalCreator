import React, { useState } from "react";
import {
  Box,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import NavBar from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import { getGoal } from "../redux/slices/goalSlice";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Goals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { goals } = useSelector((state) => state.profileSlice);
  const { token } = useSelector((state) => state.authSlice);

  const handleShowGoal = async (goal_id) => {
    dispatch(getGoal({ token, goal_id }));
    navigate("/goal");
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
        <Card style={{ padding: "24px" }}>
          <h2>My Goals</h2>
          <List>
            {goals.length > 0 ? (
              goals.map((goal, index) => (
                <GoalItem
                  goal={goal}
                  index={index}
                  handleShowGoal={handleShowGoal}
                />
              ))
            ) : (
              <p>No goals available</p>
            )}
          </List>
        </Card>
      </Box>
    </Box>
  );
};

const GoalItem = ({ goal, index, handleShowGoal }) => {
  const [hover, setHover] = useState(false);

  return (
    <ListItem
      key={index}
      onClick={() => handleShowGoal(goal.goal_id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        cursor: "pointer",
        backgroundColor: hover ? "rgba(0, 0, 0, 0.1)" : "transparent",
        transition: "background-color 0.3s", // Smooth transition
        "&:hover .icon-button": {
          display: "inline-flex", // Show icon on hover
        },
      }}
    >
      <ListItemText primary={goal.goal_name} />
      <ListItemIcon>
        <IconButton
          className="icon-button"
          sx={{
            display: hover ? "inline-flex" : "none", // Only show icon on hover
            transition: "display 0.3s",
          }}
        >
          <VisibilityIcon />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
};

export default Goals;
