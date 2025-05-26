import "bootstrap/dist/css/bootstrap.rtl.min.css";
import './App.css'
import 'leaflet/dist/leaflet.css';
import Index from "./Layout/Index.jsx";
import {Route, Router, Routes} from "react-router-dom";
import OTP from "./Pages/OTP.jsx";
import ForgetPassword from "./Pages/ForgetPassword.jsx";
import NewPassword from "./Pages/NewPassword.jsx";
import Terms from "./Pages/Terms.jsx";
import Register from "./Pages/Register.jsx";
import InviteBox from "./Pages/InviteBox.jsx";
import EmployeeDashboard from "./Pages/EmployeeDashboard.jsx";
import EnterConfirmation from "./Pages/EnterConfirmation.jsx";
import SuccesEntery from "./Pages/SuccesEntery.jsx";
import ExitConfirmation from "./Pages/ExitConfirmation.jsx";
import {ProfileProvider} from "./contexts/profile-context.jsx";
import CreateCompany from "./Pages/CreateCompany.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import History from "./Pages/History.jsx";
import Employees from "./Pages/Employees.jsx";
import NewEmployee from "./Pages/NewEmployee.jsx";
import Profile from "./Pages/Profile.jsx";
import LoginPage from "./Pages/Login.jsx";
import EmployeesTasks from "./Pages/EmployeesTasks.jsx";
import AddTask from "./Pages/AddTask.jsx";
import ViewEmployeeTask from "./Pages/ViewEmpolyeeTask.jsx";
import EditTask from "./Pages/EditTask.jsx";
import MyTasks from "./Pages/MyTasks.jsx";



function App() {

    return (
        <>
            {/*<ProfileProvider>*/}
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/otp" element={<OTP/>}/>
                    <Route path="/forget-password" element={<ForgetPassword/>}/>
                    <Route path="/new-password" element={<NewPassword/>}/>
                    <Route path="/terms" element={<Terms/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/invite-box" element={<InviteBox/>}/>
                    <Route path="/employee-dashboard" element={<EmployeeDashboard/>}/>
                    <Route path="/enter-confirmation" element={<EnterConfirmation/>}/>
                    <Route path="/exit-confirmation" element={<ExitConfirmation/>}/>
                    <Route path="/succesentery" element={<SuccesEntery/>}/>
                    <Route path="/create-company" element={<CreateCompany/>}/>
                    <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
                    <Route path="/history" element={<History/>}/>
                    <Route path="/employees" element={<Employees/>}/>
                    <Route path="/new-employees" element={<NewEmployee/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/employees-tasks" element={<EmployeesTasks/>}/>
                    <Route path="/add-task" element={<AddTask/>}/>
                    <Route path="/edit-task" element={<EditTask/>}/>
                    <Route path="/view-task" element={<ViewEmployeeTask/>}/>
                    <Route path="/my-tasks" element={<MyTasks/>}/>


                    {/*<Route path="*" element={<NotFound/>}/>*/}
                </Routes>
            {/*</ProfileProvider>*/}
        </>
    );
}

export default App
