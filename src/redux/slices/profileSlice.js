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
  },
  reducers: {
    updateDailyTodos: (state, action) => {
      const newTodo = { todo: action.payload };
      state.dailyTodos = [...state.dailyTodos, newTodo];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        const { user, goals, recentGoal, showUiHelp, dailyTodos } =
          action.payload;
        console.log("Got profile", action.payload);
        state.user = user;
        state.goals = goals;
        state.recentGoal = recentGoal;
        state.showUiHelp = showUiHelp;
        state.loading = false;
        state.dailyTodos = dailyTodos;
      })
      .addCase(getProfile.rejected, (state, action) => {
        console.log("Error fetching profile:", action);
        state.error = true;
        state.loading = false;
      });
  },
});

export const { updateDailyTodos } = profileSlice.actions;

export default profileSlice;
