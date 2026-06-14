import { useEffect, useState } from "react";
import "../theme.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProjectRecommendations() {

  const [projects, setProjects] =
    useState([]);

  const navigate =
    useNavigate();

  useEffect(() => {

    const career =
      localStorage.getItem(
        "selectedCareer"
      );

    axios
      .post(
        "http://127.0.0.1:8000/projects",
        { career }
      )
      .then((response) => {

        setProjects(
          response.data.projects || []
        );

      })
      .catch(console.error);

  }, []);

  const getBadgeClass = (level) => {

    if (
      level?.toLowerCase() ===
      "beginner"
    ) {
      return "badge badge-green";
    }

    if (
      level?.toLowerCase() ===
      "intermediate"
    ) {
      return "badge badge-yellow";
    }

    return "badge badge-pink";
  };

  return (

    <div className="page">

      <div className="glow1"></div>
      <div className="glow2"></div>

      <div className="page-content">

        <h1 className="hero-title">
          Recommended Projects
        </h1>

        <p className="subtitle">
          Build industry-level projects
          to strengthen your portfolio
        </p>

        <br />

        <div className="grid-3">

          {projects.map(
            (
              project,
              index
            ) => (

              <div
                key={index}
                className="glass-card"
              >

                <div
                  style={{
                    fontSize:"3rem"
                  }}
                >
                  🚀
                </div>

                <br />

                <h2>
                  {project.title}
                </h2>

                <br />

                <span
                  className={
                    getBadgeClass(
                      project.level
                    )
                  }
                >
                  {project.level}
                </span>

                <br />
                <br />

                <p className="subtitle">

                  Complete this project
                  and showcase it in
                  your portfolio.

                </p>

                <br />

                <div
                  className="skill-chip"
                >
                  ⭐ Portfolio Ready
                </div>

              </div>

            )
          )}

        </div>

        <br />
        <br />

        <div className="glass-card">

          <h2 className="section-title">
            Why These Projects?
          </h2>

          <br />

          <p className="subtitle">

            These projects are selected
            based on your chosen career
            path and help recruiters
            evaluate practical skills.

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
                "/career-readiness"
              )
            }
          >
            Check Career Readiness
          </button>

        </div>

      </div>

    </div>

  );
}

export default ProjectRecommendations;