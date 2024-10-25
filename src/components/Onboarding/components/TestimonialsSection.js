import React, { useRef } from "react";
import { Box, Container, Typography, Paper, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, useInView } from "framer-motion";

const TestimonialsSection = () => {
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <Box
      sx={{
        padding: "80px 0",
        backgroundColor: theme.palette.background.default,
      }}
      id="testimonials"
      ref={ref}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "40px",
            color: theme.palette.text.primary,
          }}
        >
          What Our Users Say
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <Paper
                elevation={6}
                sx={{
                  padding: "44px",
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[4],
                  borderRadius: "10px",
                  minHeight: "144px",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.primary }}
                >
                  "ChatGPT is great but I like how I dont have to type anything.
                  I dont have to think of the right questions."
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontStyle: "italic",
                    color: theme.palette.text.secondary,
                  }}
                >
                  — Austin Candler
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <Paper
                elevation={6}
                sx={{
                  padding: "44px",
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[4],
                  borderRadius: "10px",
                  minHeight: "144px",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.primary }}
                >
                  "I found it helpful to know what to research."
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontStyle: "italic",
                    color: theme.palette.text.secondary,
                  }}
                >
                  — Sarah Henry
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <Paper
                elevation={6}
                sx={{
                  padding: "44px",
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[4],
                  borderRadius: "10px",
                  minHeight: "144px",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.primary }}
                >
                  "Diving into sub topics is fun and interesting."
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontStyle: "italic",
                    color: theme.palette.text.secondary,
                  }}
                >
                  — Laura Townsend
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
