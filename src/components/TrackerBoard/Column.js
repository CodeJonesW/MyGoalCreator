// Column.js
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Task } from "./Task";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export const Column = ({
  column,
  isVisible,
  currentColumn,
  index,
  handleUpdateStatus,
}) => {
  const theme = useTheme();
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const variants = {
    hidden: { opacity: 0, x: index < currentColumn ? -100 : 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: index < currentColumn ? 100 : -100 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={setNodeRef}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            margin: "0 10px",
            padding: "10px",
            border: "1px solid #ccc",
            width: "300px",
            borderRadius: "16px",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            scrollSnapAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {column.title}
          </Typography>
          {column.tasks.map((task) => (
            <Task
              handleUpdateStatus={handleUpdateStatus}
              key={task.id}
              task={task}
              columnId={column.id}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
