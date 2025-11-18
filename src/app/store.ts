import { configureStore } from "@reduxjs/toolkit";
// import facultyReducer from "faculty/facultySlice.ts";
import teacherReducer from "../app/teacher/teacherSlice";
import batchReducer from "../app/batch/batchSlice";
import timetableReducer from "../app/timetable/timetableSlice";
import analysisReducer from "../app/analysis/analysisSlice";
import facultyReducer from "../app/faculty/facultySlice";
import authReducer from '../app/auth/authSlice'

export const store = configureStore({
  reducer: {
    faculty: facultyReducer,
    teacher: teacherReducer,
    batch: batchReducer,
    timetable: timetableReducer,
    analysis: analysisReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
