import { createAsyncThunk } from "@reduxjs/toolkit";
import appClient from "../appClient";

export interface Batch {
  id: string;
  name: string;
  break_time: number;
}

export interface FacultyPayload {
  id: string;
  name: string;
  days: string[];
  start_time: number;
  end_time: number;
  batches: Batch[];
}

export const createFaculty = createAsyncThunk(
  "faculty/createFaculty",
  async (data: FacultyPayload, { rejectWithValue }) => {
    try {
      const response = await appClient.post("/faculty", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "error in create faulty" }
      );
    }
  }
);
