import { Container, Image } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {Link } from "react-router-dom";
import ExitConfirmation from "./ExitConfirmation.jsx"; // ضروری برای رندر نقشه

export default function RegistrationOfAttendance() {
    const [position, setPosition] = useState(null); // موقعیت اولیه null می‌ذاریم تا منتظر لوکیشن واقعی باشیم
    const [error, setError] = useState(null);

    // گرفتن موقعیت کاربر با Geolocation
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition([latitude, longitude]);
                },
                (err) => {
                    setError(
                        err.code === 1
                            ? "اجازه دسترسی به موقعیت داده نشد. لطفاً دسترسی رو فعال کنید."
                            : err.message
                    );
                    // اگه خطا داشت، موقعیت پیش‌فرض تهران رو می‌ذاریم
                    setPosition([35.6892, 51.389]);
                }
            );
        } else {
            setError("موقعیت‌یابی در مرورگر پشتیبانی نمی‌شه.");
            setPosition([35.6892, 51.389]); // موقعیت پیش‌فرض
        }
    }, []);

    // کامپوننت برای مدیریت کلیک روی نقشه
    function LocationMarker() {
        const map = useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
            },
        });
        // وقتی موقعیت عوض می‌شه، نقشه رو به مرکز جدید می‌بره
        useEffect(() => {
            if (position) {
                map.flyTo(position, map.getZoom());
            }
        }, [position, map]);

        return position ? <Marker position={position} /> : null;
    }

    // اگه هنوز موقعیت نگرفتیم، لودینگ نشون بده
    if (!position) {
        return (
            <Container className="container-sm mt-3">
                <div className="text-center">در حال بارگذاری موقعیت...</div>
            </Container>
        );
    }

    return (
        <Container className="container-sm mt-3">
            <div className="row">
                <div className="d-flex mb-4 mt-2 justify-content-between">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="currentColor"
                            className="bi bi-emoji-smile-upside-down-fill me-3"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M7 9.5C7 8.672 6.552 8 6 8s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5M4.285 6.433a.5.5 0 0 0 .683-.183A3.5 3.5 0 0 1 8 4.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.5 4.5 0 0 0 8 3.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683M10 8c-.552 0-1 .672-1 1.5s.448 1.5 1 1.5 1-.672 1-1.5S10.552 8 10 8" />
                        </svg>
                        <span className="fs-5">کاربر میهمان</span>
                    </div>
                    <div>
                        <Link to={""} className="btn btn-pink text-white rounded-4 fs-7">
                            نقش کارمند
                        </Link>
                    </div>
                </div>

                <div>
                    <div className="d-flex bg-orange justify-content-between rounded-4 p-3 mt-3">
                        <div>
                            <span className="text-white fs-6 fw-bold d-block">
                                50درصد پروفایل شما تکمیل است
                            </span>
                            <span className="fs-7 text-white mt-3">
                                با تکمیل پرفایل خود تجربه بهتری استفاده از برنامه داشته باشید
                            </span>
                        </div>
                        <div className="d-flex align-items-end">
                            <Link to={"/profile"} className="btn bg-yellow text-nowrap rounded-4 text-white fs-7">
                                تکمیل اطلاعات حساب
                            </Link >
                        </div>
                    </div>

                    <div className="row justify-content-around mt-3 gap-2">
                        <div className="col-5 bg-orange rounded-4 p-3">
                            <span className="text-white mb-3 fs-4 fw-bold d-block">
                                ثبت خروج
                            </span>
                            <span className="fs-7 text-white mt-3">
                                جهت خروج از محل کار کلیک کنید
                            </span>
                            <div className="justify-content-end d-flex">
                                <Link to={"/exit-confirmation"}  className="btn btn-red text-nowrap rounded-4 text-white fs-7">
                                    خروج
                                </Link>
                            </div>
                        </div>
                        <div className="col-5 bg-orange rounded-4 p-3">
                            <span className="text-white fs-4 fw-bold d-block mb-3">
                                ثبت حضور
                            </span>
                            <span className="fs-7 text-white mb-3">
                                جهت اعلام حضور کلیک فرمایید
                            </span>
                            <div className="justify-content-end d-flex">
                                <Link to={"/enter-confirmation"} className={"btn btn-green text-nowrap rounded-4 text-white fs-7"}>
                                    ورود
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="my-4 d-flex flex-column map">
                        <span className="fs-5 fw-bold text-color mt-3 mb-2">موقعیت شما</span>
                        {error && <p className="text-danger mb-2">{error}</p>}
                        <MapContainer
                            center={position}
                            zoom={13}
                            style={{ height: "300px", width: "100%", borderRadius: "8px" }}
                        >
                            <TileLayer
                                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationMarker />
                        </MapContainer>
                    </div>

                    <div className="d-flex bg-orange justify-content-between rounded-4 p-3 mt-3">
                        <div>
                            <span className="text-white fs-4">مشاهده تاریخچه</span>
                        </div>
                        <div className="d-flex align-items-end">
                            <Link to={""} className="btn btn-blue text-nowrap rounded-4 text-white fs-7">
                                نمایش
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}