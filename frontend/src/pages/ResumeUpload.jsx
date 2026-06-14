import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../theme.css";

function ResumeUpload() {

  const [file, setFile] = useState(null);

  const [resumeText, setResumeText] =
    useState("");

  const [skills, setSkills] =
    useState([]);

  const navigate = useNavigate();

 const handleUpload = async () => {

    if (!file) {

    alert(
    "Please select a PDF"
    );

    return;

    }

    const user =
    JSON.parse(
    localStorage.getItem("user") || "{}"
    );

    const email =
    user.email || "guest";

    const formData=
    new FormData();

    formData.append(
    "file",
    file
    );

    try{

    const response=
    await axios.post(

    "http://127.0.0.1:8000/upload-resume",

    formData,

    {
    headers:{
    "Content-Type":
    "multipart/form-data"
    }
    }

    );

    /* SAVE SKILLS */

    localStorage.setItem(

    "resumeSkills",

    JSON.stringify(
    response.data.skills
    )

    );

    /* SAVE HISTORY */

    const resumeHistory=

    JSON.parse(

    localStorage.getItem(
    `resumeHistory_${email}`
    )

    )||[];

    resumeHistory.unshift({

    id:
    Date.now(),

    name:
    file.name,

    career:

    localStorage.getItem(
    "selectedCareer"
    ),

    date:

    new Date()
    .toLocaleString()

    });

    localStorage.setItem(
    `resumeHistory_${email}`,

    JSON.stringify(
    resumeHistory
    )

    );

    localStorage.setItem(

    "uploadedResume",

    file?.name

    );

    localStorage.setItem(

    "resumeText",

    response.data.resume_text

    );

    localStorage.setItem(

    `uploadDate_${email}`,

    new Date()
    .toLocaleString()

    );

    /* UI */

    setResumeText(
    response.data.resume_text
    );

    setSkills(
    response.data.skills
    );

    /* NEXT PAGE */

    navigate(
    "/resume-analysis"
    );

    alert(
    "Resume Uploaded Successfully"
    );

    }

    catch(error){

    console.error(
    error
    );

    alert(
    "Upload Failed"
    );

    }

  };

  return (

    <div className="page">

      <div className="glow1"></div>
      <div className="glow2"></div>

      <div className="page-content">

        <h1 className="hero-title">
          Upload Resume
        </h1>

        <p className="subtitle">
          AI Resume Analyzer &
          Career Matching
        </p>

        <br />

        <div className="glass-card">

          <div className="upload-zone">

            <h1
              style={{
                fontSize:"5rem"
              }}
            >
              ☁️
            </h1>

            <h2>
              Drag & Drop Resume
            </h2>

            <p>
              Upload PDF Resume
            </p>

            <br />

            <input
            className="file-input"
            type="file"
            accept=".pdf"
            onChange={(e)=>
            setFile(
            e.target.files[0]
            )}
            />

          </div>

        </div>

        <br />

        {file && (

          <div className="glass-card">

            <h3>
              Selected File
            </h3>

            <p>
              📄 {file.name}
            </p>

          </div>

        )}

        <br />

        <div
          style={{
            textAlign:"center"
          }}
        >

          <button
            className="primary-btn"
            onClick={handleUpload}
          >
            Analyze Resume
          </button>

        </div>

        <br />

        {skills.length > 0 && (

          <div className="glass-card">

            <h2>
              Detected Skills
            </h2>

            <br />

            {skills.map(
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

        )}

      </div>

    </div>
  );
}

export default ResumeUpload;