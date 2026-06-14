import { Link } from "react-router-dom";

function Navbar(){

return(

<nav
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"20px 0"
}}
>

<h2
style={{
color:"#00F5FF"
}}
>
Career GPS AI
</h2>

<div
style={{
display:"flex",
gap:"20px"
}}
>

<Link to="/dashboard">
Dashboard
</Link>

<Link to="/career-selection">
Careers
</Link>

</div>

</nav>

);
}

export default Navbar;