import React from "react";
import { Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import TrackChangesIcon from "@mui/icons-material/TrackChanges"; // Goal tracking icon

const TrackGoalButton = ({ onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect if the screen size is small (mobile)

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        onClick={onClick}
        variant="outlined"
        sx={{
          borderColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          padding: "10px 20px",
          borderRadius: "50px",
          textTransform: "none",
          fontSize: "1.2rem",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            transform: "scale(1.05)",
          },
        }}
      >
        <TrackChangesIcon sx={{ mr: 1 }} />
        {isMobile ? "Track Goal" : "Start Tracking Your Goal"}
      </Button>
    </Box>
  );
};

export default TrackGoalButton;
