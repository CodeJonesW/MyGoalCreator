import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        padding: "80px 0",
        background: theme.palette.background.paper,
        textAlign: "center",
      }}
      id="cta"
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: "20px",
            color: theme.palette.text.primary,
          }}
        >
          Ready to Achieve Your Goals?
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/register")}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          Get Started for Free
        </Button>
      </Container>
    </Box>
  );
};

export default CallToAction;
