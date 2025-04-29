import { Container, Image, InputGroup } from "react-bootstrap";
import {useState} from "react";
import "leaflet/dist/leaflet.css";
import { Link , useNavigate, } from "react-router-dom";
import ExitConfirmation from "./ExitConfirmation.jsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import "react-multi-date-picker/styles/layouts/mobile.css";

export default function Employees() {
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit} = useForm({
        defaultValues: {
            startDate: null,
            endDate: null,
            FullName: "",
        },
    });


    const onSubmit = async (data) => {
        try {
            const response = await axios.post(``, data);

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
                title: "کمی صبر کتید..",
            });
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
                        <span className="fs-5"> لیست کارمندان  </span>
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
                    <div className="row justify-content-around mt-3 mb-4 gap-2">
                        <div className="col-5 bg-orange rounded-4 p-3">
                            <span className="text-white mb-3 fs-4 fw-bold d-block">
                                تاریخچه
                            </span>
                            <div className="justify-content-end d-flex">
                                <Link to={"/history"}  className="btn btn-blue text-nowrap rounded-4 text-white fs-7">
                                    ورود و خروج
                                </Link>
                            </div>
                        </div>
                        <div className="col-5 bg-orange rounded-4 p-3">
                            <span className="text-white fs-4 fw-bold d-block mb-3">
                                جدید
                            </span>
                            <div className="justify-content-end d-flex">
                                <Link to={"/new-employees"} className={"btn btn-blue text-nowrap rounded-4 text-white fs-7"}>
                                    افزودن کارمند
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Form className={"my-4"} onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="position-relative" controlId="FullName">
                            <Form.Label column="sm" className={`rounded-4 fs-6 py-2 px-2 ${isFocused ? "text-orange" : "text-color"}`}>
                                جست و جو نام یا کد ملی
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="rounded-5 py-3 text-end"
                                {...register("NationalCode")}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                        </Form.Group>
                    </Form>
                    <div className="d-flex bg-secondary justify-content-between rounded-4 p-2 mt-2 mb-3">
                        <div className={"d-flex flex-column"}>
                            <span className="text-white fs-5">سروش اربابی</span>
                            <span className={"mt-2 text-color-smooth"}>ساعت حضور ماه جاری: 69</span>
                            <span className={"mt-2 text-color-smooth"}>روز حضور ماه جاری: 13</span>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                            <Link to={"/profile"} className="btn btn-blue text-nowrap rounded-4 text-white fs-7 px-4">پروفایل</Link>
                            <span className={"mt-2 text-color-smooth"}>ساعت حضور ماه قبل: 100</span>
                            <span className={"mt-2 text-color-smooth"}>روز حضور ماه قبل: 16</span>
                        </div>
                    </div>
                    <div className="d-flex bg-secondary justify-content-between rounded-4 p-2 mt-2">
                        <div className={"d-flex flex-column"}>
                            <span className="text-white fs-5">عرفان محسنی </span>
                            <span className={"mt-2 text-color-smooth"}>ساعت حضور ماه جاری: 69</span>
                            <span className={"mt-2 text-color-smooth"}>روز حضور ماه جاری: 13</span>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                            <Link to={"/profile"} className="btn btn-blue text-nowrap rounded-4 text-white fs-7 px-4">پروفایل</Link>
                            <span className={"mt-2 text-color-smooth"}>ساعت حضور ماه قبل: 100</span>
                            <span className={"mt-2 text-color-smooth"}>روز حضور ماه قبل: 16</span>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}