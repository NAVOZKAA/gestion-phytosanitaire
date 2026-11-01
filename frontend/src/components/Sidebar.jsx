import {Link } from "react-router-dom"

function Sidebar(){
    return( 
        <nav>
            <Link to="/">Dashboard</Link>  
            <Link to="/cultures">Cultures</Link>
        </nav>
    )
}
export default Sidebar;