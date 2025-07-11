import google.generativeai as genai
import os
api_key = os.getenv("GOOGLE_API_KEY")
print(api_key)
genai.configure(api_key=api_key)
model=genai.GenerativeModel("gemini-2.0-flash")
def generate_roadmap(data,chance):
    prompt=f"You are an expert career counselor with strong knowledge in tech placements. Based on the following student profile {data} and their predicted placement probability {chance}, generate a personalized, practical, and step-by-step roadmap that can help the student improve their placement chances. The roadmap should include clear phases (e.g., skill building, practical exposure, interview prep) and specific actions. Tailor it to the student's weaknesses and strengths."
    response=model.generate_content(prompt)
    return response.text.strip() if response and response.text else "Some unknown error occurred. Please try again later."