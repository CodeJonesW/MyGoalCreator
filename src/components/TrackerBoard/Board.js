import React from "react";
import { Column } from "./Column";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const Board = ({ board }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        padding: "24px",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          alignItems: "center",
          padding: "4px",
        },
        [theme.breakpoints.up("md")]: {
          justifyContent: "center",
          padding: "24px",
        },
      }}
    >
      {board.columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </Box>
  );
};
