import { createAsyncThunk } from "@reduxjs/toolkit";
import appClient from "../appClient";


export interface SubjectPayload {
    name: string;
    session_type: "theory" | "practical";
    sessions_per_week: number;
}

export interface BatchPayload {
    id: string;
    name: string;
    faculty: string;
    break_time: number;
    subjects: SubjectPayload[];
}

export const createBatch= createAsyncThunk(
    "batch/createBatch",
    async (data: BatchPayload, {rejectWithValue}) => {
        try {
            const response= await appClient.post("/batches/", data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || {message: "unknown error in createBatch"})
        }
    }
);