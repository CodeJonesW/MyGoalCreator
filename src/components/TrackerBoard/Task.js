import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { useTheme } from "@mui/material/styles";

export const Task = ({ task, columnId }) => {
  const theme = useTheme();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { columnId },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: theme.palette.background.paper,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};
