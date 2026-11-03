import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import "./MainLayout.css"
function MainLayout() {
    return (
        <div className="layout">
            <Sidebar />

            <div className="content-area">
                <Header />

                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>)
}
export default MainLayout;