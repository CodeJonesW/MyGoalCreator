import React from "react";
import { Box, Card, Button, List, ListItem } from "@mui/material";
import Results from "./Results";
import { useSelector, useDispatch } from "react-redux";
import { getGoal, clearGoal } from "../redux/slices/goalSlice";
import { useTheme } from "@mui/material/styles";

const Goals = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { goals } = useSelector((state) => state.profileSlice);
  const { token } = useSelector((state) => state.authSlice);
  const { goal } = useSelector((state) => state.goalSlice);

  const handleShowGoal = async (goalId) => {
    dispatch(getGoal({ token, goalId }));
  };

  const handleClearGoal = () => {
    dispatch(clearGoal());
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
      <Box sx={{ padding: "24px" }}>
        {goal ? (
          <Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "24px",
              }}
            >
              <Button
                onClick={handleClearGoal}
                variant="contained"
                color="secondary"
              >
                View All Goals
              </Button>
            </Box>
            <Results result={goal.plan} />
          </Box>
        ) : (
          <Card style={{ padding: "24px" }}>
            <h2>My Goals</h2>
            <List>
              {goals.length > 0 ? (
                goals.map((goal, index) => (
                  <ListItem
                    color="primary"
                    onClick={() => handleShowGoal(goal.GoalId)}
                    key={index}
                  >
                    {goal.goal_name}
                  </ListItem>
                ))
              ) : (
                <p>No goals available</p>
              )}
            </List>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default Goals;
