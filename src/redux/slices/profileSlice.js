import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearAuthToken } from "./authSlice";
import { setGoal } from "./goalSlice";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async ({ token, setLatestGoal }, { rejectWithValue, dispatch }) => {
    const userTimezone = dayjs.tz.guess();
    console.log("user timezone", userTimezone);
    const now = dayjs().tz(userTimezone);
    console.log(now.format("YYYY-MM-DD HH:mm:ss"));

    try {
      const response = await axios.get(`/api/account/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          userTimezone: userTimezone,
          datetime: now,
        },
      });
      if (setLatestGoal) {
        dispatch(setGoal(response.data.recentGoal));
      }
      return response.data;
    } catch (error) {
      dispatch(clearAuthToken());
      return rejectWithValue(error.response.data);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    goals: [],
    loading: false,
    error: false,
    recentGoal: null,
    showUiHelp: null,
    dailyTodos: [],
    dailyTodosCompletions: [],
    dailyTodosCompletedToday: false,
  },
  reducers: {
    createDailyTodo: (state, action) => {
      state.dailyTodos = [...state.dailyTodos, action.payload];
    },
    updateDailyTodo: (state, action) => {
      state.dailyTodos = state.dailyTodos.map((todo) => {
        if (todo.daily_todo_id === action.payload.daily_todo_id) {
          return {
            ...todo,
            completed: action.payload.completed ? 1 : 0,
          };
        } else {
          return todo;
        }
      });
    },
    updateDailyTodosCompletedToday: (state, action) => {
      state.dailyTodosCompletedToday = true;
      state.dailyTodosCompletions = [
        ...state.dailyTodosCompletions,
        {
          completed_at: action.payload,
        },
      ];
    },
    deleteDailyTodo: (state, action) => {
      console.log("deleting todo");
      state.dailyTodos = state.dailyTodos.filter(
        (todo) => todo.daily_todo_id !== action.payload.daily_todo_id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        const {
          user,
          goals,
          recentGoal,
          showUiHelp,
          dailyTodos,
          dailyTodosCompletions,
          dailyTodosCompletedToday,
        } = action.payload;
        state.user = user;
        state.goals = goals;
        state.recentGoal = recentGoal;
        state.showUiHelp = showUiHelp;
        state.loading = false;
        state.dailyTodos = dailyTodos;
        state.dailyTodosCompletions = dailyTodosCompletions;
        state.dailyTodosCompletedToday = dailyTodosCompletedToday;
      })
      .addCase(getProfile.rejected, (state, action) => {
        console.log("Error fetching profile:", action);
        state.error = true;
        state.loading = false;
      });
  },
});

export const {
  createDailyTodo,
  updateDailyTodo,
  updateDailyTodosCompletedToday,
  deleteDailyTodo,
} = profileSlice.actions;

export default profileSlice;
