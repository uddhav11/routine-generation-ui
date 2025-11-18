import { createSlice } from "@reduxjs/toolkit";
import { createBatch } from "./batchThunks";

interface BatchState {
    loading: boolean;
    error: string | null;
    batch: any | null;
}

const initialState: BatchState= {
    loading: false,
    error: null,
    batch: null,
};

const batchSlice= createSlice({
    name: "batch",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createBatch.pending, (state) => {
            state.loading= true;
            state.error= null;
        })
        .addCase(createBatch.fulfilled, (state, action) => {
            state.loading= false;
            state.batch= action.payload;

        })
        .addCase(createBatch.rejected, (state, action) => {
            state.loading= false;
            state.error= (action.payload as any)?.message || "Failed to create batch";
        })
    }
})

export default batchSlice.reducer;