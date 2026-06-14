import { useEffect, useState } from "react";
import "../theme.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Roadmap() {

  const [roadmap, setRoadmap] =
    useState([]);

  const navigate =
    useNavigate();

  useEffect(() => {

    const missingSkills =
      JSON.parse(
        localStorage.getItem(
          "missingSkills"
        )
      ) || [];

    axios
      .post(
        "http://127.0.0.1:8000/roadmap",
        {
          missing_skills:
          missingSkills
        }
      )
      .then((response) => {

        setRoadmap(
          response.data.roadmap || []
        );

      })
      .catch(console.error);

  }, []);

  return (

    <div className="page">

      <div className="glow1"></div>
      <div className="glow2"></div>

      <div className="page-content">

        <h1 className="hero-title">
          Learning Roadmap
        </h1>

        <p className="subtitle">
          AI Generated Learning Path
          to become job-ready
        </p>

        <br />

        {roadmap.length === 0 ? (

          <div className="glass-card">

            <h2>
              Loading Roadmap...
            </h2>

          </div>

        ) : (

          roadmap.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="glass-card"
                style={{
                  marginBottom:"25px"
                }}
              >

                <h2>
                  Week {item.week}
                </h2>

                <br />

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width:
                      `${(index+1)
                      /
                      roadmap.length
                      *100}%`
                    }}
                  ></div>

                </div>

                <br />

                <h2>
                  {item.skill}
                </h2>

                <br />

                <p className="subtitle">
                  {item.task}
                </p>

                <br />

                <h3>
                  Learning Resources
                </h3>

                <br />

                <div>

                  {item.resources?.map(
                    (
                      resource,
                      i
                    ) => (

                      <a
                        key={i}
                        href={resource.url}
                        target="_blank"
                        rel="noreferrer"
                        className="resource-btn"
                      >
                        📚 {resource.title}
                      </a>

                    )
                  )}

                </div>

                <br />

                <div
                  style={{
                    display:"flex",
                    gap:"20px",
                    flexWrap:"wrap"
                  }}
                >

                  <span
                    className="skill-chip"
                  >
                    ⏱ 1 Week
                  </span>

                  <span
                    className="skill-chip"
                  >
                    🎯 Learn
                    {" "}
                    {item.skill}
                  </span>

                </div>

              </div>

            )
          )

        )}

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
                "/project-recommendations"
              )
            }
          >
            View Recommended Projects
          </button>

        </div>

      </div>

    </div>
  );
}

export default Roadmap;