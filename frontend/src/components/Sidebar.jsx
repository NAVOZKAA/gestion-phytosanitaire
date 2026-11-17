import { Link, NavLink } from "react-router-dom"
import "../layouts/MainLayout.css"
import { useNavigate } from "react-router-dom";
import api from "../services/api";
function Sidebar() {
    const navigate = useNavigate();

const handleLogout = async () => {
    try {
        await api.post("/logout");
    } catch (error) {
        console.error("Erreur de déconnexion :", error);
    } finally {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    }
};
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
        <button onClick={handleLogout}>
    Déconnexion
</button>
            </nav></aside>
            
    )
}
export default Sidebar;