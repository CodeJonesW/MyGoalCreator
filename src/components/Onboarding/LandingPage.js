import React from "react";
import {
  Button,
  Box,
  Grid,
  Typography,
  Paper,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GoalIllustration from "../../assets/images/my_goal_creator_landing_page_img_1.webp";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import TestimonialsSection from "./TestimonialsSection";
import PricingSection from "./PricingSection";
import CallToAction from "./CallToAction";
import Footer from "./Footer";

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box className="landing-page">
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[3],
        }}
      >
        <NavBar isMenuDisabled={true} />
      </Box>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CallToAction />
      <Footer />
    </Box>
  );
};

export default LandingPage;
