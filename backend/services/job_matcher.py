from services.skill_extractor import extract_skills


def analyze_job_description(description: str, resume_skills: list[str]) -> dict:
    job_skills = extract_skills(description)
    resume_set = {skill.casefold() for skill in resume_skills}
    matched = [skill for skill in job_skills if skill.casefold() in resume_set]
    missing = [skill for skill in job_skills if skill.casefold() not in resume_set]
    score = round(100 * len(matched) / len(job_skills)) if job_skills else 0
    return {
        "job_skills": job_skills,
        "matched_skills": matched,
        "missing_skills": missing,
        "match_score": score,
        "priority": missing[:4],
    }
