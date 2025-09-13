import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import MinLink from "../../Components/public/MinLink.jsx"; // ضروری برای رندر نقشه
import {Link} from "react-router-dom";
import {apiGet} from "../../services/AxiosClient.jsx";
import PresentMap from "../../Components/public/PresentMap.jsx"; // ضروری برای رندر نقشه

export default function EmployeeDashboard() {
    const [status , setStatus] = useState([])
    const fetchStatus = async ()=>{
        try {
            const response = await apiGet(`status` );
            console.log("this is response for status" ,response)
            setStatus(response?.data)

        }catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchStatus();
    }, []);
    return (
        <Container className="container-sm mt-3">
            <div className="d-flex flex-column">
                <div className="d-flex mb-4 mt-2 justify-content-between">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-emoji-smile-upside-down-fill me-3" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M7 9.5C7 8.672 6.552 8 6 8s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5M4.285 6.433a.5.5 0 0 0 .683-.183A3.5 3.5 0 0 1 8 4.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.5 4.5 0 0 0 8 3.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683M10 8c-.552 0-1 .672-1 1.5s.448 1.5 1 1.5 1-.672 1-1.5S10.552 8 10 8" />
                        </svg>
                        <span className="fs-5">نام کاربر</span>
                    </div>
                    <div>
                        <span className="btn btn-pink text-white rounded-4 px-4 ">
                             کاربر
                        </span>
                    </div>
                </div>
                <div className={"d-flex flex-column gap-4"}>
                    <div className="d-flex bg-orange justify-content-between rounded-4 p-3">
                        <div>
                            <span className="text-white fs-6 fw-bold d-block">
                                50درصد پروفایل شما تکمیل است
                            </span>
                            <span className="fs-7 text-white mt-3">
                                با تکمیل پرفایل خود تجربه بهتری استفاده از برنامه داشته باشید
                            </span>
                        </div>
                        <div className="d-flex align-items-end">
                            <MinLink bgColor={"bg-yellow"} to={"/employee/profile"} text={"تکمیل اطلاعات حساب"} textColor={"text-black"}/>
                        </div>
                    </div>
                    <div className="bg-orange rounded-4 p-3">
                        <span className="text-white mb-2 fs-4 fw-bold d-block">
                            {status?.last_status === "check_in" ? "ثبت حضور" : "ثبت خروج"}
                        </span>
                        <span className="text-white">
                            جهت {status?.last_status === "check_in" ? "خروج از محل کار" : "ورود به محل کار"} کلیک کنید
                        </span>
                        <div className="justify-content-end d-flex">
                            <Link to={`/employee/${status?.last_status === "check_in" ? "exit-confirmation" : "enter-confirmation"}`}  className={`btn ${status?.last_status === "check_in" ? "btn-red" : "btn-green"} rounded-4 text-white `}>
                                {status?.last_status === "check_in" ? "خروج" : "ورود"}
                            </Link>
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <span className="fs-5 fw-bold text-color mt-3 mb-2">موقعیت شما</span>
                        <PresentMap />
                    </div>
                    <div className="d-flex bg-orange justify-content-between rounded-4 p-3">
                        <div>
                            <span className="text-white fs-5">تاریخچه ورود و خروج من </span>
                        </div>
                        <div className="d-flex align-items-end">
                            <Link to={"/employee/history"}  className="btn btn-blue text-nowrap rounded-4 text-white fs-7">
                                نمایش
                            </Link>
                        </div>
                    </div>
                    <div className="d-flex bg-orange justify-content-between rounded-4 p-3 mb-4">
                        <span className="text-white fs-5">وظیفه های من</span>
                        <div className="d-flex align-items-end gap-3">
                            <Link to={"/employee/add-task"}  className="btn btn-green text-nowrap rounded-4 text-white fs-7">
                                افزودن
                            </Link>
                            <Link to={"/employee/my-tasks"}  className="btn btn-blue text-nowrap rounded-4 text-white fs-7">
                                مشاهده
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}