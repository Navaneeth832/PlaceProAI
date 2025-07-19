import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Update if backend is hosted elsewhere

export interface StudentData {
  gender: string;
  branch: string;
  gpa: number;
  backlogs: number;
  attendance: number;
  internshipDone: boolean;
  Skills: string[];
  Clubs: string[];
}

// Predict placement chance from backend
export const predictPlacement = async (data: StudentData): Promise<number> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, data);
    return response.data.chance; // Expected: { chance: float }
  } catch (error) {
    console.error("Prediction error:", error);
    throw new Error("Prediction failed.");
  }
};

// Generate roadmap using Gemini or similar service
export const generateRoadmap = async (chance: number, data: StudentData): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/roadmap`, {
      chance,
      data
    });
    return response.data.roadmap; // Expected: { roadmap: string }
  } catch (error) {
    console.error("Roadmap generation error:", error);
    throw new Error("Failed to generate roadmap.");
  }
};
