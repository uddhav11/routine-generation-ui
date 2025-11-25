// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost4000/api";

// const api = axios.create({
//   baseURL: API_BASE,
//   withCredentials: true,
// });

// export interface User {
//   id?: string;
//   firstname: string;
//   lastname: string;
//   email: string;
//   username: string;
// }

// export interface AuthState {
//   user: User | null;
//   token: string | null;
//   loading: boolean;
//   error: string | null;
//   success: boolean;
// }

// const initialState: AuthState = {
//   user: null,
//   token: localStorage.getItem("token") || null,
//   loading: false,
//   error: null,
//   success: false,
// };

// // registration thunk
// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (
//     payload: {
//       first_name: string;
//       last_name: string;
//       email: string;
//       username: string;
//       password: string;
//     },
//     thunkAPI
//   ) => {
//     try {
//       console.log("registering data:- ", payload);
//       const res = await api.post("/auth/register/", payload);
//       console.log("this is the response in thunk", res);
//       return res.data; // expected: { token, user }
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || "Registration failed"
//       );
//     }
//   }
// );

// // login thunk
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (payload: { email: string; password: string }, thunkAPI) => {
//     try {
//       console.log("logging data:- ", payload);
//       const res = await api.post("/auth/login/", payload);
//       return res.data; // expected: { token, user }
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || "Login failed"
//       );
//     }
//   }
// );

// // get profile thunk
// export const getProfile = createAsyncThunk(
//   "auth/getProfile",
//   async (_, thunkAPI) => {
//     try {
//       const state: any = thunkAPI.getState();
//       const token = state.auth.token;

//       if (!token) {
//         return thunkAPI.rejectWithValue("No token found");
//       }

//       const res = await api.get("/auth/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       return res.data;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || "Failed to fetch profile"
//       );
//     }
//   }
// );

// export const LogoutUser = createAsyncThunk(
//   "auth/logoutUser",
//   async (_, thunkAPI) => {
//     try {
//       const response = await api.post("/auth/logout/");
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Logout failed"
//       );
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("token");
//     },
//     resetAuthState: (state) => {
//       state.error = null;
//       state.success = false;
//     },
//   },

//   extraReducers: (builder) => {
//     // REGISTER
//     builder.addCase(registerUser.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//       state.success = false;
//     });
//     builder.addCase(registerUser.fulfilled, (state, action) => {
//       state.loading = false;
//       state.success = true;
//       state.user = action.payload.user;
//       state.token = action.payload.tokens;
//       localStorage.setItem("token", action.payload.tokens);
//     });
//     builder.addCase(registerUser.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload as string;
//     });

//     // LOGIN
//     builder.addCase(loginUser.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//       state.success = false;
//     });
//     builder.addCase(loginUser.fulfilled, (state, action) => {
//       state.loading = false;
//       state.success = true;
//       state.user = action.payload.user;
//       state.token = action.payload.tokens;
//       localStorage.setItem("token", action.payload.tokens);
//     });
//     builder.addCase(loginUser.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload as string;
//     });

//     // GET PROFILE
//     builder.addCase(getProfile.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(getProfile.fulfilled, (state, action) => {
//       state.loading = false;
//       state.user = action.payload.user;
//     });
//     builder.addCase(getProfile.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload as string;
//     });
//   },
// });

// export const { logout, resetAuthState } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";
import axios from "axios";


const API_BASE = import.meta.env.VITE_API_URL || "http://localhost4000/api";

const use = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export interface User {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
}

export interface AuthState {
  user: User | null;
  access: string | null;
  refresh: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AuthState = {
  user: null,
  access: localStorage.getItem("access") || null,
  refresh: localStorage.getItem("refresh") || null,

  loading: false,
  error: null,
  success: false,
};

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload: any, thunkAPI) => {
    try {
      const res = await use.post("/auth/register/", payload);
      return res.data; // expected: { access, refresh, user }
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
      const res = await use.post("/auth/login/", payload);
      return res.data; // expected: { access, refresh, user }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

// GET PROFILE
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/auth/profile/");
      console.log('getprofile response data:-', res)
      return res.data; // expected: { user }
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Failed to load profile");
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await api.post("/auth/logout/");
      return true;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

// SLICE
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.error = null;
      state.success = false;
    },
    logout: (state) => {
      state.user = null;
      state.access = null;
      state.refresh = null;

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },

  extraReducers: (builder) => {
    // REGISTER
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.user = action.payload.user || null;

        state.access = action.payload.tokens?.access || null;
        state.refresh = action.payload.tokens?.refresh || null;

        if (state.access) localStorage.setItem("access", state.access);
        if (state.refresh) localStorage.setItem("refresh", state.refresh);
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.user = action.payload.user || null;

        state.access = action.payload.tokens?.access || null;
        state.refresh = action.payload.tokens?.refresh || null;

        if (state.access) localStorage.setItem("access", state.access);
        if (state.refresh) localStorage.setItem("refresh", state.refresh);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // PROFILE
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        console.log('profile data in slice:- ', action.payload);
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // LOGOUT
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.access = null;
      state.refresh = null;

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    });
  },
});

export const { logout, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
