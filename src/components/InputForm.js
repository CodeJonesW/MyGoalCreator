import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  TextField,
  FormGroup,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const InputForm = ({ onSubmit, loading }) => {
  const theme = useTheme();
  const [goalName, setGoalName] = useState("");
  const [areaOfFocus, setAreaOfFocus] = useState("");
  const [timeline, setTimeline] = useState("1 day");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(goalName, areaOfFocus, timeline);
  };

  return (
    <Box
      id="inputform"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
        width: "300px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Box className="input-group">
            <FormControl fullWidth>
              <TextField
                placeholder="Type your goal..."
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                required
                InputProps={{
                  style: {
                    backgroundColor: theme.palette.background.paper,
                  },
                }}
                sx={{
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
                    WebkitTextFillColor: theme.palette.text.primary,
                  },
                }}
              />
            </FormControl>
          </Box>
          <Box className="input-group">
            <FormControl fullWidth>
              <TextField
                placeholder="Areas of focus..."
                value={areaOfFocus}
                onChange={(e) => setAreaOfFocus(e.target.value)}
                variant="outlined"
                multiline
                rows={3}
                InputProps={{
                  style: {
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  },
                }}
                sx={{
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
                    WebkitTextFillColor: theme.palette.text.primary,
                  },
                }}
              />
            </FormControl>
          </Box>
          <Box className="input-group">
            <FormControl fullWidth>
              <InputLabel id="timeline-select-label">Timeline</InputLabel>
              <Select
                labelId="timeline-select-label"
                label="Timeline"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                required
              >
                <MenuItem value="" disabled>
                  Select Timeline...
                </MenuItem>
                <MenuItem value="1 day">1 Day</MenuItem>
                <MenuItem value="1 week">1 Week</MenuItem>
                <MenuItem value="1 month">1 Month</MenuItem>
                <MenuItem value="3 months">3 Months</MenuItem>
                <MenuItem value="6 months">6 Months</MenuItem>
                <MenuItem value="1 year">1 Year</MenuItem>
                <MenuItem value="2 years">2 Years</MenuItem>
                <MenuItem value="5 years">5 Years</MenuItem>
                <MenuItem value="10 years">10 Years</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant={"contained"} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Show me the way"}
            </Button>
          </Box>
        </FormGroup>
      </form>
    </Box>
  );
};

export default InputForm;
