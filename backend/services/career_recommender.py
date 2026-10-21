"""Explainable career recommendations using cosine similarity over skill vectors."""
from math import sqrt
from services.career_matcher import CAREER_SKILLS


def recommend_careers(skills: list[str], limit: int = 4) -> list[dict]:
    known = {skill.casefold() for skill in skills}
    results = []
    for career, requirements in CAREER_SKILLS.items():
        required = {skill.casefold() for skill in requirements}
        overlap = known & required
        # Cosine similarity keeps scores comparable across careers of different sizes.
        score = round((len(overlap) / sqrt(max(1, len(known)) * len(required))) * 100)
        results.append({
            "career": career,
            "match_score": min(100, score),
            "matched_skills": [skill for skill in requirements if skill.casefold() in overlap],
            "next_skills": [skill for skill in requirements if skill.casefold() not in overlap][:3],
        })
    return sorted(results, key=lambda item: item["match_score"], reverse=True)[:limit]
