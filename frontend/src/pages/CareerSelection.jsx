import { useNavigate } from "react-router-dom";
import { FaCompass } from "react-icons/fa";
import "../theme.css";

function CareerSelection() {

  const navigate = useNavigate();

  const careers = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "AI/ML Engineer",
    "Data Scientist",
    "Data Analyst",
    "Cloud Engineer",
    "DevOps Engineer",
    "Cybersecurity Analyst",
    "UI/UX Designer",
    "Mobile App Developer",
    "Product Manager"
  ];

  const selectCareer = (career) => {

    localStorage.setItem(
      "selectedCareer",
      career
    );

    navigate("/career-overview");
  };

  return (

    <div className="page-container">

      <div className="glow1"></div>
      <div className="glow2"></div>

      <h1 className="title">
        Choose Your Career Path
      </h1>

      <p className="subtitle">
        Select your dream career and
        start your AI-powered journey
      </p>

      <div className="career-grid">

        {careers.map((career)=>(

          <div
            key={career}
            className="glow-card career-box"
            onClick={() =>
              selectCareer(career)
            }
          >
            <span className="career-name">
              {career}
            </span>
          </div>

        ))}

      </div>

      <br />

      <div
        style={{
          display:"flex",
          justifyContent:"center",
          marginTop:"30px"
        }}
      >

        <button
          className="unknown-btn"
          onClick={() =>
            navigate("/career-guidance")
          }
        >
          <FaCompass
            style={{
              marginRight:"10px"
            }}
          />
          Help Me Discover My Career
        </button>

      </div>

    </div>

  );
}

export default CareerSelection;