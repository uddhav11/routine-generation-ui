import { buildCreateSlice, createSlice } from "@reduxjs/toolkit";
import { analyzeTimetable } from "./analysisThunks";
import { act } from "react";

interface AnalysisState {
  loading: boolean;
  error: string | null;
  analysis: any | null;
}

const initialState: AnalysisState = {
  loading: false,
  error: null,
  analysis: null,
};

const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(analyzeTimetable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(analyzeTimetable.fulfilled, (state, action) => {
        state.loading = false;
        state.analysis = action.payload;
      })

      .addCase(analyzeTimetable.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as any)?.message || "failed to analyze timetable";
      });
  },
});

export default analysisSlice.reducer;
