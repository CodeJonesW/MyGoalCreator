import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HoneycombGrid from "./HoneycombGrid"; // Import the HoneycombGrid

const HeroSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isXLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const fullHoneycomb = [5, 6, 7, 8, 9, 8, 7, 6, 5];
  const smallHoneycomb = [3, 4, 5, 4, 3];

  const honeycomb =
    isLargeScreen || isXLargeScreen ? fullHoneycomb : smallHoneycomb;

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

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
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
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
                  textAlign: "left",
                  color: theme.palette.text.secondary,
                }}
              >
                Set and track your goals. Dive into the plan.
              </Typography>
              <Box sx={{ display: "flex", gap: "16px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/register")}
                  sx={{ fontWeight: "bold" }}
                >
                  Get Started
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/login")}
                  sx={{ fontWeight: "bold" }}
                >
                  Login
                </Button>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={imageVariants}
            >
              {/* Pass the honeycomb structure to the HoneycombGrid */}
              <HoneycombGrid structure={honeycomb} theme={theme} />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
