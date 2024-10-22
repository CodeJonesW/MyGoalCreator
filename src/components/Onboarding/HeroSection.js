import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import GoalIllustration from "../../assets/images/my_goal_creator_landing_page_img_1.webp";

const HeroSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        padding: {
          xs: "50px 20px",
          sm: "80px 40px",
          md: "24px 0",
        },
        minHeight: "100vh",
        textAlign: { xs: "center", md: "left" },
      }}
      id="hero"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                marginBottom: "20px",
                textAlign: "left",
                color: theme.palette.text.primary,
              }}
            >
              My Goal Creator
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "30px",
                fontSize: "18px",
                color: theme.palette.text.secondary,
              }}
            >
              Set and track your goals. Dive into the plan.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: "16px" }}
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={GoalIllustration}
              alt="Illustration"
              sx={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
