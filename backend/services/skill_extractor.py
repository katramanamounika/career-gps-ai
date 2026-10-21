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
    "FastAPI", "Pandas", "NumPy", "Scikit-learn", "Deep Learning", "Docker",
    "AWS", "Azure", "Linux", "Kubernetes", "Power BI", "Excel", "Figma",
    "Firebase", "Flutter", "Dart", "Networking", "Data Visualization", "Statistics",
    "Node.js", "REST API", "CI/CD", "Cybersecurity", "Agile"
]

def extract_skills(text):

    found_skills = []

    for skill in SKILLS:

        if __import__("re").search(r"(?<![\w-])" + __import__("re").escape(skill) + r"(?![\w-])", text, __import__("re").IGNORECASE):
            found_skills.append(skill)

    return found_skills
