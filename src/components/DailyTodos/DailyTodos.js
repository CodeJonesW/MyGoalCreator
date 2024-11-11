import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  updateDailyTodo,
  createDailyTodo,
} from "../../redux/slices/profileSlice";
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
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Checkbox, Typography } from "@mui/material";

const DailyTodos = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authSlice);
  const { dailyTodos } = useSelector((state) => state.profileSlice);
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState("");

  const handleCreateDailyTodo = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.post(
      "/api/todo/createDailyTodo",
      {
        todo: todo,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.message === "success") {
      dispatch(createDailyTodo(response.data.result));
    }
    setLoading(false);
  };

  const handleCheck = async (todo) => {
    const result = await axios.post(
      "/api/todo/completeDailyTodo",
      {
        daily_todo_id: todo.daily_todo_id,
        completed: !todo.completed,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (result.data.message === "success") {
      dispatch(updateDailyTodo(result.data.result));
    }
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
        <form onSubmit={handleCreateDailyTodo}>
          <FormGroup>
            <Box className="input-group">
              <FormControl fullWidth>
                <TextField
                  placeholder={"Create a daily todo.."}
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
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
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Button type="submit" variant={"contained"} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Create"}
              </Button>
            </Box>
          </FormGroup>
        </form>
      </Box>
      {dailyTodos.length > 0 ? (
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "10px",
            width: "300px",
          }}
        >
          <Typography sx={{ color: theme.palette.text.primary }} variant={"h6"}>
            Daily Todos
          </Typography>
          {dailyTodos.map((todo) => (
            <Box key={todo.id} display="flex" alignItems="center">
              <Checkbox
                onChange={() => handleCheck(todo)}
                checked={todo.completed === 1}
              />
              <Typography>{todo.task}</Typography>
            </Box>
          ))}
        </Box>
      ) : null}
    </motion.div>
  );
};

export default DailyTodos;
