import { createSlice } from "@reduxjs/toolkit";
import { createTeacher, getTeacher } from "./teacherThunks";

interface TeacherState {
  loading: boolean;
  error: string | null;
  teacher: any | null;
}

const initialState: TeacherState = {
  loading: false,
  error: null,
  teacher: null,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create teacher
      .addCase(createTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teacher = action.payload;
      })
      .addCase(createTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as any)?.message || "Failed to create teacher";
      })

      //   get teacher

      .addCase(getTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacher.fulfilled, (state, action) => {
        state.loading= false;
        state.teacher= action.payload;
      })
      .addCase(getTeacher.rejected, (state, action) => {
        state.loading= false;
        state.error= (action.payload as any)?.message || "Failed to get teacher";
      })
  },
});

export default teacherSlice.reducer;
