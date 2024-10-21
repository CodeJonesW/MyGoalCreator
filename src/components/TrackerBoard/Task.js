import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

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
    <Box ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Typography variant="p">{task.description}</Typography>
    </Box>
  );
};
