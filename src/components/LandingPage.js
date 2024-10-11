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
import GoalIllustration from "../assets/images/my_goal_creator_landing_page_img_1.webp";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ displayComponent }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box className="landing-page">
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

      {/* Features Section */}
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
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                  }}
                >
                  Define Your Goal
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary, marginTop: "4px" }}
                >
                  Use our AI-powered tool to clearly define the path to your
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
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
                >
                  Dive into Subtopics
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary, marginTop: "4px" }}
                >
                  Continue the conversation in seperate windows to keep main
                  line of questioning concise.
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
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
                >
                  Track Progress (Coming Soon)
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary, marginTop: "4px" }}
                >
                  Stay on top of your progress with real-time tracking and
                  analytics.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section
      <Box
        sx={{ padding: "80px 0", backgroundColor: "#ececec" }}
        id="testimonials"
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "40px",
              color: "#333",
            }}
          >
            What Our Users Say
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={6}
                sx={{
                  padding: "20px",
                  backgroundColor: "#ffffff", // Keep cards white for contrast
                  border: "1px solid #e0e0e0", // Light border to define edges
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
                }}
              >
                <Typography variant="body1" sx={{ color: "#555" }}>
                  "I was able to visualize the action steps I needed to take."
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontStyle: "italic", color: "#007bff" }}
                >
                  — Austin Candler
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={6}
                sx={{
                  padding: "20px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e0e0e0",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant="body1" sx={{ color: "#555" }}>
                  "Loved diving deeper into the sub topics of my plan."
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontStyle: "italic", color: "#007bff" }}
                >
                  — Jim Gibbs
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={6}
                sx={{
                  padding: "20px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e0e0e0",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant="body1" sx={{ color: "#555" }}>
                  "I was skeptical at first, but this app exceeded my
                  expectations."
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontStyle: "italic", color: "#007bff" }}
                >
                  — Laura Townsend
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box> */}

      {/* Pricing Section */}
      <Box
        sx={{
          padding: "80px 0",
          background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
        }}
        id="pricing"
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
            Pricing Plans
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4} mt={4} mb={4}>
              <Paper
                elevation={6}
                sx={{
                  padding: "30px",
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[4],
                  borderRadius: "10px",
                  textAlign: "center",
                  height: "95%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Free Plan
                  </Typography>
                  <List
                    sx={{
                      color: theme.palette.text.secondary,
                      marginBottom: "20px",
                    }}
                  >
                    <ListItem>
                      <ListItemText primary="- Basic AI Goal Planning and Analysis." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="- Dive into goal subtopics." />
                    </ListItem>
                  </List>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => displayComponent("register")}
                  sx={{
                    marginTop: "20px",
                    padding: "10px 20px",
                  }}
                >
                  Get Started
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} mt={4} mb={4}>
              <Paper
                elevation={6}
                sx={{
                  padding: "30px",
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[4],
                  borderRadius: "10px",
                  textAlign: "center",
                  height: "95%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Pro Plan
                  </Typography>
                  <List
                    sx={{
                      color: theme.palette.text.secondary,
                      marginBottom: "20px",
                    }}
                  >
                    <ListItem>
                      <ListItemText primary="- Dive multiple levels into subtopics and get detailed insights." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="- Track your progress with advanced analytics." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="- Unlimited requests." />
                    </ListItem>
                  </List>
                </Box>

                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    marginTop: "20px",
                    padding: "10px 20px",
                  }}
                >
                  Coming Soon
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
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
            onClick={() => displayComponent("register")}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            Get Started for Free
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          padding: "40px 0",
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          textAlign: "center",
        }}
        id="footer"
      >
        <Typography variant="body2">
          © 2024 My Goal Creator. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
