PROJECTS = {

    "Frontend Developer": [
        {
            "title": "Portfolio Website",
            "level": "Beginner"
        },
        {
            "title": "Weather App",
            "level": "Intermediate"
        },
        {
            "title": "E-Commerce Frontend",
            "level": "Advanced"
        }
    ],

    "Backend Developer": [
        {
            "title": "Student Management API",
            "level": "Beginner"
        },
        {
            "title": "Blog Backend",
            "level": "Intermediate"
        },
        {
            "title": "E-Commerce Backend",
            "level": "Advanced"
        }
    ],

    "Full Stack Developer": [
        {
            "title": "Task Manager",
            "level": "Beginner"
        },
        {
            "title": "Job Portal",
            "level": "Intermediate"
        },
        {
            "title": "Career GPS AI",
            "level": "Advanced"
        }
    ],

    "AI/ML Engineer": [
        {
            "title": "Spam Detector",
            "level": "Beginner"
        },
        {
            "title": "Movie Recommender",
            "level": "Intermediate"
        },
        {
            "title": "AI Chatbot",
            "level": "Advanced"
        }
    ],

    "Data Scientist": [
        {
            "title": "Sales Analysis Dashboard",
            "level": "Beginner"
        },
        {
            "title": "Customer Segmentation",
            "level": "Intermediate"
        },
        {
            "title": "Predictive Analytics System",
            "level": "Advanced"
        }
    ],

    "Data Analyst": [
        {
            "title": "Excel Sales Dashboard",
            "level": "Beginner"
        },
        {
            "title": "Power BI Dashboard",
            "level": "Intermediate"
        },
        {
            "title": "Retail Analytics Platform",
            "level": "Advanced"
        }
    ],

    "Cloud Engineer": [
        {
            "title": "AWS EC2 Deployment",
            "level": "Beginner"
        },
        {
            "title": "Cloud Storage System",
            "level": "Intermediate"
        },
        {
            "title": "Multi-Cloud Architecture",
            "level": "Advanced"
        }
    ],

    "DevOps Engineer": [
        {
            "title": "CI/CD Pipeline",
            "level": "Beginner"
        },
        {
            "title": "Docker Deployment",
            "level": "Intermediate"
        },
        {
            "title": "Kubernetes Cluster Setup",
            "level": "Advanced"
        }
    ],

    "Cybersecurity Analyst": [
        {
            "title": "Network Vulnerability Scanner",
            "level": "Beginner"
        },
        {
            "title": "Security Monitoring Dashboard",
            "level": "Intermediate"
        },
        {
            "title": "Enterprise Security Framework",
            "level": "Advanced"
        }
    ],

    "UI/UX Designer": [
        {
            "title": "Portfolio UI Design",
            "level": "Beginner"
        },
        {
            "title": "Food Delivery App Design",
            "level": "Intermediate"
        },
        {
            "title": "SaaS Product Design",
            "level": "Advanced"
        }
    ],

    "Mobile App Developer": [
        {
            "title": "Calculator App",
            "level": "Beginner"
        },
        {
            "title": "Expense Tracker App",
            "level": "Intermediate"
        },
        {
            "title": "Food Delivery Mobile App",
            "level": "Advanced"
        }
    ],

    "Product Manager": [
        {
            "title": "Product Requirement Document",
            "level": "Beginner"
        },
        {
            "title": "Product Roadmap Planning",
            "level": "Intermediate"
        },
        {
            "title": "End-to-End Product Strategy",
            "level": "Advanced"
        }
    ]
}


def get_projects(career):
    return PROJECTS.get(career, [])


def get_project_brief(career, level="Intermediate"):
    choices = PROJECTS.get(career, [])
    project = next((item for item in choices if item["level"].casefold() == level.casefold()), choices[0] if choices else {"title": "Career Portfolio Project", "level": level})
    skills = {"AI/ML Engineer": ["Python", "Pandas", "Scikit-learn", "FastAPI"], "Data Analyst": ["Python", "SQL", "Excel", "Power BI"], "Backend Developer": ["Python", "FastAPI", "MongoDB", "SQL"]}.get(career, ["Git", "Documentation", "Testing", "Deployment"])
    return {"project": project["title"], "difficulty": project["level"], "skills": skills, "dataset": "A public dataset or realistic sample data", "build_steps": ["Define the user problem and success metric", "Design and implement the core workflow", "Test edge cases and document decisions", "Deploy or record a short demo"], "resume_bullet": f"Built {project['title']} using {', '.join(skills[:3])}; documented the approach and measurable outcomes."}
