import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CareerOverview() {
  const navigate = useNavigate();

  const [career, setCareer] = useState("");

  useEffect(() => {
    const selectedCareer =
      localStorage.getItem("selectedCareer");

    setCareer(selectedCareer);
  }, []);

  const careerDetails = {

    "Frontend Developer": {
      description:
        "Builds websites and user interfaces that users interact with.",

      salary: "₹5-12 LPA",

      demand: "High",

      suitableFor:
        "Creative people who enjoy designing and coding web applications.",

      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Git",
        "GitHub"
      ],

      growth:
        "Junior Developer → Frontend Developer → Senior Developer → Frontend Architect",

      future:
        "Excellent demand due to increasing web applications.",

      work:
        "Build pages, create UI components, improve user experience."
    },

    "Backend Developer": {
      description:
        "Builds APIs, databases and server-side applications.",

      salary: "₹6-15 LPA",

      demand: "High",

      suitableFor:
        "People who enjoy logic, databases and application architecture.",

      skills: [
        "Python",
        "FastAPI",
        "MongoDB",
        "SQL",
        "Git"
      ],

      growth:
        "Junior Backend Developer → Backend Developer → Senior Backend Developer → Solution Architect",

      future:
        "Strong demand in startups and enterprise companies.",

      work:
        "Develop APIs, manage databases and business logic."
    },

    "Full Stack Developer": {
      description:
        "Works on both frontend and backend development.",

      salary: "₹8-20 LPA",

      demand: "Very High",

      suitableFor:
        "People interested in building complete applications.",

      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Python",
        "FastAPI",
        "MongoDB"
      ],

      growth:
        "Junior Full Stack → Full Stack Developer → Senior Full Stack → Tech Lead",

      future:
        "One of the most demanded software roles.",

      work:
        "Develop complete applications from frontend to backend."
    },

    "AI/ML Engineer": {
      description:
        "Builds Artificial Intelligence and Machine Learning systems.",

      salary: "₹10-25 LPA",

      demand: "Very High",

      suitableFor:
        "People interested in AI, mathematics and data.",

      skills: [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "Pandas"
      ],

      growth:
        "ML Intern → ML Engineer → Senior AI Engineer → AI Architect",

      future:
        "Extremely high demand worldwide.",

      work:
        "Train models, build AI applications and analyze datasets."
    },

    "Data Scientist": {
      description:
        "Analyzes data and builds predictive models.",

      salary: "₹8-22 LPA",

      demand: "High",

      suitableFor:
        "People who enjoy data analysis and problem solving.",

      skills: [
        "Python",
        "Statistics",
        "Pandas",
        "NumPy",
        "Machine Learning"
      ],

      growth:
        "Analyst → Data Scientist → Senior Data Scientist → Head of Data",

      future:
        "Strong growth due to increasing data-driven decisions.",

      work:
        "Analyze data and generate business insights."
    },

    "Data Analyst": {
      description:
        "Uses data to find business insights.",

      salary: "₹5-12 LPA",

      demand: "High",

      suitableFor:
        "People interested in business and analytics.",

      skills: [
        "Excel",
        "SQL",
        "Power BI",
        "Python"
      ],

      growth:
        "Junior Analyst → Data Analyst → Senior Analyst → Analytics Manager",

      future:
        "High demand in all industries.",

      work:
        "Create reports and dashboards."
    },

    "Cloud Engineer": {
      description:
        "Designs and manages cloud infrastructure.",

      salary: "₹8-20 LPA",

      demand: "High",

      suitableFor:
        "People interested in servers and cloud platforms.",

      skills: [
        "AWS",
        "Azure",
        "Linux",
        "Docker",
        "Networking"
      ],

      growth:
        "Cloud Associate → Cloud Engineer → Senior Cloud Engineer → Cloud Architect",

      future:
        "Cloud adoption continues to grow rapidly.",

      work:
        "Deploy and manage cloud resources."
    },

    "DevOps Engineer": {
      description:
        "Automates deployment and infrastructure.",

      salary: "₹8-18 LPA",

      demand: "High",

      suitableFor:
        "People who enjoy automation and system management.",

      skills: [
        "Docker",
        "Kubernetes",
        "CI/CD",
        "Linux",
        "Git"
      ],

      growth:
        "DevOps Associate → DevOps Engineer → Senior DevOps Engineer → DevOps Architect",

      future:
        "Very strong demand in modern software teams.",

      work:
        "Automate deployments and infrastructure."
    },

    "Cybersecurity Analyst": {
      description:
        "Protects systems from cyber attacks.",

      salary: "₹6-18 LPA",

      demand: "High",

      suitableFor:
        "People interested in security and ethical hacking.",

      skills: [
        "Networking",
        "Linux",
        "Ethical Hacking",
        "Security"
      ],

      growth:
        "Security Analyst → Security Engineer → Security Architect",

      future:
        "Cybersecurity demand increases every year.",

      work:
        "Monitor threats and secure systems."
    },

    "UI/UX Designer": {
      description:
        "Designs attractive and user-friendly experiences.",

      salary: "₹4-12 LPA",

      demand: "Medium",

      suitableFor:
        "Creative people who enjoy design and user psychology.",

      skills: [
        "Figma",
        "Wireframing",
        "Prototyping",
        "User Research"
      ],

      growth:
        "Junior Designer → UI/UX Designer → Senior Designer → Design Lead",

      future:
        "Growing demand for digital products.",

      work:
        "Create wireframes and user interfaces."
    },

    "Mobile App Developer": {
      description:
        "Builds Android and iOS applications.",

      salary: "₹6-15 LPA",

      demand: "High",

      suitableFor:
        "People interested in mobile technologies.",

      skills: [
        "Flutter",
        "Dart",
        "Firebase",
        "REST APIs"
      ],

      growth:
        "Junior Mobile Developer → Mobile Developer → Senior Mobile Developer",

      future:
        "Strong demand due to mobile-first businesses.",

      work:
        "Develop and maintain mobile apps."
    },

    "Product Manager": {
      description:
        "Leads product strategy and business decisions.",

      salary: "₹10-30 LPA",

      demand: "High",

      suitableFor:
        "People with leadership and communication skills.",

      skills: [
        "Communication",
        "Leadership",
        "Agile",
        "Product Strategy"
      ],

      growth:
        "Associate PM → Product Manager → Senior PM → Head of Product",

      future:
        "Growing demand in technology companies.",

      work:
        "Plan products and coordinate teams."
    }
  };

  const details = careerDetails[career];

  return (

  <div className="page">

  <div className="glow1"></div>
  <div className="glow2"></div>

  <div className="page-content">

  <h1 className="hero-title">
  {career}
  </h1>

  <p className="subtitle">
  {details?.description}
  </p>

  <br />

  <div className="grid-3">

  <div className="glass-card stat-card">
  <div className="stat-value">
  {details?.salary}
  </div>

  <div className="stat-label">
  Average Salary
  </div>
  </div>

  <div className="glass-card stat-card">
  <div className="stat-value">
  {details?.demand}
  </div>

  <div className="stat-label">
  Market Demand
  </div>
  </div>

  <div className="glass-card stat-card">
  <div className="stat-value">
  🚀
  </div>

  <div className="stat-label">
  Future Scope
  </div>
  </div>

  </div>

  <br /><br />

  <div className="glass-card">

  <h2 className="section-title">
  Suitable For
  </h2>

  <p className="subtitle">
  {details?.suitableFor}
  </p>

  </div>

  <br />

  <div className="glass-card">

  <h2 className="section-title">
  Required Skills
  </h2>

  <div>

  {details?.skills.map(
  (skill,index)=>(

  <span
  key={index}
  className="skill-chip"
  >
  {skill}
  </span>

  )
  )}

  </div>

  </div>

  <br />

  <div className="glass-card">

  <h2 className="section-title">
  Career Growth Roadmap
  </h2>

  <div className="timeline">

  <div className="timeline-item">
  <h4>Career Path</h4>

  <p>
  {details?.growth}
  </p>
  </div>

  <div className="timeline-item">
  <h4>Future Outlook</h4>

  <p>
  {details?.future}
  </p>
  </div>

  <div className="timeline-item">
  <h4>Day To Day Work</h4>

  <p>
  {details?.work}
  </p>
  </div>

  </div>

  </div>

  <br />

  <div
  style={{
  textAlign:"center"
  }}
  >

  <button
  className="primary-btn"
  onClick={()=>
  navigate("/resume-upload")
  }
  >
  Continue To Resume Upload
  </button>

  </div>

  </div>

  </div>

  );
}

export default CareerOverview;