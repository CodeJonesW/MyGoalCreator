import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearAuthToken } from "./authSlice";
import axios from "axios";

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (token, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`api/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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
  },
  reducers: {
    // define any additional synchronous reducers here later
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        const { user, goals } = action.payload;
        state.user = user;
        state.goals = goals;
      })
      .addCase(getProfile.rejected, (state, action) => {
        console.log("Error fetching profile:", action);
        state.error = true;
      });
  },
});

export const { incremented, decremented } = profileSlice.actions;

export default profileSlice;
