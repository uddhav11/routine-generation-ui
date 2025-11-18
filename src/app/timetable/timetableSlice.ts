import { buildCreateSlice, createSlice } from "@reduxjs/toolkit";
import { generateTimetable, getBatchTimetable } from "./timetableThunks";
import { createECDH } from "crypto";

interface TimetableState {
    loading: boolean;
    error: string | null;
    timetable: any | null;
}

const initialState: TimetableState = {
    loading: false,
    error: null,
    timetable: null,
}

const timetableSlice= createSlice ({
    name: "timetable",
    initialState,
    reducers: {},
    extraReducers: (builder )=> {
        builder.addCase(generateTimetable.pending, (state) => {
            state.loading= true;
            state.error= null;
        })
        .addCase(generateTimetable.fulfilled, (state, action) => {
            state.loading= false;
            state.timetable= action.payload;
        })
        .addCase(generateTimetable.rejected, (state, action) => {
            state.loading= false;
            state.error= (action.payload as any) ?.message || "failed to generate timetable"
        })

        .addCase(getBatchTimetable.pending, (state) => {
            state.loading= true;
            state.error= null;
        })
        .addCase(getBatchTimetable.fulfilled, (state, action) => {
            state.loading= false;
            state.timetable= action.payload;
        })
        .addCase(getBatchTimetable.rejected, (state, action) => {
            state.loading= false;
            state.error= (action.payload as any)?.message || "failed to fetch timetable"
        })
    }
})

export default timetableSlice.reducer;