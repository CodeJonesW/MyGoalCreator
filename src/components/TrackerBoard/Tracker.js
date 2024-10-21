import React, { useEffect, useState } from "react";
import { DndContext, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";
import { Board } from "./Board";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Tracker = () => {
  const theme = useTheme();
  const { trackedGoal } = useSelector((state) => state.goalSlice);
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

  useEffect(() => {
    if (trackedGoal) {
      setBoard({
        columns: [
          {
            id: "todo",
            title: "To Do",
            tasks: trackedGoal.map((planItem) => ({
              id: planItem.plan_item_id,
              title: planItem.description,
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
  }, [trackedGoal]);

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
        backgroundColor: theme.palette.background.default,
        height: "100vh",
        width: "100vw",
        padding: "20px",
      }}
    >
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Board board={board} />
      </DndContext>
    </Box>
  );
};

export default Tracker;
