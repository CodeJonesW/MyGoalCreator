import React from "react";
import { Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"; // Back icon
import { motion } from "framer-motion"; // Import Framer Motion

const BackButton = ({ onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screens

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        mt: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }} // Customize duration if needed
      >
        <Button
          onClick={onClick}
          variant="outlined"
          sx={{
            borderColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            padding: "4px 12px", // Reduce padding to make the button less tall
            borderRadius: "30px",
            textTransform: "none",
            fontSize: "0.875rem", // Slightly smaller font to complement the reduced padding
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            transition: "background-color 0.2s ease-in-out, transform 0.2s",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              transform: "scale(1.05)",
            },
          }}
        >
          <ArrowBackIosNewIcon sx={{ mr: isMobile ? 0 : 1 }} />
          {!isMobile && "Back"} {/* Show text only on larger screens */}
        </Button>
      </motion.div>
    </Box>
  );
};

export default BackButton;
