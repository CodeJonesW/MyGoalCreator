import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  updateDailyTodo,
  createDailyTodo,
  updateDailyTodosCompletedToday,
  deleteDailyTodo,
} from "../../redux/slices/profileSlice";
import {
  Box,
  FormControl,
  Button,
  TextField,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Checkbox, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

const DailyTodos = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authSlice);
  const { dailyTodos, dailyTodosCompletedToday } = useSelector(
    (state) => state.profileSlice
  );
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showDeleteButton, setShowDeleteButton] = React.useState(false);
  const editOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setShowDeleteButton(!showDeleteButton);
  };

  const handleDeleteTodo = async (todo) => {
    dispatch(
      deleteDailyTodo({
        daily_todo_id: todo.daily_todo_id,
      })
    );

    await axios.post(
      "/api/todo/deleteDailyTodo",
      {
        daily_todo_id: todo.daily_todo_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

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
    setTodo("");
  };

  const handleCheck = async (todo) => {
    dispatch(
      updateDailyTodo({
        ...todo,
        completed: !todo.completed,
      })
    );

    await axios.post(
      "/api/todo/updateDailyTodo",
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
  };

  const handleCompleteDay = async () => {
    dispatch(updateDailyTodosCompletedToday());
    await axios.post(
      "/api/todo/completeDay",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Box sx={{ padding: "24px" }}>
        <Box
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: "8px",
              }}
            >
              <Typography
                sx={{ color: theme.palette.text.primary }}
                variant={"h6"}
              >
                Daily Todos
              </Typography>

              <IconButton
                id="basic-button"
                aria-controls={editOpen ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={editOpen ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={editOpen}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleEdit}>
                  {showDeleteButton ? "Hide Edit" : "Edit"}
                </MenuItem>
              </Menu>
            </Box>

            {dailyTodos.map((todo) => (
              <Box
                key={todo.id}
                display="flex"
                alignItems="center"
                sx={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    onChange={() => handleCheck(todo)}
                    checked={todo.completed === 1}
                  />
                  <Typography>{todo.task}</Typography>
                </Box>

                {showDeleteButton ? (
                  <IconButton
                    onClick={() => {
                      handleDeleteTodo(todo);
                    }}
                  >
                    <DeleteIcon color="secondary" />
                  </IconButton>
                ) : null}
              </Box>
            ))}
            {dailyTodos.filter((todo) => todo.completed === 1).length ===
            dailyTodos.length ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "8px",
                }}
              >
                <Button
                  disabled={dailyTodosCompletedToday}
                  variant="outlined"
                  onClick={handleCompleteDay}
                >
                  <Typography sx={{ marginRight: "8px" }}>
                    {!dailyTodosCompletedToday
                      ? "Complete Day"
                      : "Day Completed"}
                  </Typography>
                  <CheckCircleIcon
                    color={dailyTodosCompletedToday ? "success" : "secondary"}
                  />
                </Button>
              </Box>
            ) : null}
          </Box>
        ) : null}
      </Box>
    </motion.div>
  );
};

export default DailyTodos;
