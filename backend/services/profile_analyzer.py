"""Lightweight, explainable resume analysis helpers.

The application deliberately keeps this local so students can use the core
experience without an API key or sending their resume to a third party.
"""
import re

from services.skill_extractor import extract_skills


SECTION_PATTERNS = {
    "education": r"\b(education|university|college|bachelor|master|b\.tech|bsc|msc)\b",
    "experience": r"\b(experience|internship|employment|work history|worked as)\b",
    "projects": r"\b(projects?|portfolio|github|built|developed)\b",
    "certifications": r"\b(certifications?|certificates?|courses?)\b",
}


def analyze_resume(text: str) -> dict:
    cleaned = " ".join((text or "").split())
    skills = extract_skills(cleaned)
    sections = {
        name: bool(re.search(pattern, cleaned, re.IGNORECASE))
        for name, pattern in SECTION_PATTERNS.items()
    }
    missing_sections = [name.title() for name, present in sections.items() if not present]
    quality_points = len(skills) * 6 + sum(sections.values()) * 12
    ats_score = min(100, max(18, quality_points))
    suggestions = []
    if not sections["projects"]:
        suggestions.append("Add 2–3 projects with the problem, tools used, and measurable outcome.")
    if not sections["experience"]:
        suggestions.append("Include internships, volunteering, freelancing, or relevant coursework as experience.")
    if len(skills) < 5:
        suggestions.append("Create a focused technical skills section using terms that appear in target job descriptions.")
    suggestions.append("Use action verbs and quantify impact where possible (for example, ‘reduced processing time by 25%’).")
    return {
        "skills": skills,
        "sections": sections,
        "missing_sections": missing_sections,
        "ats_score": ats_score,
        "suggestions": suggestions,
    }
