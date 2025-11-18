// src/redux/authSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost4000/api"; 

// Axios instance
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// -----------------------
// Types
// -----------------------
export interface User {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

// -----------------------
// Initial State
// -----------------------
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  success: false,
};

// -----------------------
// Thunks
// -----------------------

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    payload: {
      firstname: string;
      lastname: string;
      email: string;
      username: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await api.post("/auth/register/", payload);
      return res.data; // expected: { token, user }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post("/auth/login/", payload);
      return res.data; // expected: { token, user }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

// GET PROFILE (requires token)
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }

      const res = await api.get("/auth/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data; // expected: { user }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

// -----------------------
// Slice
// -----------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    resetAuthState: (state) => {
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    // REGISTER
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // LOGIN
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // GET PROFILE
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// -----------------------
// Export actions + reducer
// -----------------------
export const { logout, resetAuthState } = authSlice.actions;

export default authSlice.reducer;
