import { Link, NavLink } from "react-router-dom"
import "../layouts/MainLayout.css"
function Sidebar() {
    return (
        <aside className="sidebar">
            <nav>
                <NavLink to="/" end>Dashboard</NavLink>
                <NavLink to="/cultures">Cultures</NavLink>
                <NavLink to="/maladies">Maladies</NavLink>
                <NavLink to="/traitements">Traitements</NavLink>
                <NavLink to="/alertes">Alertes</NavLink>
                <NavLink to="/applications">Applications</NavLink>
                <NavLink to="/historiques">Historiques</NavLink>

            </nav></aside>
    )
}
export default Sidebar;