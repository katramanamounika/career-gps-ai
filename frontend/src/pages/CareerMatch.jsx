import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import "../theme.css";

function CareerMatch() {

  const [result, setResult] =
    useState(null);

  const navigate =
    useNavigate();

  useEffect(() => {

    const career =
      localStorage.getItem(
        "selectedCareer"
      );

    const skills =
      JSON.parse(
        localStorage.getItem(
          "resumeSkills"
        )
      ) || [];

    if (!career) {

      navigate(
        "/career-selection"
      );

      return;
    }

    axios
      .post(
        "http://127.0.0.1:8000/career-match",
        {
          career,
          skills
        }
      )
      .then((response) => {

        setResult(
          response.data
        );

        localStorage.setItem(
          "matchScore",
          response.data.score
        );

        localStorage.setItem(
          "matchedSkills",
          JSON.stringify(
            response.data.matched_skills
          )
        );

        localStorage.setItem(
          "missingSkills",
          JSON.stringify(
            response.data.missing_skills
          )
        );

      })
      .catch(console.error);

  }, [navigate]);

  if (!result) {

    return (

      <div className="page">

        <div className="page-content">

          <h1 className="hero-title">
            Analyzing Resume...
          </h1>

        </div>

      </div>

    );
  }

  return (

    <div className="page">

      <div className="glow1"></div>
      <div className="glow2"></div>

      <div className="page-content">

        <h1 className="hero-title">
          Career Match Analytics
        </h1>

        <p className="subtitle">
          AI Powered Skill Analysis
        </p>

        <br />

        <div className="glass-card">

          <div
            style={{
              width:"220px",
              margin:"auto"
            }}
          >

            <CircularProgressbar
              value={result.score}
              text={`${result.score}%`}
              styles={buildStyles({
                textColor:"#fff",
                pathColor:"#00F5FF",
                trailColor:"#222"
              })}
            />

          </div>

          <h2
            style={{
              textAlign:"center",
              marginTop:"25px"
            }}
          >
            Career Match Score
          </h2>

        </div>

        <br />

        <div className="glass-card">

          <h2>
            Readiness Progress
          </h2>

          <br />

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width:
                `${result.score}%`
              }}
            ></div>

          </div>

          <br />

          <h3>
            {result.score}% Ready
          </h3>

        </div>

        <br />

        <div className="grid-2">

          <div className="glass-card">

            <h2>
              Skills You Have
            </h2>

            <br />

            {result.matched_skills.map(
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

            {result.missing_skills.map(
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

          <h2>
            AI Recommendation
          </h2>

          <br />

          <p className="subtitle">

            You are currently
            <strong>
              {" "}
              {result.score}% ready
            </strong>
            {" "}
            for this career.

            Complete the roadmap
            and recommended projects
            to reach full readiness.

          </p>

        </div>

        <br />

        <div
          style={{
            textAlign:"center"
          }}
        >

          <button
            className="primary-btn"
            onClick={() =>
              navigate(
                "/roadmap"
              )
            }
          >
            Generate Learning Roadmap
          </button>

        </div>

      </div>

    </div>

  );
}

export default CareerMatch;