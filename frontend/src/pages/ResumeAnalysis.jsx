import "../theme.css";
import {
FaCheckCircle,
FaTimesCircle,
FaBrain,
FaChartLine
}
from "react-icons/fa";

import {
useEffect,
useState
}
from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResumeAnalysis(){

const navigate=useNavigate();

const [result,setResult]=useState(null);

useEffect(()=>{

const career=
localStorage.getItem(
"selectedCareer"
);

const skills=
JSON.parse(
localStorage.getItem(
"resumeSkills"
)
)||[];

axios.post(
"http://127.0.0.1:8000/career-match",
{
career,
skills
}
)

.then((response)=>{

setResult(
response.data
);

localStorage.setItem(
"missingSkills",

JSON.stringify(
response.data.missing_skills
)
);

localStorage.setItem(
"matchedSkills",

JSON.stringify(
response.data.matched_skills
)
);

localStorage.setItem(
"matchScore",

response.data.score
);
const user =
JSON.parse(
localStorage.getItem("user") || "{}"
);

const email =
user.email || "guest";

const reportHistory =
JSON.parse(
localStorage.getItem(
`reportHistory_${email}`
) || "[]"
);

const newReport = {

id:
Date.now(),

resume:
localStorage.getItem(
"uploadedResume"
) || "Resume.pdf",

career:
career || "Not Selected",

score:
response.data.score,

matched:
response.data.matched_skills,

missing:
response.data.missing_skills,

date:
new Date()
.toLocaleString()

};

const alreadyExists =
reportHistory.some(

item =>

item.resume === newReport.resume &&

item.career === newReport.career &&

item.score === newReport.score

);

if(!alreadyExists){

reportHistory.unshift(
newReport
);

localStorage.setItem(

`reportHistory_${email}`,

JSON.stringify(
reportHistory
)

);

}

localStorage.setItem(

"analysisReport",

JSON.stringify(
newReport
)

);


});

},[]);

if(!result){

return(

<div className="page">

<div className="page-content">

<div
className="glass-card"
style={{
padding:"100px",
textAlign:"center"
}}
>

<h1>
🧠 Analyzing Resume
</h1>

<p className="subtitle">
AI is calculating
your readiness...
</p>

</div>

</div>

</div>

);

}

return(

<div className="page">

<div className="glow1"></div>
<div className="glow2"></div>

<div className="page-content">

<div
className="glass-card"
style={{
padding:"50px",
textAlign:"center"
}}
>

<h1 className="hero-title">

📊 Resume Analysis

</h1>

<p className="subtitle">

AI Career Matching Report

</p>

<div
style={{
display:"flex",
justifyContent:"center",
marginTop:"40px"
}}
>

<div
className="score-ring"
>

<div>

<h1>

{result.score}%

</h1>

<p>

MATCH

</p>

</div>

</div>

</div>

</div>

<br/>

<div className="grid-2">

<div className="glass-card">

<h2>

<FaCheckCircle/>

 Matched Skills

</h2>

<br/>

<div
className="skills-wrap"
>

{

result.matched_skills.map(
(skill,index)=>(

<div
key={index}
className="skill-chip"

>

✓ {skill}

</div>

)

)

}

</div>

</div>

<div className="glass-card">

<h2>

<FaTimesCircle/>

 Missing Skills

</h2>

<br/>

<div
className="skills-wrap"
>

{

result.missing_skills.map(
(skill,index)=>(

<div
key={index}
className="missing-chip"

>

✕ {skill}

</div>

)

)

}

</div>

</div>

</div>

<br/>

<div className="glass-card">

<h2>

<FaChartLine/>

 Career Recommendation

</h2>

<br/>

<p className="subtitle">

Complete roadmap and projects
to improve your score.

</p>

<br/>

<button
className="primary-btn"
onClick={()=>
navigate(
"/roadmap"
)
}
>

Generate Learning Roadmap →

</button>

</div>

</div>

</div>

);

}

export default ResumeAnalysis;