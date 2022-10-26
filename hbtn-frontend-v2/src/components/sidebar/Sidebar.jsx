import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../header";
/* Components */
/* Styles */
import "./Sidebar.scss"

export default function Sidebar() {
    
    return (
        <div className="layaout-content">
            <Header />
            <Outlet />
        </div>
    );
}
