import React, { useState, useEffect } from "react";
import { validateEmail } from "../utils/account_verify";
import { Box, Button, TextField, FormGroup, Typography } from "@mui/material";
import { login } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.authSlice);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      dispatch(login({ email, password }));
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const BackButton = () => {
    return (
      <Box style={{ width: "100%", marginBottom: "44px" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/welcome")}
          style={{
            width: "24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="secondary-button"
        >
          <ArrowBackIosNewIcon />
        </Button>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        height: "100%",
        width: "100%",
      }}
    >
      <Box sx={{ padding: "24px" }}>
        <BackButton />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "300px",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography
            variant="h4"
            sx={{ marginBottom: "20px", color: theme.palette.text.primary }}
          >
            Login
          </Typography>
          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ marginBottom: "20px" }}
            >
              {error}
            </Typography>
          )}
          <form onSubmit={handleLogin}>
            <FormGroup>
              <Box className="input-group">
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  color="secondary"
                  sx={{
                    "& input:-webkit-autofill": {
                      WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
                      WebkitTextFillColor: theme.palette.text.primary,
                    },
                  }}
                />
              </Box>
              <Box className="input-group">
                <TextField
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  required
                  color="secondary"
                  sx={{
                    "& input:-webkit-autofill": {
                      WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
                      WebkitTextFillColor: theme.palette.text.primary,
                    },
                  }}
                />
              </Box>
              <Button
                sx={{ marginTop: "16px" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </FormGroup>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
