SKILLS = [
    "Python",
    "Java",
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "SQL",
    "HTML",
    "CSS",
    "Git",
    "GitHub",
    "Machine Learning",
    "TensorFlow",
    "FastAPI"
]

def extract_skills(text):

    found_skills = []

    for skill in SKILLS:

        if skill.lower() in text.lower():
            found_skills.append(skill)

    return found_skills