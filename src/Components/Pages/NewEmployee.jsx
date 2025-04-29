import { Container, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useRef, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate, } from "react-router-dom";
import { useServer } from "../../AppContext.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

export default function NewEmployee() {
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [isFocused3, setIsFocused3] = useState(false);
    const [loading, setLoading] = useState(false);
    const [genderDropdown, setGenderDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { serverAddress } = useServer();



    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const selectedGender = watch("gender");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setGenderDropdown(false);
                setIsFocused2(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`${serverAddress}`, {
                fullName: data.fullName,
                gender: data.gender,
                phone: data.phone,
            });

            await Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "کاربر شما با موفقیت اضافه شد..!",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });

            setTimeout(() => {
                navigate(`/`);
            }, 500);
        } catch (error) {
            await Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: `${error.response?.data?.message || "خطایی رخ داد"}`,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGenderSelect = (value) => {
        setValue("gender", value);
        setGenderDropdown(false);
        setIsFocused2(false);
    };

    return (
        <Container className="container-sm align-items-center justify-content-center mt-3">
            <div className="row">
                <div className="d-flex justify-content-between mt-4">
                    <span className="fs-5 fw-bold">ثبت کارمند جدید</span>
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
                        <Form.Group className="mb-5 position-relative">
                            <Form.Label
                                className={`fs-6 py-2 px-2 rounded-4 position-absolute top-0 start-0 translate-middle-y ms-3 bg-white ${isFocused ? "text-orange" : "text-color"}`}
                                style={{ zIndex: 2, pointerEvents: "none", whiteSpace: "nowrap" }}
                            >
                                نام و نام خانوادگی
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="اینجا بنویسید"
                                className="rounded-5 py-3 no-arrows text-start fs-5"
                                {...register("fullName")}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-5 position-relative">
                            <div
                                ref={dropdownRef}
                                className="position-relative"
                                onClick={() => setGenderDropdown(!genderDropdown)}
                                tabIndex={0}
                            >
                                <Form.Label
                                    htmlFor="gender"
                                    className={`fs-6 position-absolute top-0 start-0 translate-middle-y ms-3 mt-1 bg-white px-2 rounded-3 ${
                                        isFocused2 ? "text-orange" : selectedGender ? "text-color" : "text-muted"
                                    }`}
                                    style={{
                                        zIndex: 2,
                                        display: "inline-block",
                                        whiteSpace: "nowrap",
                                        pointerEvents: "none",
                                    }}
                                >
                                    جنسیت
                                </Form.Label>

                                <Form.Control
                                    id="gender"
                                    type="text"
                                    placeholder="انتخاب کنید"
                                    className="rounded-5 py-3 no-arrows text-start fs-5 pe-5 mt-3"
                                    value={selectedGender || ""}
                                    readOnly
                                    onFocus={() => setIsFocused2(true)}
                                />

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    className="bi bi-chevron-down position-absolute top-50 end-0 translate-middle-y me-3"
                                    viewBox="0 0 16 16"
                                    style={{ zIndex: 2 }}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                    />
                                </svg>

                                {genderDropdown && (
                                    <div
                                        className="position-absolute w-100 bg-white border rounded-3 shadow-sm mt-1"
                                        style={{ zIndex: 1050 }}
                                    >
                                        {["زن", "مرد"].map((gender) => (
                                            <div
                                                key={gender}
                                                className="py-2 px-3 gender-option"
                                                style={{
                                                    cursor: "pointer",
                                                    transition: "0.2s",
                                                }}
                                                onClick={() => handleGenderSelect(gender)}
                                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                            >
                                                {gender}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <input type="hidden" {...register("gender")} />
                        </Form.Group>

                        <Form.Group className="mb-3 mt-4 position-relative">
                            <Form.Label
                                className={`rounded-4 fs-6 py-2 px-2 position-absolute top-0 start-0 translate-middle-y ms-3 bg-white ${isFocused3 ? "text-orange" : "text-color"}`}
                                style={{ zIndex: 2, pointerEvents: "none", whiteSpace: "nowrap" }}
                            >
                                شماره موبایل
                            </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="اینجا بنویسید"
                                className="rounded-5 py-3 no-arrows text-start fs-5"
                                {...register("phonNumber")}
                                onFocus={() => setIsFocused3(true)}
                                onBlur={() => setIsFocused3(false)}
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 rounded-5 fs-6 input-color border border-color py-3 mt-4"
                        >
                            {loading ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                    در حال ثبت کارمند...
                                </>
                            ) : (
                                "ثبت کارمند"
                            )}
                        </Button>

                        <Link to={"/admin-dashboard"} className="btn bg-smooth-gray mt-3 w-100 text-white fs-5 rounded-5 my-2 p-3">
                            بازگشت
                        </Link>
                    </Form>
                </div>
            </div>
        </Container>
    );
}
