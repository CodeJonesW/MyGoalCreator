import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NavBar from "../NavBar";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import TestimonialsSection from "./TestimonialsSection";
import PricingSection from "./PricingSection";
import CallToAction from "./CallToAction";
import Footer from "./Footer";

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
