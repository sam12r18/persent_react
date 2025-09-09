import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {Link, useNavigate,useLocation,} from "react-router-dom";
import MapComponent from "../../Components/MapComponent.jsx";
import PersentMap from "../../Components/public/PersentMap.jsx"; // ضروری برای رندر نقشه

export default function EmployeeDashboard() {
    const [customMarker, setCustomMarker] = useState(null);

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
                        <Link to={"#"}  className="btn btn-pink text-white rounded-4 fs-7">
                            نقش کاربر
                        </Link>
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
                            <Link to={"/employee/profile"}  className="btn bg-yellow text-nowrap rounded-4 text-white fs-7">
                                تکمیل اطلاعات حساب
                            </Link>
                        </div>
                    </div>
                    <div className="row justify-content-around gap-2">
                        <div className="col-5 bg-orange rounded-4 p-3">
                            <span className="text-white mb-3 fs-4 fw-bold d-block">
                                ثبت خروج
                            </span>
                            <span className="fs-7 text-white">
                                جهت خروج از محل کار کلیک کنید
                            </span>
                            <div className="justify-content-end d-flex">
                                <Link to={"/employee/exit-confirmation"}  className="btn btn-red rounded-4 ">
                                    خروج
                                </Link>
                            </div>
                        </div>
                        <div className="col-5 bg-orange rounded-4 p-3">
                            <span className="text-white fs-4 fw-bold d-block mb-3">
                                ثبت حضور
                            </span>
                            <span className="fs-7 text-white">
                                جهت اعلام حضور کلیک فرمایید
                            </span>
                            <div className="justify-content-end d-flex">
                                <Link to={"/employee/enter-confirmation"} className={"btn btn-green text rounded-4"}>
                                    ورود
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <span className="fs-5 fw-bold text-color mt-3 mb-2">موقعیت شما</span>
                        <PersentMap onAddressSelect={({ address, lat, lng }) => {setCustomMarker([lat, lng]);}} />
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