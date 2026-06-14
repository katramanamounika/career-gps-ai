import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import "../theme.css";

function CareerReadiness() {

  const [career, setCareer] =
    useState("");

  const [currentScore, setCurrentScore] =
    useState(0);

  const [matchedSkills, setMatchedSkills] =
    useState([]);

  const [missingSkills, setMissingSkills] =
    useState([]);
  const navigate= useNavigate();
  useEffect(() => {

    setCareer(
      localStorage.getItem(
        "selectedCareer"
      ) || ""
    );

    setCurrentScore(
      Number(
        localStorage.getItem(
          "matchScore"
        )
      ) || 0
    );

    setMatchedSkills(
      JSON.parse(
        localStorage.getItem(
          "matchedSkills"
        )
      ) || []
    );

    setMissingSkills(
      JSON.parse(
        localStorage.getItem(
          "missingSkills"
        )
      ) || []
    );

  }, []);

  const futureScore = 100;

  return (

    <div className="page">

      <div className="glow1"></div>
      <div className="glow2"></div>

      <div className="page-content">

        <h1 className="hero-title">
          Career Readiness Report
        </h1>

        <p className="subtitle">
          AI Generated Career Analysis
        </p>

        <br />

        <div className="grid-2">

          <div className="glass-card">

            <h2>
              Current Readiness
            </h2>

            <br />

            <div
              style={{
                width:"220px",
                margin:"auto"
              }}
            >

              <CircularProgressbar
                value={currentScore}
                text={`${currentScore}%`}
                styles={buildStyles({
                  textColor:"#fff",
                  pathColor:"#00F5FF",
                  trailColor:"#222"
                })}
              />

            </div>

          </div>

          <div className="glass-card">

            <h2>
              Future Potential
            </h2>

            <br />

            <div
              style={{
                width:"220px",
                margin:"auto"
              }}
            >

              <CircularProgressbar
                value={futureScore}
                text={`${futureScore}%`}
                styles={buildStyles({
                  textColor:"#fff",
                  pathColor:"#00FFA3",
                  trailColor:"#222"
                })}
              />

            </div>

          </div>

        </div>

        <br />

        <div className="grid-2">

          <div className="glass-card">

            <h2>
              Skills You Have
            </h2>

            <br />

            {matchedSkills.map(
              (
                skill,
                index
              ) => (

                <span
                  key={index}
                  className="skill-chip"
                >
                  ✅ {skill}
                </span>

              )
            )}

          </div>

          <div className="glass-card">

            <h2>
              Skills To Learn
            </h2>

            <br />

            {missingSkills.map(
              (
                skill,
                index
              ) => (

                <span
                  key={index}
                  className="skill-chip"
                >
                  🚀 {skill}
                </span>

              )
            )}

          </div>

        </div>

        <br />

        <div className="glass-card">

          <h2 className="section-title">
            Career Growth Forecast
          </h2>

          <br />

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width:
                `${currentScore}%`
              }}
            ></div>

          </div>

          <br />

          <p className="subtitle">

            Your current readiness
            is {currentScore}%.

            Completing roadmap tasks,
            projects and certifications
            can increase your readiness
            to 100%.

          </p>

        </div>

        <br />

        <div className="glass-card">

          <h2 className="section-title">
            Recommended Certifications
          </h2>

          <br />

          <div className="grid-3">

            <div className="skill-chip">
              ☁ AWS Certification
            </div>

            <div className="skill-chip">
              🌐 Google Cloud
            </div>

            <div className="skill-chip">
              💼 Microsoft Azure
            </div>

          </div>

        </div>

        <br />

        <div className="glass-card center">

          <h2>
            🎉 Congratulations
          </h2>

          <br />

          <p className="subtitle">

            You now have a complete
            AI-powered career journey.

            Continue learning,
            building projects and
            improving your portfolio
            to become job ready.

          </p>

        </div>
        <div
            style={{
            marginTop:"40px",
            display:"flex",
            gap:"20px"
            }}
        >

        <button
        className="primary-btn"

        onClick={()=>
        navigate(
        "/dashboard"
        )
        }
        >

        Download Report & Finish

        </button>

        </div>

      </div>

    </div>

  );
}

export default CareerReadiness;