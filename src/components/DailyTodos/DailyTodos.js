import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { updateDailyTodos } from "../../redux/slices/profileSlice";
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
  const [checkedTodos, setCheckedTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("checkedTodos")) || [];
    setCheckedTodos(storedTodos);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await axios.post(
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
    console.log(result);
    if (result.data.message === "success") {
      dispatch(updateDailyTodos(todo));
    }
    setLoading(false);
  };

  const handleCompleteDay = async () => {
    const result = await axios.post(
      "/api/todo/completeDay",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(result);
  };

  const handleCheck = (id) => {
    const isChecked = checkedTodos.includes(id);

    let newCheckedTodos = [];
    if (isChecked) {
      newCheckedTodos = checkedTodos.filter((todoId) => todoId !== id);
    } else {
      newCheckedTodos = [...checkedTodos, id];
    }
    setCheckedTodos(newCheckedTodos);
    localStorage.setItem("checkedTodos", JSON.stringify(newCheckedTodos));
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
                onChange={() => handleCheck(todo.daily_todo_id)}
                checked={checkedTodos.includes(todo.daily_todo_id)}
              />
              <Typography>{todo.todo}</Typography>
            </Box>
          ))}
          {dailyTodos.length > 0 &&
          checkedTodos.length === dailyTodos.length ? (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <Button onClick={handleCompleteDay} variant={"contained"}>
                Complete Day
              </Button>
            </Box>
          ) : null}
        </Box>
      ) : null}
    </motion.div>
  );
};

export default DailyTodos;
