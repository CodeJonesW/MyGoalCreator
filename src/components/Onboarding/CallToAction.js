import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";

const topics = [
  "cook a delicious meal.",
  "master time management.",
  "plan a perfect vacation.",
  "achieve your fitness goals.",
  "organize your daily tasks.",
  "speak a new language.",
  "improve your coding skills.",
  'write a "New York Times" bestseller.',
  "launch a successful startup.",
  "travel the world on a budget.",
  "speak confidently in public.",
  "build a sustainable lifestyle.",
  "create a stunning piece of art.",
  "run a marathon.",
  "ace your next job interview.",
  "start a profitable side hustle.",
  "transform your daily habits.",
  "craft the perfect resume.",
  "design your dream home.",
  "meditate like a pro.",
];

const CallToAction = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [currentTopic, setCurrentTopic] = useState(0);
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isInView) {
      timeoutRef.current = setInterval(() => {
        controls.start({ opacity: 0 }).then(() => {
          setCurrentTopic((prev) => (prev + 1) % topics.length);
          controls.start({ opacity: 1 });
        });
      }, 3000); // change topic every 3 seconds
    }

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, [isInView, controls]);

  return (
    <Box
      ref={sectionRef}
      sx={{
        padding: "80px 0",
        background: theme.palette.background.paper,
        textAlign: "center",
      }}
      id="cta"
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: theme.palette.text.primary,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            <span style={{ marginRight: "4.5px" }}>Learn how to</span>
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              color: theme.palette.text.primary,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            <motion.span
              animate={controls}
              initial={{ opacity: 1 }}
              style={{
                display: "inline-block",
                textAlign: "center",
                overflow: "hidden",
              }}
            >
              {topics[currentTopic]}
            </motion.span>
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/register")}
          sx={{
            marginTop: "20px",
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
