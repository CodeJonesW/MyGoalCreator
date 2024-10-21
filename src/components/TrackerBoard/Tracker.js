import React, { useEffect, useState } from "react";
import { DndContext, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";
import { Board } from "./Board";
import { NavBar } from "../index.js";
import { useSelector, useDispatch } from "react-redux";
import { getTrackedGoal } from "../../redux/slices/goalSlice";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Tracker = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    trackedGoalItems,
    trackedGoalId,
    trackedGoalStep,
    trackedGoalTimelineName,
    isTrackedGoalLastStep,
  } = useSelector((state) => state.goalSlice);
  const { token } = useSelector((state) => state.authSlice);

  const [board, setBoard] = useState({
    columns: [
      {
        id: "todo",
        title: "To Do",
        tasks: [],
      },
      {
        id: "in-progress",
        title: "In Progress",
        tasks: [],
      },
      {
        id: "done",
        title: "Done",
        tasks: [],
      },
    ],
  });

  const handleForwardStep = () => {
    console.log("FORWARD STEP", trackedGoalStep, trackedGoalId);
    dispatch(
      getTrackedGoal({
        token,
        goal_id: trackedGoalId,
        step: parseInt(trackedGoalStep) + 1,
      })
    );
  };

  const handleBackStep = () => {
    console.log("BACK STEP", trackedGoalStep, trackedGoalId);
    dispatch(
      getTrackedGoal({
        token,
        goal_id: trackedGoalId,
        step: parseInt(trackedGoalStep) - 1,
      })
    );
  };

  useEffect(() => {
    if (trackedGoalItems) {
      setBoard({
        columns: [
          {
            id: "todo",
            title: "To Do",
            tasks: trackedGoalItems.map((planItem) => ({
              id: planItem.plan_item_id,
              description: planItem.description,
            })),
          },
          {
            id: "in-progress",
            title: "In Progress",
            tasks: [],
          },
          {
            id: "done",
            title: "Done",
            tasks: [],
          },
        ],
      });
    }
  }, [trackedGoalItems]);

  // Handle the drag end event
  const handleDragEnd = (event) => {
    console.log("DRAG END", event);
    const { active, over } = event;
    if (!over) return;

    const sourceColumnId = active.data.current.columnId;
    const destinationColumnId = over.id;

    if (sourceColumnId === destinationColumnId) return;

    // Find the source and destination columns
    const sourceColumn = board.columns.find((col) => col.id === sourceColumnId);
    const destinationColumn = board.columns.find(
      (col) => col.id === destinationColumnId
    );
    const task = sourceColumn.tasks.find((task) => task.id === active.id);

    // Remove task from the source column
    const updatedSourceTasks = sourceColumn.tasks.filter(
      (t) => t.id !== active.id
    );
    // Add task to the destination column
    const updatedDestinationTasks = [...destinationColumn.tasks, task];

    // Update columns
    const updatedColumns = board.columns.map((col) => {
      if (col.id === sourceColumnId) {
        return { ...col, tasks: updatedSourceTasks };
      } else if (col.id === destinationColumnId) {
        return { ...col, tasks: updatedDestinationTasks };
      }
      return col;
    });
    console.log("UPDATED COLUMNS", updatedColumns);

    setBoard({ columns: updatedColumns });
  };

  // Set up the sensors for drag detection
  const sensors = useSensors(useSensor(MouseSensor));

  return (
    <Box
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
      {/* forward and back button  */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
          padding: "24px",
        }}
      >
        <Box>
          <Button
            sx={{ display: parseInt(trackedGoalStep) === 0 ? "none" : "block" }}
            onClick={handleBackStep}
            variant="outlined"
            color="secondary"
          >
            Back
          </Button>
        </Box>

        <Typography variant={"h5"} color="secondary">
          {trackedGoalTimelineName}
        </Typography>
        <Box>
          <Button
            sx={{ display: isTrackedGoalLastStep ? "none" : "block" }}
            variant="outlined"
            color="secondary"
            onClick={handleForwardStep}
          >
            Forward
          </Button>
        </Box>
      </Box>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Board board={board} />
      </DndContext>
    </Box>
  );
};

export default Tracker;
