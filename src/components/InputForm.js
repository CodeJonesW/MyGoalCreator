import React, { useState, useEffect } from "react";
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
  Collapse,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import TuneIcon from "@mui/icons-material/Tune";

const InputForm = ({ onSubmit, loading }) => {
  const theme = useTheme();
  const [goalName, setGoalName] = useState("");
  const [areaOfFocus, setAreaOfFocus] = useState("");
  const [timeline, setTimeline] = useState("1 week");
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [placeholder, setPlaceholder] = useState("Type your goal...");

  useEffect(() => {
    const placeholderTexts = [
      "What do you want to learn?",
      "What needs to be done?",
      "What would you like to accomplish?",
      "Set a new target for yourself.",
      "Is there a skill you want to master?",
      "Tell me what you need to do.",
    ];

    const randomPlaceholder =
      placeholderTexts[Math.floor(Math.random() * placeholderTexts.length)];
    setPlaceholder(randomPlaceholder);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(goalName, areaOfFocus, timeline);
  };

  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
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
                  placeholder={placeholder} // Set the dynamic placeholder here
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                onClick={toggleAdvancedOptions}
                sx={{ marginTop: "4px", marginBottom: "4px" }}
              >
                <TuneIcon />
              </Button>
            </Box>

            <Collapse in={showAdvancedOptions}>
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
            </Collapse>
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
    </motion.div>
  );
};

export default InputForm;
