CAREER_SKILLS = {
    "Frontend Developer": ["HTML","CSS","JavaScript","React","Git","GitHub"],

    "Backend Developer": ["Python","FastAPI","MongoDB","SQL","Git","GitHub"],

    "Full Stack Developer": ["HTML","CSS","JavaScript","React","Python","FastAPI","MongoDB"],

    "AI/ML Engineer": ["Python","Machine Learning","Deep Learning","TensorFlow","Pandas"],

    "Data Scientist": ["Python","Statistics","Pandas","NumPy","Machine Learning"],

    "Data Analyst": ["Excel","SQL","Power BI","Python","Data Visualization"],

    "Cloud Engineer": ["AWS","Azure","Linux","Docker","Networking"],

    "DevOps Engineer": ["Docker","Kubernetes","CI/CD","Linux","Git"],

    "Cybersecurity Analyst": ["Networking","Linux","Ethical Hacking","Security"],

    "UI/UX Designer": ["Figma","Wireframing","Prototyping","User Research"],

    "Mobile App Developer": ["Flutter","Dart","Firebase","API"],

    "Product Manager": ["Communication","Leadership","Agile","Product Strategy"]
}

def calculate_match(career, skills):

    required_skills = CAREER_SKILLS.get(career, [])

    matched = []

    for skill in skills:
        if skill in required_skills:
            matched.append(skill)

    score = int(
        (len(matched) / len(required_skills)) * 100
    ) if required_skills else 0

    missing_skills = list(
        set(required_skills) - set(matched)
    )

    return {
        "score": score,
        "matched_skills": matched,
        "missing_skills": missing_skills
    }