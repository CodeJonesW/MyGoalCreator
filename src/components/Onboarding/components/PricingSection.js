import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
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
                onClick={() => navigate("/register")}
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
  );
};

export default PricingSection;
