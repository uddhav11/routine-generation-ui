import { createSlice } from "@reduxjs/toolkit";
import { createFaculty } from "./facultyThunk";

interface FacultyState {
  loading: boolean;
  error: string | null;
  faculty: any | null;
}

const initialState: FacultyState = {
  loading: false,
  error: null,
  faculty: null,
};

const facultySlice = createSlice({
  name: "faculty",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFaculty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFaculty.fulfilled, (state, action) => {
        state.loading = false;
        state.faculty = action.payload;
      })
      .addCase(createFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || "Failed to create faculty";
      });
  },
});

export default facultySlice.reducer;
