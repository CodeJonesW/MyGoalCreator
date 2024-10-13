import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGoal = createAsyncThunk(
  "goal/getGoal",
  async ({ token, goal_id }) => {
    const response = await axios.post(
      `/api/goal`,
      {
        goal_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const analyzeSubGoal = createAsyncThunk(
  "goal/analyzeSubGoal",
  async ({ token, text, lineNumber, goal_id }) => {
    const response = await axios.post(
      `/api/subgoal`,
      {
        goal_id,
        sub_goal_name: text,
        line_number: lineNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const goalSlice = createSlice({
  name: "goal",
  initialState: {
    goal: JSON.parse(localStorage.getItem("goal")) || null,
    subGoal: null,
    loading: false,
    error: false,
  },
  reducers: {
    clearGoal: (state) => {
      state.goal = null;
      localStorage.removeItem("goal");
    },
    clearSubGoal: (state) => {
      state.subGoal = null;
    },
    setGoal: (state, action) => {
      state.goal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoal.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGoal.fulfilled, (state, action) => {
        state.goal = action.payload.goal;
        localStorage.setItem("goal", JSON.stringify(action.payload.goal));
      })
      .addCase(getGoal.rejected, (state, action) => {
        state.error = true;
      })
      .addCase(analyzeSubGoal.pending, (state) => {
        state.loading = true;
      })
      .addCase(analyzeSubGoal.fulfilled, (state, action) => {
        console.log("Subgoal analyzed successfully", action);
        state.loading = false;
        state.subGoal = action.payload.subGoal;
      })
      .addCase(analyzeSubGoal.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearGoal, clearSubGoal, setGoal } = goalSlice.actions;

export default goalSlice;
