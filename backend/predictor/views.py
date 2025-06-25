from django.http import JsonResponse
import joblib
import numpy as np # type: ignore
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse,HttpResponseNotAllowed
import json
from .utils.gemini import get_roadmap
model = joblib.load(r"predictor\models\placement_predictor.pkl")

@csrf_exempt
def predict_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        features = [ data["gender"], data["branch"],
            data["gpa"], data["backlogs"], data["attendance"],
            data["skill_score"], data["internship"], data["clubs"]
        ]
        probability = model.predict_proba([features])[0][1]
        return JsonResponse({"placement_chance": round(probability * 100, 2)})
    return HttpResponseNotAllowed(["POST"])

@csrf_exempt
def ai_summary_view(request):
    if request.method == "POST":
        data = json.loads(request.body)

        prompt = f"""
            A student has {data['chance']}% chance of getting placed.
            GPA: {data['gpa']}, Backlogs: {data['backlogs']}, Skills: {data['skills']}, Internship: {data['internship']}, Attendance: {data['attendance']}%.

            Generate a detailed 3-step personalized roadmap to improve their placement potential.
            """

        response_text = get_roadmap(prompt)
        return JsonResponse({"roadmap": response_text})
    return HttpResponseNotAllowed(["POST"])