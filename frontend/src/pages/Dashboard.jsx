import {
FaHome,
FaUserCircle,
FaFileAlt,
FaChartBar,
FaSignOutAlt
}
from "react-icons/fa";

import {
useState
}
from "react";

import {
useNavigate
}
from "react-router-dom";

import "./Dashboard.css";

function Dashboard(){

const [tab,setTab]=
useState(
"dashboard"
);

const user = (() => {
  try {
    const data = localStorage.getItem("user");

    if (!data || data === "undefined") {
      return {};
    }

    return JSON.parse(data);
  } catch {
    return {};
  }
})();

const email =
user?.email || "guest";

const reportHistory = (() => {
  try {

    const data =
    localStorage.getItem(
    `reportHistory_${email}`
    );

    if(!data){
      return [];
    }

    return JSON.parse(data);

  } catch {

    return [];

  }
})();

const resumeHistory = (() => {
  try {

    const data =
    localStorage.getItem(
    `resumeHistory_${email}`
    );

    if(!data){
      return [];
    }

    return JSON.parse(data);

  } catch {

    return [];

  }
})();

const navigate=
useNavigate();

const username=
user?.name
||
"User";


return(

<div className="dashboard">

<div className="sidebar">

<h1>

Career GPS AI

</h1>

<div
className={
tab==="dashboard"
?
"item active"
:
"item"
}
onClick={()=>
setTab(
"dashboard"
)
}
>

<FaHome/>

Dashboard

</div>

<div
className={
tab==="profile"
?
"item active"
:
"item"
}
onClick={()=>
setTab(
"profile"
)
}
>

<FaUserCircle/>

Profile

</div>

<div
className={
tab==="resume"
?
"item active"
:
"item"
}
onClick={()=>
setTab(
"resume"
)
}
>

<FaFileAlt/>

Resume History

</div>

<div
className={
tab==="report"
?
"item active"
:
"item"
}
onClick={()=>
setTab(
"report"
)
}
>

<FaChartBar/>

Reports

</div>
<div
className="item"
onClick={()=>{

const confirmReset=
window.confirm(
"Delete all Resume History and Reports?"
);

if(confirmReset){

localStorage.removeItem(
`resumeHistory_${email}`
);

localStorage.removeItem(
`reportHistory_${email}`
);

window.location.reload();

}

}}
>

🗑️ Reset History

</div>

<div
className="logout"

onClick={()=>{

localStorage.removeItem("user");

window.location="/";

}}

>

<FaSignOutAlt/>

Logout

</div>

</div>

<div className="main">

{tab==="dashboard"&&(

<>

<h1 className="welcome">

Welcome Back,<br/>

{username} 👋

</h1>

<div className="hero-card">

<div className="hero-left">

<h2>
🚀 Career Path
</h2>

<p>
Choose your preferred career path
</p>

</div>

<button
className="choose-btn"
onClick={()=>
navigate(
"/career-selection"
)
}
>

Choose Career

</button>

</div>

</>

)}

{tab==="profile"&&(

<div className="profile-card">

<div className="profile-avatar">

👩

</div>

<h2>

{user.name}

</h2>

<br/>

<p>

📧
{user.email}

</p>

<br/>

<p>

🏫
{user.college}

</p>

<br/>

<p>
🎓
{user.graduation_year}
</p>

</div>

)}

{tab==="resume"&&(

<div>

<h1 className="section-heading">

📂 Resume History

</h1>

<div className="history-grid">

{

resumeHistory.length===0

?

<div className="card">

No resumes uploaded

</div>

:

resumeHistory.map(

(item)=>(

<div
className="resume-card"

key={item.id}

>

<div className="resume-icon">

📄

</div>

<h3>

{item.name}

</h3>

<p>

🎯

{
item.career
||

"No Career"
}

</p>

<p>

📅

{
item.date
}

</p>

</div>

)

)

}

</div>

</div>

)}

{tab==="report"&&(

<div>

<h1>

Reports

</h1>

<div className="history-grid">

{

reportHistory.length===0

?

<div className="card">

No Reports Yet

</div>

:

reportHistory.map(

(item)=>(

<div
key={item.id}
className="report-card"
>

<h2>

📄
{
item.resume
}

</h2>

<br/>

<p>

🚀
{
item.career
}

</p>

<br/>

<h1>

{
item.score
}
%

</h1>

<br/>

<p>

📅
{
item.date
}

</p>

</div>

)

)

}

</div>

</div>

)}

</div>
</div>

);

}

export default Dashboard;    