import React from "react";
import { Box, Container, Typography, Paper, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        padding: { xs: "50px 20px", sm: "80px 40px" },
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            padding: "40px",
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "10px",
            boxShadow: theme.shadows[4],
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: "20px",
              textAlign: "center",
              color: theme.palette.text.primary,
            }}
          >
            Terms of Service
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.secondary, marginBottom: "20px" }}
          >
            Welcome to My Goal Creator. Please read these terms and conditions
            carefully before using our services.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
              color: theme.palette.text.primary,
            }}
          >
            1. Acceptance of Terms
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.secondary, marginBottom: "20px" }}
          >
            By accessing and using our website, you agree to be bound by these
            terms of service and our privacy policy. If you do not agree, please
            do not use our services.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
              color: theme.palette.text.primary,
            }}
          >
            2. Changes to Terms
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.secondary, marginBottom: "20px" }}
          >
            We reserve the right to modify these terms at any time. Any changes
            will be posted on this page, and your continued use of the website
            will indicate your acceptance of the revised terms.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
              color: theme.palette.text.primary,
            }}
          >
            3. User Responsibilities
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.secondary, marginBottom: "20px" }}
          >
            Users agree to use our services for lawful purposes only and not to
            engage in any activities that may harm our website or other users.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
              color: theme.palette.text.primary,
            }}
          >
            4. Limitation of Liability
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.secondary, marginBottom: "20px" }}
          >
            My Goal Creator will not be held responsible for any damages arising
            from the use or inability to use our services.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
              color: theme.palette.text.primary,
            }}
          >
            5. Governing Law
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.secondary, marginBottom: "20px" }}
          >
            These terms shall be governed by and construed in accordance with
            the laws of the jurisdiction in which My Goal Creator operates.
          </Typography>

          <Box
            sx={{
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
              sx={{
                padding: "10px 20px",
                marginTop: "10px",
              }}
            >
              Back to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default TermsOfService;
