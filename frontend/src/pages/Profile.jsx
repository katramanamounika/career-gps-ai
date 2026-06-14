import "../theme.css";
import { useNavigate } from "react-router-dom";

function Profile() {

const navigate=
useNavigate();

const report=
JSON.parse(
localStorage.getItem(
"analysisReport"
)
);

const file=
localStorage.getItem(
"uploadedResume"
);

const date=
localStorage.getItem(
"uploadDate"
);

const downloadReport=()=>{

const text=`

CAREER GPS AI

Uploaded Resume:
${file}

Date:
${date}

Career:
${report?.career}

Score:
${report?.score}%

Matched Skills:

${report?.matched.join("\n")}

Missing Skills:

${report?.missing.join("\n")}

`;

const blob=
new Blob(
[text],
{
type:
"text/plain"
}
);

const url=
URL.createObjectURL(
blob
);

const a=
document.createElement(
"a"
);

a.href=url;

a.download=
"Career_Report.txt";

a.click();

};

return(

<div className="page">

<div className="glow1"/>
<div className="glow2"/>

<div className="page-content">

<h1
className="hero-title"
>

Profile

</h1>

<p className="subtitle">

Resume History & Analytics

</p>

<br/>

<div className="glass-card">

<h2>

Uploaded Resume

</h2>

<br/>

<div
className="profile-row"
>

📄

{file||

"No Resume Uploaded"

}

</div>

<br/>

<div
className="profile-row"
>

📅

{date||

"-"

}

</div>

</div>

<br/>

{report&&(

<>

<div
className="glass-card"
>

<h2>

Analysis Report

</h2>

<br/>

<div
className="score-ring"
>

{report.score}%

</div>

<br/>

<h3>

Matched Skills

</h3>

<div
className="skills"
>

{

report.matched.map(
(
s
)=>(

<div
className=
"skill success"

key={s}
>

{s}

</div>

)

)

}

</div>

<br/>

<h3>

Missing Skills

</h3>

<div
className="skills"
>

{

report.missing.map(
(
s
)=>(

<div
className=
"skill danger"

key={s}
>

{s}

</div>

)

)

}

</div>

</div>

<br/>

<div
style={{
display:"flex",
gap:"20px",
justifyContent:
"center"
}}
>

<button
className=
"primary-btn"

onClick={
downloadReport
}
>

Download Report

</button>

<button
className=
"primary-btn"

onClick={()=>{

localStorage.removeItem(
"selectedCareer"
);

navigate(
"/dashboard"
);

}}

>

Choose Another Career

</button>

</div>

</>

)}

</div>

</div>

);

}

export default Profile;