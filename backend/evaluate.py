import os
import google.generativeai as genai
from dotenv import load_dotenv
import json

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-pro")

def evaluate_answer(question, expected, criteria, user_answer):
    prompt = f"""
    You are a strict technical interviewer.

    Evaluate the following:
    - Question: {question}
    - Expected Answer: {expected}
    - Evaluation Criteria: {criteria}
    - User Answer: {user_answer}

    Respond in this JSON format ONLY:

    {{
      "score_out_of_10": <integer>,
      "feedback": "<what the user did well and poorly>",
      "improvement": "<specific suggestions to improve>"
    }}
    """

    try:
        response = model.generate_content(prompt)
        json_text = response.text.strip().split("```json")[-1].split("```")[0].strip()
        return json.loads(json_text)
    except Exception as e:
        print("Error evaluating:", e)
        return {
            "score_out_of_10": 0,
            "feedback": "Could not evaluate.",
            "improvement": "Try again."
        }

def evaluate_all(questions_with_user_answers):
    total_score = 0
    results = []

    for item in questions_with_user_answers:
        res = evaluate_answer(
            item["question"],
            item["expected_answer"],
            item["evaluation_criteria"],
            item["user_answer"]
        )
        res["question"] = item["question"]
        results.append(res)
        total_score += res["score_out_of_10"]

    score_percentage = round((total_score / (len(results) * 10)) * 100, 2)

    summary_prompt = f"""
    Summarize this interview performance briefly (max 3 lines) and list 2-3 key areas to improve.
    Data:
    {json.dumps(results, indent=2)}
    
    Respond in JSON:
    {{
      "performance_summary": "<overall performance summary>",
      "areas_to_improve": ["point 1", "point 2"]
    }}
    """

    try:
        final_response = model.generate_content(summary_prompt)
        summary_json = final_response.text.strip().split("```json")[-1].split("```")[0].strip()
        summary = json.loads(summary_json)
    except:
        summary = {
            "performance_summary": "Could not summarize.",
            "areas_to_improve": ["N/A"]
        }

    return {
        "score_percentage": score_percentage,
        "detailed_feedback": results,
        "summary": summary
    }
evaluate_all(questions_with_user_answers = [
    {
        "question": "Explain the difference between var, let and const in JavaScript.",
        "expected_answer": "var is function scoped; let and const are block scoped. const cannot be reassigned.",
        "evaluation_criteria": "Clarity on scope, mutability, and syntax differences.",
        "user_answer": "let is for changing variables, const is fixed. I don’t use var."
    },
    {
        "question": "What is a closure in JavaScript?",
        "expected_answer": "A closure gives access to an outer function’s scope from an inner function.",
        "evaluation_criteria": "Must mention lexical scope, outer function, inner function relationship.",
        "user_answer": "It’s a function inside another function."
    }
]
)