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