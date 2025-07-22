import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Update if backend is hosted elsewhere

export interface StudentData {
  age: number;
  gender: string;
  branch: string;
  gpa: number;
  backlogs: number;
  attendance: number;
  internshipDone: boolean;
  Skills: string[];
  Clubs: string[];
}

// New interface for the prediction response
export interface PredictionResult {
  placement_chance: number;
  roadmap: string;
}

// Predict placement chance and get roadmap from backend
export const predictPlacement = async (data: StudentData): Promise<PredictionResult> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, data);
    // The backend now returns { "placement_chance": ..., "roadmap": ... }
    return response.data;
  } catch (error) {
    console.error("Prediction error:", error);
    throw new Error("Prediction failed.");
  }
};