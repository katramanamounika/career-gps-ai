from services.career_matcher import CAREER_SKILLS

QUESTION_BANK = {
    "AI/ML Engineer": ["Explain the difference between classification and regression.", "How would you detect overfitting in a model?", "How would you deploy and monitor a model?"],
    "Data Analyst": ["How do you validate data quality before analysis?", "Explain a SQL JOIN using a business example.", "How would you present an insight to a non-technical stakeholder?"],
    "Backend Developer": ["How would you design a REST API for a task manager?", "What makes an API secure?", "When would you use an index in a database?"],
}


def generate_questions(career: str, skills: list[str]) -> list[dict]:
    questions = QUESTION_BANK.get(career, [])
    if not questions:
        questions = [f"How have you used {skill} in a project?" for skill in CAREER_SKILLS.get(career, skills)[:3]]
    return [{"id": index + 1, "question": question, "focus": career} for index, question in enumerate(questions)]


def evaluate_answer(question: str, answer: str) -> dict:
    words = len(answer.split())
    has_example = any(token in answer.casefold() for token in ("example", "project", "because", "result"))
    score = min(100, (35 if words >= 25 else words) + (25 if words >= 70 else 0) + (20 if has_example else 0))
    feedback = []
    if words < 70:
        feedback.append("Add more depth: explain the concept, your approach, and the result.")
    if not has_example:
        feedback.append("Use a concise project example to make the answer memorable.")
    if not feedback:
        feedback.append("Strong structure. Practice delivering it in under two minutes.")
    return {"score": score, "feedback": feedback, "improved_answer": f"A stronger answer would define the idea, explain your approach, and support it with a relevant project example. Your starting point: {answer.strip()}"}
