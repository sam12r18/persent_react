import { Container, Image, InputGroup } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import {useEffect, useState} from "react";
import "leaflet/dist/leaflet.css";
import { Link, useNavigate,useLocation, } from "react-router-dom";
import ExitConfirmation from "./ExitConfirmation.jsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import Swal from "sweetalert2";
import { useServer } from "../../AppContext.jsx";
import { useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function History() {
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [isFocused3, setIsFocused3] = useState(false);
    const { serverAddress } = useServer();
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            startDate: null,
            endDate: null,
            FullName: "",
        },
    });

    const startDate = watch("startDate");
    const endDate = watch("endDate");

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${serverAddress}user/register`, data);

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
                title: "ثبت نام موفقیت‌آمیز بود!",
            });

            if (response.status === 200) {
                setTimeout(() => {
                    navigate(`/otp?phoneNumber=${data.phoneNumber}&Links`);
                }, 500);
            }
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
                title: error.response.data.message,
            });
        }
    };

    return (
        <Container className="container-sm mt-3" style={{ direction: "rtl" }}>
            <div className="row">
                <div className="d-flex mb-4 mt-2 justify-content-between">
                    <div>
                        <span className="fs-5">ورود و خروج ها</span>
                    </div>
                    <div className="">
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
                </div>
                <div>
                    <div className="d-flex btn-green justify-content-center rounded-4 p-3 mt-3 mb-3">
                        <span className={"fs-5 fw-bold"}>10:29:30 1403/01/08</span>
                    </div>
                    <div className={"mb-4"}>
                        <div className="btn-group w-100" role="group" aria-label="Basic outlined EXAMPLE">
                            <button type="button" className="btn bg-orange w-100 py-3 rounded-start-4">همه</button>
                            <button type="button" className="btn bg-gray w-100 py-3">ورود</button>
                            <button type="button" className="btn bg-gray w-100 py-3 rounded-end-4">خارج</button>
                        </div>
                    </div>

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className={"d-flex row *row mb-4"}>
                            <div className={"col-6"}>
                                <Form.Group className="position-relative" controlId="startDate">
                                    <Form.Label column="sm" className={`rounded-4 fs-6 py-2 px-2 ${isFocused2 ? "text-orange" : "text-color"}`}>
                                        از تاریخ
                                    </Form.Label>
                                    <DatePicker
                                        inputClass="form-control rounded-5 py-3 text-end"
                                        calendar={persian}
                                        locale={persian_fa}
                                        value={startDate}
                                        onChange={(date) => setValue("startDate", date?.toDate?.() || null)}
                                        onFocus={() => setIsFocused2(true)}
                                        onBlur={() => setIsFocused2(false)}
                                    />
                                </Form.Group>
                            </div>
                            <div className={"col-6"}>
                                <Form.Group className="position-relative" controlId="endDate">
                                    <Form.Label column="sm" className={`rounded-4 fs-6 py-2 px-2 ${isFocused3 ? "text-orange" : "text-color"}`}>
                                        تا تاریخ
                                    </Form.Label>
                                    <DatePicker
                                        inputClass="form-control rounded-5 py-3 text-end"
                                        calendar={persian}
                                        locale={persian_fa}
                                        value={endDate}
                                        onChange={(date) => setValue("endDate", date?.toDate?.() || null)}
                                        onFocus={() => setIsFocused3(true)}
                                        onBlur={() => setIsFocused3(false)}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group className="position-relative" controlId="FullName">
                            <Form.Label column="sm" className={`rounded-4 fs-6 py-2 px-2 ${isFocused ? "text-orange" : "text-color"}`}>
                                جست و جو نام یا کد ملی
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="rounded-5 py-3 text-end"
                                {...register("FullName")}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                        </Form.Group>
                    </Form>

                    <span className={"d-block mt-3"}>تاریخ: 1404/01/01</span>
                    <div className="d-flex bg-orange justify-content-between rounded-4 p-2 mt-2">
                        <div className={"d-flex flex-column"}>
                            <span className="text-white fs-5">سروش اربابی</span>
                            <span className={"mt-2 text-color-smooth"}>ورود: 08:08</span>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                            <Link to={"#"} className="btn btn-blue text-nowrap rounded-4 text-white fs-7 px-4">نقشه</Link>
                            <span className={"mt-2 text-color-smooth"}>خروج: 14:14</span>
                        </div>
                    </div>
                    <div className="d-flex bg-orange justify-content-between rounded-4 p-2 mt-2 mb-4">
                        <div className={"d-flex flex-column"}>
                            <span className="text-white fs-5">عرفان محسنی</span>
                            <span className={"mt-2 text-color-smooth"}>ورود: 08:08</span>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                            <Link to={"#"} className="btn btn-blue text-nowrap rounded-4 text-white fs-7 px-4">نقشه</Link>
                            <span className={"mt-2 text-color-smooth"}>خروج: 14:14</span>
                        </div>
                    </div>

                    <span className={""}>تاریخ: 1404/01/02</span>
                    <div className="mb-2 d-flex bg-orange justify-content-between rounded-4 p-2 mt-2">
                        <div className={"d-flex flex-column"}>
                            <span className="text-white fs-5">سروش اربابی</span>
                            <span className={"mt-2 text-color-smooth"}>ورود: 08:08</span>
                        </div>
                        <div className=" d-flex flex-column align-items-end">
                            <Link to={"#"} className="btn btn-blue text-nowrap rounded-4 text-white fs-7 px-4">نقشه</Link>
                            <span className={"mt-2 text-color-smooth"}>خروج: 15:15</span>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}