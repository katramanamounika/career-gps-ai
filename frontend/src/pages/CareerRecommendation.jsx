import { useNavigate } from "react-router-dom";

function CareerRecommendation() {
  const navigate = useNavigate();

  const chooseCareer = () => {
    localStorage.setItem(
      "selectedCareer",
      "Frontend Developer"
    );

    navigate("/career-overview");
  };

  return (
    <div>
      <h1>Career Recommendation</h1>

      <p>
        Based on your answers, we recommend:
      </p>

      <h2>Frontend Developer</h2>

      <button onClick={chooseCareer}>
        Select Career
      </button>
    </div>
  );
}

export default CareerRecommendation;