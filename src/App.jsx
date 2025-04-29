import "bootstrap/dist/css/bootstrap.rtl.min.css";
import './App.css'
import Index from "./Layout/Index.jsx";
import {Route, Router, Routes} from "react-router-dom";
import OTP from "./Components/Pages/OTP.jsx";
import ForgetPassword from "./Components/Pages/ForgetPassword.jsx";
import NewPassword from "./Components/Pages/NewPassword.jsx";
import Terms from "./Components/Pages/Terms.jsx";
import Register from "./Components/Pages/Register.jsx";
import InviteBox from "./Components/Pages/InviteBox.jsx";
import RegistrationOfAttendance from "./Components/Pages/RegistrationOfAttendance.jsx";
import EnterConfirmation from "./Components/Pages/EnterConfirmation.jsx";
import SuccesEntery from "./Components/Pages/SuccesEntery.jsx";
import ExitConfirmation from "./Components/Pages/ExitConfirmation.jsx";
import {ProfileProvider} from "./contexts/profile-context.jsx";
import CreateCompany from "./Components/Pages/CreateComoany.jsx";
import AdminDashboard from "./Components/Pages/AdminDashboard.jsx";
import History from "./Components/Pages/History.jsx";
import Employees from "./Components/Pages/Employees.jsx";
import NewEmployee from "./Components/Pages/NewEmployee.jsx";
import Profile from "./Components/Pages/Profile.jsx";
import LoginPage from "./Components/Pages/Login.jsx";


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
                    <Route path="/registration-of-attendance" element={<RegistrationOfAttendance/>}/>
                    <Route path="/enter-confirmation" element={<EnterConfirmation/>}/>
                    <Route path="/exit-confirmation" element={<ExitConfirmation/>}/>
                    <Route path="/succesentery" element={<SuccesEntery/>}/>
                    <Route path="/create-company" element={<CreateCompany/>}/>
                    <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
                    <Route path="/history" element={<History/>}/>
                    <Route path="/employees" element={<Employees/>}/>
                    <Route path="/new-employees" element={<NewEmployee/>}/>
                    <Route path="/profile" element={<Profile/>}/>

                    {/*<Route path="*" element={<NotFound/>}/>*/}
                </Routes>
            {/*</ProfileProvider>*/}
        </>
    );
}

export default App
