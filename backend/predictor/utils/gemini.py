import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = "AIzaSyAUoj3jqYZFB8DmprCinOtLkX2vX5A8YJ8"
genai.configure(api_key=api_key)

def get_roadmap(prompt):
    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(prompt)
    return response.text
