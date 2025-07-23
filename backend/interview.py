from google import genai
from google.genai import types
from pydantic import BaseModel
from typing import Literal
import pathlib

class InterviewQuestion(BaseModel):
    type: Literal["technical", "general"]
    question: str
    evaluation: str

client = genai.Client()

# Retrieve and encode the PDF byte
filepath = pathlib.Path('interview.pdf')

domain="frontend"

prompt = f"""
You will be provided a file that includes {domain} development.

Generate exactly 10 interview questions for a {domain} position (only):
- 8 questions must be of type 'technical'
- 2 questions must be of type 'general' (e.g., behavioral, HR)
For each question, provide:
- type: "technical" or "general"
- question: The full question
- evaluation: Based on the attached document, list the most important evaluation criteria 
for assessing a candidate during a technical interview in this domain.(if not in document, use your knowledge to create one)

Return as a JSON list of objects only — no extra explanation.
"""
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
    config={
        "response_mime_type": "application/json",
        "response_schema": list[InterviewQuestion],
    },
)
print(response.text)