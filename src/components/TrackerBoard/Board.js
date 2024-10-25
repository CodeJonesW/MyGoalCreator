import React, { useEffect, useState } from "react";
import { Column } from "./Column";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";

export const Board = ({ board, handleUpdateStatus }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentColumn, setCurrentColumn] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState("left");

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    if (direction === "left" && currentColumn < board.columns.length - 1) {
      setCurrentColumn((prev) => prev + 1);
    } else if (direction === "right" && currentColumn > 0) {
      setCurrentColumn((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const handleTouchStart = (e) => {
      setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
      if (!touchStartX) return;
      const touchEndX = e.touches[0].clientX;
      const diffX = touchStartX - touchEndX;

      if (diffX > 50) {
        handleSwipe("left");
        setTouchStartX(null);
      } else if (diffX < -50) {
        handleSwipe("right");
        setTouchStartX(null);
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [currentColumn, touchStartX, handleSwipe]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "row" : "row",
        width: "100%",
        overflow: isSmallScreen ? "hidden" : "auto",
        position: "relative",
        padding: isSmallScreen ? "0" : "24px",
      }}
    >
      {isSmallScreen ? (
        <AnimatePresence>
          <motion.div
            key={currentColumn}
            initial={{ opacity: 0, x: swipeDirection === "left" ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: swipeDirection === "left" ? -100 : 100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              width: "100%",
              flexShrink: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Column
              column={board.columns[currentColumn]}
              isVisible={true}
              currentColumn={currentColumn}
              index={currentColumn}
              handleUpdateStatus={handleUpdateStatus}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        board.columns.map((column, index) => (
          <Column
            key={column.id}
            column={column}
            isVisible={true}
            currentColumn={currentColumn}
            index={index}
            handleUpdateStatus={handleUpdateStatus}
          />
        ))
      )}
    </Box>
  );
};
