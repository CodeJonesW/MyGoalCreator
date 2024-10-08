import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await axios.post(`/api/login`, {
      email,
      password,
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loading: false,
    error: false,
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    getAuthToken: (state) => {
      const token = localStorage.getItem("authToken");
      state.token = token;
    },
    clearAuthToken: (state) => {
      state.token = null;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { access_token } = action.payload;
        state.token = access_token;
        localStorage.setItem("authToken", access_token);
      })
      .addCase(login.rejected, (state, action) => {
        console.error("Error logging in:", state, action);
        state.error = true;
      });
  },
});

export const { setAuthToken, clearAuthToken, getAuthToken } = authSlice.actions;

export default authSlice;
