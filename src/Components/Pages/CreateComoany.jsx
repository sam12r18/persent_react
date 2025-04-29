import { Container, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useEffect, useState} from "react";
import Spinner from "react-bootstrap/Spinner";
import {Link, useNavigate} from "react-router-dom";
import { useServer } from "../../AppContext.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import {MapContainer, Marker, TileLayer, useMapEvents} from "react-leaflet";

export default function CreateCompany() {
    const [isFocused7, setIsFocused7] = useState(false);
    const [isFocused8, setIsFocused8] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { serverAddress } = useServer();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
         
    } = useForm({
        mode: "onChange",
    });
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);

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
    // loding...
    if (!position) {
        return (
            <Container className="container-sm mt-3">
                <div className="text-center">در حال بارگذاری موقعیت...</div>
            </Container>
        );
    }

    const onSubmit = async (data) => {
        console.log(data);
        setLoading(true);

        try {
            const response = await axios.post(`${serverAddress}`, {
            });
            console.log("Response:", response.data);

            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            await Toast.fire({
                icon: "success",
                title: "شرکت شما با موفقیت ثبت شد!",
            });

            setTimeout(() => {
                navigate(`/`);
            }, 500);
        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            await Toast.fire({
                icon: "error",
                title: `${error.response?.data?.message || "خطایی رخ داد"}`,
            });
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Container className="container-sm align-items-center justify-content-center mt-3">
            <div className="row">
                <div className="d-flex justify-content-between mt-4">
                    <span className="fs-5 fw-bold"> ایجاد کسبو کار من</span>
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
                <div className="mt-5 mb-5">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-5 position-relative" controlId="formBasicPassword">
                            <Form.Label
                                column="sm"
                                className={`rounded-4 fs-6 py-2 px-2 ${
                                    isFocused7 || errors.password ? "text-orange" : "text-color"
                                }`}
                            >
                                نام و نام خانوادگی
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="اینجا بنویسید"
                                className="rounded-5 py-3 no-arrows text-start fs-5"
                                {...register("fullName", {

                                })}
                                onFocus={() => setIsFocused7(true)}
                                onBlur={() => setIsFocused7(false)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 mt-4 position-relative" controlId="formCompany">
                            <Form.Label
                                column="sm"
                                className={`rounded-4 fs-6 py-2 px-2 ${
                                    isFocused8 || errors.confirmPassword ? "text-orange" : "text-color"
                                }`}
                            >
                                عنوان کسب و کار شما
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="اینجا بنویسید"
                                className="rounded-5 py-3 text-start fs-5"
                                {...register("companyName", {
                                })}
                                onFocus={() => setIsFocused8(true)}
                                onBlur={() => setIsFocused8(false)}
                            />

                        </Form.Group>
                        <div className="my-4 d-flex flex-column map">
                            <span className="fs-5 fw-bold text-color mt-3 mb-2">موقعیت شرکت شما</span>
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

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 rounded-5 fs-6 input-color border border-color py-3 mt-4"
                        >
                            {loading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                    />
                                    در حال ثبت...
                                </>
                            ) : (
                                "ثبت کسب و کار من"
                            )}
                        </Button>
                        <Link to={"/invite-box"} className={"btn bg-smooth-gray mt-3 w-100 text-white fs-5 rounded-5 my-2 p-3"}> بازگشت</Link>

                    </Form>
                </div>
            </div>
        </Container>
    );
}