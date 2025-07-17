from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware
from utils import compute_skill_score
from gemini import generate_roadmap

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StudentData(BaseModel):
    gender: str
    branch: str
    gpa: float
    backlogs: int
    attendance: float
    internshipDone: bool
    Skills: list[str]
    Clubs: list[str]

@app.post("/predict")
def predict(data: StudentData):
    # Load model and encoders
    model = joblib.load(r"C:\Users\HP\Desktop\3rd year projects\Placement-assistant\models\placement_predictor.pkl")
    gender_encoder = joblib.load(r"C:\Users\HP\Desktop\3rd year projects\Placement-assistant\models\gender_encoder.pkl")
    branch_encoder = joblib.load(r"C:\Users\HP\Desktop\3rd year projects\Placement-assistant\models\branch_encoder.pkl")
    clubs_encoder = joblib.load(r"C:\Users\HP\Desktop\3rd year projects\Placement-assistant\models\clubs_encoder.pkl")
    internship_encoder = joblib.load(r"C:\Users\HP\Desktop\3rd year projects\Placement-assistant\models\internship_done_encoder.pkl")

    # Compute skill score
    skill_score = compute_skill_score(', '.join(data.Skills))

    # Encode categorical fields properly
    gender = gender_encoder.transform([data.gender])[0]
    branch = branch_encoder.transform([data.branch])[0]
    internship = internship_encoder.transform([str(data.internshipDone)])[0]
    clubs = clubs_encoder.transform([data.Clubs[0]])[0] if data.Clubs else 0

    # Predict placement
    features = [[gender, branch, data.gpa, data.backlogs, data.attendance, skill_score, internship, clubs]]
    placement_chance = model.predict(features)[0]

    # Generate roadmap
    roadmap = generate_roadmap(data, placement_chance)

    return {
        "placement_chance": placement_chance,
        "roadmap": roadmap
    }
