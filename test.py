import joblib
data={
  "gender": "Male",
  "branch": "ECE",
  "gpa": 9.4,
  "backlogs": 0,
  "attendance": 99,
  "internshipDone": "Yes",
  "Skills": [
    "Python"
  ],
  "Clubs": [
    "Literary Society, Robotics"
  ]
}
def predict(data):
    model = joblib.load(r"C:\Users\HP\Desktop\3rd year projects\Placement-assistant\models\placement_predictor.pkl")
    gender_encoder = joblib.load(r"C:\Users\HP\Desktop\3rd year projects\Placement-assistant\models\gender_encoder.pkl")
    branch_encoder = joblib.load(r"C:\Users\HP\Desktop\3rd year projects\Placement-assistant\models\branch_encoder.pkl")
    clubs_encoder = joblib.load(r"C:\Users\HP\Desktop\3rd year projects\Placement-assistant\models\clubs_encoder.pkl")
    internship_encoder = joblib.load(r"C:\Users\HP\Desktop\3rd year projects\Placement-assistant\models\internship_done_encoder.pkl")
    gender = gender_encoder.transform([data.get("gender")])[0]
    branch = branch_encoder.transform([data.get("branch")])[0]
    internship = internship_encoder.transform(["Yes" if data.get("internshipDone") else "No"])[0]
    clubs_string = ", ".join(data.get("Clubs")) if data.get("Clubs") else ""
    clubs = clubs_encoder.transform([clubs_string])[0] if clubs_string else 0
    skill_score = 0.88
    features = [[gender, branch, data.get("gpa"), data.get("backlogs"), data.get("attendance"), skill_score,internship,clubs]]
    placement_chance = model.predict_proba(features)
    #placement_chance = placement_chance[0]

    return placement_chance
chance=predict(data)
print(chance)