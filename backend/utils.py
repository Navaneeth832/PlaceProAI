import json
skill_score_map = {"python": 0.9210526315789473,
                    "sql": 0.9298245614035088,
                    "java": 0.9842105263157894,
                    "c++": 0.8105263157894737,
                    "web development": 1.0,
                    "machine learning": 0.8596491228070176,
                    "data science": 0.9017543859649123}
def compute_skill_score(skill_str):
    score = 0
    for skill in skill_str.split(','):
        skill = skill.strip().lower()
        score += skill_score_map.get(skill, 0.1)  
    return score    
