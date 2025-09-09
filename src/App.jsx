import "bootstrap/dist/css/bootstrap.rtl.min.css";
import './App.css'
import 'leaflet/dist/leaflet.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import OTP from "./Pages/auth/OTP.jsx";
import ForgotPassword from "./Pages/auth/ForgotPassword.jsx";
import NewPassword from "./Pages/auth/NewPassword.jsx";
import Terms from "./Pages/auth/Terms.jsx";
import Register from "./Pages/auth/Register.jsx";
import InviteBox from "./Pages/InviteBox.jsx";
import EmployeeDashboard from "./Pages/employe/EmployeeDashboard.jsx";
import EnterConfirmation from "./Pages/admin/AdminEnterConfirmation.jsx";
import ExitConfirmation from "./Pages/admin/AdminExitConfirmation.jsx";
import CreateCompany from "./Pages/CreateCompany.jsx";
import AdminDashboard from "./Pages/admin/AdminDashboard.jsx";
import History from "./Pages/admin/History.jsx";
import EmployeesList from "./Pages/admin/EmployeesList.jsx";
import NewEmployee from "./Pages/admin/NewEmployee.jsx";
import LoginPage from "./Pages/auth/Login.jsx";
import EmployeesTasks from "./Pages/admin/EmployeesTasks.jsx";
import AddTask from "./Pages/admin/AddTask.jsx";
import EditTask from "./Pages/admin/EditTask.jsx";
import MyTasks from "./Pages/employe/MyTasks.jsx";
import IndexAuth from "./Pages/auth/IndexAuth.jsx";
import IndexAdmin from "./Pages/admin/IndexAdmin.jsx";
import IndexEmployee from "./Pages/employe/IndexEmployee.jsx";
import OtpResetPassword from "./Pages/auth/OtpResetPassword.jsx";
import {AuthProvider} from "./Context/AuthContext.jsx";
import AdminProfile from "./Pages/admin/AdminProfile.jsx";
import EmployeeProfile from "./Pages/employe/EmployeeProfile.jsx";
import AdminEnterConfirmation from "./Pages/admin/AdminEnterConfirmation.jsx";
import AdminExitConfirmation from "./Pages/admin/AdminExitConfirmation.jsx";
import EmployeeSuccessEntry from "./Pages/employe/EmployeeSuccessEntry.jsx";
import AdminSuccessEntry from "./Pages/admin/AdminSuccessEntry.jsx";



function App() {
    return (
        <>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Navigate to={"/auth/login"}/> }/>
                        <Route path={"/auth"} element={<IndexAuth/>}>
                            <Route path={"login"} element={<LoginPage/>}/>
                            <Route path={"register"} element={<Register/>}/>
                            <Route path={"otp"} element={<OTP/>}/>
                            <Route path={"forgot-password"} element={<ForgotPassword/>}/>
                            <Route path={"otp-reset-password"} element={<OtpResetPassword/>}/>
                            <Route path={"new-password"} element={<NewPassword/>}/>
                            <Route path="terms" element={<Terms/>}/>
                        </Route>
                        <Route path={"/admin"} element={<IndexAdmin/>}>
                            <Route index element={<AdminDashboard/>}/>
                            <Route path="employees-tasks" element={<EmployeesTasks/>}/>
                            <Route path="add-task" element={<AddTask/>}/>
                            <Route path="edit-task" element={<EditTask/>}/>
                            <Route path="enter-confirmation" element={<AdminEnterConfirmation/>}/>
                            <Route path="exit-confirmation" element={<AdminExitConfirmation/>}/>
                            <Route path="success-entry" element={<AdminSuccessEntry/>}/>
                            <Route path="history" element={<History/>}/>
                            <Route path="employees" element={<EmployeesList/>}/>
                            <Route path="new-employees" element={<NewEmployee/>}/>
                            <Route path="profile" element={<AdminProfile/>}/>
                            <Route path="view-task" element={<EmployeesTasks/>}/>
                        </Route>
                        <Route path={"/employee"} element={<IndexEmployee/>}>
                            <Route index element={<EmployeeDashboard/>}/>
                            <Route path="my-tasks" element={<MyTasks/>}/>
                            <Route path="profile" element={<EmployeeProfile/>}/>
                            <Route path="enter-confirmation" element={<EnterConfirmation/>}/>
                            <Route path="exit-confirmation" element={<ExitConfirmation/>}/>
                            <Route path="success-entry" element={<EmployeeSuccessEntry/>}/>
                        </Route>
                        <Route path="/invite-box" element={<InviteBox/>}/>
                        <Route path="/create-company" element={<CreateCompany/>}/>
                        {/*<Route path="*" element={<NotFound/>}/>*/}
                    </Routes>
                </Router>
            </AuthProvider>
        </>
    );
}

export default App
