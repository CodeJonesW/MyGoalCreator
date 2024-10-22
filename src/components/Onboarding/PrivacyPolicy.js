import React from "react";
import { Box, Container, Typography, Paper, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
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
            Privacy Policy
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.secondary, marginBottom: "20px" }}
          >
            At My Goal Creator, we respect your privacy and are committed to
            protecting the personal information you share with us. This privacy
            policy explains how we collect, use, and safeguard your information.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
              color: theme.palette.text.primary,
            }}
          >
            1. Information We Collect
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.secondary, marginBottom: "20px" }}
          >
            We collect information that you provide directly to us when you
            register, use our services, or communicate with us. This may include
            your name, email address, and any other personal details you choose
            to share.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
              color: theme.palette.text.primary,
            }}
          >
            2. How We Use Your Information
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.secondary, marginBottom: "20px" }}
          >
            The information we collect is used to provide, maintain, and improve
            our services, communicate with you, and ensure the security of our
            platform. We may also use your information to personalize your
            experience.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
              color: theme.palette.text.primary,
            }}
          >
            3. Sharing Your Information
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.secondary, marginBottom: "20px" }}
          >
            We do not sell or rent your personal information to third parties.
            We may share your information with service providers who assist us
            in delivering our services, or when required by law.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
              color: theme.palette.text.primary,
            }}
          >
            4. Security of Your Information
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.secondary, marginBottom: "20px" }}
          >
            We take appropriate measures to secure your personal information and
            protect it from unauthorized access, disclosure, or alteration.
            However, no data transmission over the internet is entirely secure,
            and we cannot guarantee the security of your information.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
              color: theme.palette.text.primary,
            }}
          >
            5. Changes to This Privacy Policy
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.secondary, marginBottom: "20px" }}
          >
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page. Your
            continued use of our services following the update indicates your
            acceptance of the changes.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
              color: theme.palette.text.primary,
            }}
          >
            6. Contact Us
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.secondary, marginBottom: "20px" }}
          >
            If you have any questions about this privacy policy or your personal
            information, please contact us at support@mygoalcreator.com.
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

export default PrivacyPolicy;
