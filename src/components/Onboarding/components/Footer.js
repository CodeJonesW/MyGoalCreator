import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        padding: "40px 0",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.primary.contrastText,
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        © 2024 My Goal Creator. All rights reserved.
      </Typography>
      <Box sx={{ marginTop: "16px" }}>
        <Button
          onClick={() => navigate("/privacy")}
          sx={{
            color: theme.palette.primary.contrastText,
            marginRight: "8px",
            "&:hover": {
              color: theme.palette.secondary.main,
            },
          }}
        >
          Privacy Policy
        </Button>
        <Button
          onClick={() => navigate("/terms")}
          sx={{
            color: theme.palette.primary.contrastText,
            marginRight: "8px",
            "&:hover": {
              color: theme.palette.secondary.main,
            },
          }}
        >
          Terms of Service
        </Button>
      </Box>
    </Box>
  );
};

export default Footer;
