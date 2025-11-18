import { createAsyncThunk } from "@reduxjs/toolkit";
import appClient from "../appClient";


export interface GenerateTimeTablePayload {
    batch_id: string;
    faculty_id: string;
    max_practicals_per_day: number;
    session_durations: {
        theory: number;
        practical: number;
    }
}


export const generateTimetable= createAsyncThunk(
    "timetable/generateTimetable",
    async (data: GenerateTimeTablePayload, {rejectWithValue}) => {
        try {
            const response= await appClient.post('/timetables/generate/', data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || {message: "failed to generate timetable"})
        }
    }
)


export const getBatchTimetable= createAsyncThunk(
    'timetable/getBatchTimetable',
    async(batchId: string, {rejectWithValue}) => {
        try {
            const response= await appClient.get(`/timetables/batch_timetable/?batch_id=${batchId}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || {message: 'timetable not found'})
        }
    }
)