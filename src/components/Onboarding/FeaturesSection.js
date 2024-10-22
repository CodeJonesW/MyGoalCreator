import React from "react";
import { Box, Container, Typography, Paper, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import AssessmentIcon from "@mui/icons-material/Assessment";

const FeaturesSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: "80px 0",
        backgroundColor: theme.palette.background.default,
      }}
      id="features"
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
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={6}
              sx={{
                padding: "44px",
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[4],
                borderRadius: "10px",
                minHeight: "144px",
                textAlign: "center",
              }}
            >
              <TrackChangesIcon
                sx={{
                  fontSize: "48px",
                  color: theme.palette.secondary.main,
                  marginBottom: "16px",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  marginBottom: "8px",
                }}
              >
                Define Your Goal
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.secondary }}
              >
                Use our AI-powered tool to clearly define the path to your goal.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={6}
              sx={{
                padding: "44px",
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[4],
                borderRadius: "10px",
                minHeight: "144px",
                textAlign: "center",
              }}
            >
              <SubtitlesIcon
                sx={{
                  fontSize: "48px",
                  color: theme.palette.secondary.main,
                  marginBottom: "16px",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  marginBottom: "8px",
                }}
              >
                Dive into Subtopics
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.secondary }}
              >
                Generate detailed plans and resources for each subtopic of your
                goal.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={6}
              sx={{
                padding: "44px",
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[4],
                borderRadius: "10px",
                minHeight: "144px",
                textAlign: "center",
              }}
            >
              <AssessmentIcon
                sx={{
                  fontSize: "48px",
                  color: theme.palette.secondary.main,
                  marginBottom: "16px",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  marginBottom: "8px",
                }}
              >
                Track Progress
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.secondary }}
              >
                Stay on top of your progress with real-time tracking and
                analytics.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
