/* Components */
import { ReportsComponent } from "./subcomponents/reportsComponent/ReportsComponent";
import { Student } from "./subcomponents/studentComponent/Student";
import { Students } from "./subcomponents/studentsComponent/Students";

/* Styles */
import "./adminHome.scss";

export function AdminHome() {
    return (
            <div className="content-AdminHome">
                <div className="components-content">
                    <h1>Cohorts Activas</h1>
                    <Students />
                    {/* <Student /> */}
                    {/* <ReportsComponent /> */}
                </div>
            </div>
    );
}