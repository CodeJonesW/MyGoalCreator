import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearAuthToken } from "./authSlice";
import { setGoal } from "./goalSlice";
import axios from "axios";

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async ({ token, setLatestGoal }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`/api/account/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
          completed_at: new Date(),
        },
      ];
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
} = profileSlice.actions;

export default profileSlice;
