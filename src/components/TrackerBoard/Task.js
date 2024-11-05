import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const Task = ({ task, columnId, handleUpdateStatus }) => {
  console.log("Task", handleUpdateStatus);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
    position: "relative",
  };

  const handleMenuOpen = (event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent the drag event from starting
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMoveToInProgress = () => {
    handleUpdateStatus(task.id, columnId, "in-progress");
    console.log("Task 112", handleUpdateStatus);
    handleMenuClose();
  };

  const handleMoveToDone = () => {
    handleUpdateStatus(task.id, columnId, "done");
    handleMenuClose();
  };

  const handleMoveToTodo = () => {
    handleUpdateStatus(task.id, columnId, "todo");
    handleMenuClose();
  };
  console.log("task", task);

  const lines = task.description.split("\n");

  return (
    <Box style={style}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ flex: 1, cursor: "pointer" }}
          ref={setNodeRef}
          {...listeners}
          {...attributes}
        >
          <Typography>{task.name}</Typography>
          {/* <Typography variant="body1" sx={{ paddingRight: "10px" }}>
            - {task.description}
          </Typography> */}
          {lines.map((line, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{ paddingRight: "10px" }}
            >
              {line[0] === "-" ? "" : "- "}
              {line}
            </Typography>
          ))}
        </Box>

        <IconButton
          aria-label="more"
          aria-controls="task-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          size="small"
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Menu
        id="task-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "task-menu-button",
        }}
      >
        {columnId !== "todo" ? (
          <MenuItem onClick={handleMoveToTodo}>Move to Todo</MenuItem>
        ) : null}

        {columnId !== "in-progress" ? (
          <MenuItem onClick={handleMoveToInProgress}>
            Move to In Progress
          </MenuItem>
        ) : null}

        {columnId !== "done" ? (
          <MenuItem onClick={handleMoveToDone}>Move to Done</MenuItem>
        ) : null}
      </Menu>
    </Box>
  );
};
