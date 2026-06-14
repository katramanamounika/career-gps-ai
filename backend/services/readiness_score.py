def calculate_readiness(match_score):

    if match_score >= 80:
        level = "Job Ready"

    elif match_score >= 60:
        level = "Almost Ready"

    elif match_score >= 40:
        level = "Learning Stage"

    else:
        level = "Beginner"

    return {
        "score": match_score,
        "level": level
    }