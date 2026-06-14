import { useNavigate } from "react-router-dom";

import {
FaBrain,
FaMapMarkedAlt,
FaRocket,
FaChartLine
}
from "react-icons/fa";

import "../theme.css";

function LandingPage(){

const navigate=
useNavigate();

const features=[

{
icon:<FaBrain/>,
title:"AI Career Match",
desc:
"Analyze skills and discover ideal career paths."
},

{
icon:<FaMapMarkedAlt/>,
title:"Learning Roadmap",
desc:
"Generate step-by-step learning plans."
},

{
icon:<FaRocket/>,
title:"Projects",
desc:
"Build portfolio projects for growth."
},

{
icon:<FaChartLine/>,
title:"Career Readiness",
desc:
"Track progress and improve job readiness."
}

];

return(

<div className="page">

<div className="glow1"></div>
<div className="glow2"></div>

<div className="page-content">

<nav
className="landing-nav"
>

<div className="logo">

Career GPS AI

</div>

<div>

<button
className="nav-btn"

onClick={()=>
navigate(
"/login"
)
}
>

Login

</button>

<button
className="primary-btn"

onClick={()=>
navigate(
"/signup"
)
}
>

Signup

</button>

</div>

</nav>

<section
className="hero"
>

<h1
className="hero-title"
>

Your Career.
Powered By AI.

</h1>

<p
className="subtitle"
>

Upload resume •
Match skills •
Generate roadmap •
Build projects •
Become job ready

</p>

<div
className="hero-buttons"
>

<button
className="primary-btn"

style={{
padding:
"18px 55px",

fontSize:
"20px"
}}

onClick={()=>
navigate(
"/signup"
)
}
>

Start Your Journey

</button>

</div>

</section>

<section>

<h2
className=
"section-title"
>

Everything In One Place

</h2>

<div
className=
"grid-4"
>

{

features.map(
(
item,
index
)=>(

<div
key={index}

className=
"glass-card feature-card"
>

<div
className=
"feature-icon"
>

{item.icon}

</div>

<h3>

{item.title}

</h3>

<p>

{item.desc}

</p>

</div>

)

)

}

</div>

</section>



</div>

</div>

);

}

export default LandingPage;