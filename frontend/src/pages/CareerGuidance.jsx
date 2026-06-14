import { useNavigate } from "react-router-dom";

function CareerGuidance() {

  const navigate = useNavigate();

  const careers = [
    {
      name: "Frontend Developer",
      description:
        "Builds websites and user interfaces using HTML, CSS, JavaScript and React.",
      salary: "₹5-12 LPA",
      demand: "High"
    },

    {
      name: "Backend Developer",
      description:
        "Builds APIs, databases and server-side applications using Python, FastAPI and MongoDB.",
      salary: "₹6-15 LPA",
      demand: "High"
    },

    {
      name: "Full Stack Developer",
      description:
        "Works on both frontend and backend applications.",
      salary: "₹8-20 LPA",
      demand: "Very High"
    },

    {
      name: "AI/ML Engineer",
      description:
        "Builds Artificial Intelligence and Machine Learning systems.",
      salary: "₹10-25 LPA",
      demand: "Very High"
    },

    {
      name: "Data Scientist",
      description:
        "Analyzes large datasets and creates predictive models.",
      salary: "₹8-22 LPA",
      demand: "High"
    },

    {
      name: "Data Analyst",
      description:
        "Finds business insights using Excel, SQL and Power BI.",
      salary: "₹5-12 LPA",
      demand: "High"
    },

    {
      name: "Cloud Engineer",
      description:
        "Manages cloud infrastructure using AWS and Azure.",
      salary: "₹8-20 LPA",
      demand: "High"
    },

    {
      name: "DevOps Engineer",
      description:
        "Automates deployment pipelines and infrastructure.",
      salary: "₹8-18 LPA",
      demand: "High"
    },

    {
      name: "Cybersecurity Analyst",
      description:
        "Protects systems from cyber attacks and security threats.",
      salary: "₹6-18 LPA",
      demand: "High"
    },

    {
      name: "UI/UX Designer",
      description:
        "Designs user-friendly and visually appealing products.",
      salary: "₹4-12 LPA",
      demand: "Medium"
    },

    {
      name: "Mobile App Developer",
      description:
        "Builds Android and iOS applications using Flutter or React Native.",
      salary: "₹6-15 LPA",
      demand: "High"
    },

    {
      name: "Product Manager",
      description:
        "Leads product development and business strategy.",
      salary: "₹10-30 LPA",
      demand: "High"
    }
  ];

  const selectCareer = (career) => {

    localStorage.setItem(
      "selectedCareer",
      career
    );

    navigate("/career-overview");
  };

  return (

    <div className="page">

        <div className="glow1"></div>
        <div className="glow2"></div>

        <div className="page-content">

        <h1 className="hero-title">
            Career Guidance
        </h1>

        <p className="subtitle">
            Explore different career paths
            and discover the best future
            for your interests and skills.
        </p>

        <div className="guidance-grid">

            {careers.map((career) => (

            <div
                key={career.name}
                className="glass-card guidance-card clickable-card"
                onClick={() =>
                    selectCareer(career.name)
                }
            >

                <div>

                <h2>
                    {career.name}
                </h2>

                <p className="guidance-desc">
                    {career.description}
                </p>

                <div className="info-row">

                    <span>
                    Salary
                    </span>

                    <span className="salary-tag">
                    {career.salary}
                    </span>

                </div>

                <div className="info-row">

                    <span>
                    Demand
                    </span>

                    <span className="demand-tag">
                    {career.demand}
                    </span>

                </div>

                </div>
                <div
                    style={{
                        marginTop:"20px",
                        color:"#00F5FF",
                        fontWeight:"600"
                    }}
                >
                  Explore Career →
                </div>

                

            </div>

            ))}

        </div>

        </div>

    </div>
  );
}

export default CareerGuidance;