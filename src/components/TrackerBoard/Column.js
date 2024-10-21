import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Task } from "./Task";
import { useTheme } from "@mui/material/styles";

export const Column = ({ column }) => {
  const theme = useTheme();
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  console.log("COLUMN", column);
  return (
    <div
      ref={setNodeRef}
      style={{
        margin: "0 10px",
        padding: "10px",
        border: "1px solid #ccc",
        width: "200px",
        borderRadius: "16px",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      <h2>{column.title}</h2>
      {column.tasks.map((task) => (
        <Task key={task.id} task={task} columnId={column.id} />
      ))}
    </div>
  );
};
