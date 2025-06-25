const BASE_URL = "http://127.0.0.1:8000/api"; // Change when deployed

interface FormData {
  age: string;
  gender: string;
  branch: string;
  gpa: string;
  attendance: string;
  backlogs: string;
  skills: string;
  internshipDone: string;
  clubs?: string;
}

export async function predictPlacement(formData: unknown) {
  const requestBody = {
    age: parseInt(formData.age),
    gender: formData.gender === 'Male' ? 1 : formData.gender === 'Female' ? 0 : 2,
    branch: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT", "Other"].indexOf(formData.branch),
    gpa: parseFloat(formData.gpa),
    attendance: parseFloat(formData.attendance),
    backlogs: parseInt(formData.backlogs),
    skill_score: calculateSkillScore(formData.skills),
    internship: formData.internshipDone === "Yes" ? 1 : 0,
    clubs: formData.clubs?.trim() ? 1 : 0,
  };

  const res = await fetch(`${BASE_URL}/predict/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  return res.json();
}

export async function generateRoadmap(formData: unknown, chance: number) {
  const res = await fetch(`${BASE_URL}/ai-summary/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chance: chance,
      gpa: formData.gpa,
      backlogs: formData.backlogs,
      skills: formData.skills,
      internship: formData.internshipDone,
      attendance: formData.attendance,
    }),
  });

  return res.json();
}

function calculateSkillScore(skills: string): number {
  const skillList = skills.split(",").map(s => s.trim().toLowerCase());
  const highValueSkills = ["python", "machine learning", "react", "django", "sql", "data analysis"];
  let score = 0;

  for (let skill of skillList) {
    if (highValueSkills.includes(skill)) score += 1.5;
    else if (skill.length > 0) score += 0.8;
  }

  return Math.round(score * 10) / 10; // rounded score
}
