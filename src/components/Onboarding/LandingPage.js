import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NavBar from "../NavBar";
import FeaturesSection from "./components/FeaturesSection";
import HeroSection from "./components/HeroSection";
import TestimonialsSection from "./components/TestimonialsSection";
import PricingSection from "./components/PricingSection";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";

const LandingPage = () => {
  const theme = useTheme();

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
