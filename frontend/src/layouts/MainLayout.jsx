import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Test from "../components/Header";

function MainLayout(){ 
    return( <div>
        <Sidebar/>
         <Header/>
        <main>
            <Outlet/>
        </main>
    </div>)
}
export default MainLayout;