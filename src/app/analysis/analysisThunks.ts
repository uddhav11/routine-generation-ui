import { createAsyncThunk } from "@reduxjs/toolkit";
import appClient from "../appClient";
import { create } from "domain";


export interface AnalyzePayload {
    batch_id: string;
    faculty_id: string;
}


export const analyzeTimetable= createAsyncThunk(
    "analysis/analyzeTimetable", 
    async(data: AnalyzePayload, {rejectWithValue}) => {
        try {
            const response= await appClient.post('/analysis/analyze', data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || {message: "failed to analyze timetable"})
        }
    }
)