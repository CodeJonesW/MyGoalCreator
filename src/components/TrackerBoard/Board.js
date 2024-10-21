import React from "react";
import { Column } from "./Column";
import { useTheme } from "@mui/material/styles";

export const Board = ({ board }) => {
  const theme = useTheme();
  return (
    <div style={{ display: "flex" }}>
      {board.columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
};
