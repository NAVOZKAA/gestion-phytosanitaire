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
                <NavLink to="/historique">Historique</NavLink>
                <NavLink to="/alertes">Alertes</NavLink>
                <NavLink to="/applications">applications</NavLink>

            </nav></aside>
    )
}
export default Sidebar;