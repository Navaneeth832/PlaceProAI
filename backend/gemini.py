import google.generativeai as genai
import os
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)
model=genai.GenerativeModel("gemini-2.0-flash")
def generate_roadmap(data,chance):
    prompt=f"""You are an expert AI career advisor.
            Based on the student's data and predicted placement probability, generate a clear, realistic 10-week roadmap to help the student increase their chances of getting placed.

            The roadmap should be direct, actionable, and follow this exact format — no summaries, no introductions, and no motivational messages.

            Input Format:
            {chance} → A number between 0 and 100 indicating current placement probability.
            {data} → JSON with student details.

            Example:
            Chance: 65%
            Data:
            "gender": "Male",
            "branch": "CSE",
            "gpa": 7.2,
            "backlogs": 0,
            "attendance": 84,
            "internshipDone": true,
            "Skills": ["Python", "HTML"],
            "Clubs": ["IEEE"]
        
            Output Format (strictly follow this):
            Roadmap to Improve Placement Chances (from {chance}%):

            Week 1–2: [Skill/Topic]  
            - [Task 1]  
            - [Task 2]  

            Week 3–4: [Project/Tool]  
            - [Task 1]  
            - [Task 2]  

            Week 5–6: [Improvement Area]  
            - [Task 1]  
            - [Task 2]  

            Week 7–8: [Internships/Certifications]  
            - [Task 1]  
            - [Task 2]  

            Week 9–10: [Resume & Networking]  
            - [Task 1]  
            - [Task 2]
            Important:

            Only generate the Roadmap in the above format.

            Do not include profile summaries, explanations, or emotional/motivational text."""
    response=model.generate_content(prompt)
    return response.text.strip() if response and response.text else "Some unknown error occurred. Please try again later."