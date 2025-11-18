import { createAsyncThunk } from "@reduxjs/toolkit";
import appClient from "../appClient";

export interface Availability{
    day: string;
    start_time: number;
    end_time: number;
}

export interface TeacherPayload{
    id: string;
    name: string;
    subjects: string[];
    max_daily: number;
    availability: Availability[];
}

export const createTeacher = createAsyncThunk(
    "teacher/createTeacher",
    async (data: TeacherPayload, {rejectWithValue})=>{
        try{
            const response = await appClient.post("/teachers", data);
            return response.data;
        }catch(error:any){
            return rejectWithValue(
                error.response?.data || {message: "error in create teacher"}
            );
        }
    }
);

export const getTeacher= createAsyncThunk(
    "teacher/getTeacher",
    async (teacherId: string, {rejectWithValue}) => {
        try {
            const response= await appClient.get(`/teachers/${teacherId}`)
            return response.data;
        
        } catch (error) {
            return rejectWithValue(error.response?.data || {message: "Teacher not found"})    
        }
    }
);

