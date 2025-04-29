import { Container, Image } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {Link , useNavigate,} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

export default function ExitConfirmation() {
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;

                    // بررسی موقعیت جغرافیایی ایران
                    const isInsideIran =
                        latitude >= 25 && latitude <= 40 && longitude >= 44 && longitude <= 63;

                    if (!isInsideIran) {
                        Swal.fire({
                            icon: "warning",
                            title: "لطفاً VPN خود را خاموش کنید",
                            text: "به نظر می‌رسد که موقعیت شما خارج از ایران است.",
                        });
                    }

                    setPosition([latitude, longitude]);
                },
                (err) => {
                    setError(
                        err.code === 1
                            ? "اجازه دسترسی به موقعیت داده نشد. لطفاً دسترسی را فعال کنید."
                            : err.message
                    );
                    setPosition([35.6892, 51.389]);
                }
            );
        } else {
            setError("موقعیت‌یابی در مرورگر پشتیبانی نمی‌شود.");
            setPosition([35.6892, 51.389]);
        }
    }, []);


    function LocationMarker() {
        const map = useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
            },
        });
        useEffect(() => {
            if (position) {
                map.flyTo(position, map.getZoom());
            }
        }, [position, map]);

        return position ? <Marker position={position} /> : null;
    }
    // loding..
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
                    <span className="fs-5">تایید خروج از شرکت</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-arrow-left"
                        viewBox="0 0 16 16"
                        role="button"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(-1)}
                    >
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 7.5H14.5a.5.5 0 0 1 .5.5z" />
                    </svg>
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
                <div>
                    <span className={"fs-5 fw-bold text-justifyed d-block mb-3"}>
                        شما درحال تایید خروج از شرکت در ساعت 08:30 روز دوشنبه 5 مرداد 1402 میباشیید
                    </span>
                    <span className={"fs-5 text-color"}>
                        درصورت درست بودن محل و زمان دکمه تایید را بزنید
                    </span>
                    <Button className={"btn bg-orange w-100 text-white fs-5 rounded-5 my-3 p-3"} type={"submit"}>تایید و ثبت ورود</Button>
                    <Link to={"/registration-of-attendance"} className={"btn bg-smooth-gray w-100 text-white fs-5 rounded-5 my-2 p-3"}> بازگشت</Link>
                </div>
            </div>
        </Container>
    );
}