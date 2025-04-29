import { Container, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import {useServer} from "../../AppContext.jsx";
import {Link, useNavigate} from "react-router-dom";

export default function ForgetPassword() {
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const {serverAddress} = useServer();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm({
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        console.log(data)
        setLoading(true);

        try {
            const response = await axios.post(`${serverAddress}user/reset-password/request`, data);
            console.log("Response:", response.data);
            setTimeout(() => {
                navigate(`/otp?phoneNumber=${data.phoneNumber}`);
            }, 3000);
        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position:"top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            await Toast.fire({
                icon: "error",
                title: `${error}`
            });
            console.error("Error:", error);
        }finally {
            setLoading(false);
        }
    };


    const handleMobileChange = (e) => {
        let value = e.target.value;
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        if (value.length >= 2 && !value.startsWith("09")) {
            value = "09" + value.slice(2);
            if (value.length > 11) value = value.slice(0, 11);
        }
        setValue("mobile", value, { shouldValidate: true });
        e.target.value = value;
    };

    return (
        <Container className="container-sm align-items-center justify-content-center mt-3">
            <div className="row">
                <div className="text-end">
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
                <div className="mt-5 d-flex flex-column">
                    <span className="fs-4 fw-bold mb-3">فراموشی رمزعبور</span>
                    <span className="text-color mb-3">
                        شماره موبایل خود را جهت بازیابی رمز عبز وارد کنید.
                    </span>
                </div>
                <div className="mt-5 mb-5">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3 position-relative" controlId="formBasicEmail">
                            <Form.Label
                                column="sm"
                                className={`rounded-4 fs-6 py-2 px-2 ${
                                    isFocused || errors.mobile ? "text-orange" : "text-color"
                                }`}
                            >
                                موبایل
                            </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="0912"
                                className="rounded-5 py-3 no-arrows text-end"
                                {...register("phoneNumber", {
                                    required: "شماره موبایل الزامی است",
                                    pattern: {
                                        value: /^09\d{9}$/,
                                        message: "شماره موبایل باید با 09 شروع بشه و 11 رقم باشه",
                                    },
                                    minLength: {
                                        value: 11,
                                        message: "شماره موبایل باید 11 رقم باشه",
                                    },
                                    maxLength: {
                                        value: 11,
                                        message: "شماره موبایل باید 11 رقم باشه",
                                    },
                                })}
                                onChange={handleMobileChange}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                            {errors.mobile && (
                                <p className="text-danger mt-2">{errors.mobile.message}</p>
                            )}
                        </Form.Group>
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
                                    در حال ویرایش...
                                </>
                            ) : (
                                " ویرایش رمز عبور جدید"
                            )}
                        </Button>
                    </Form>
                </div>
            </div>
        </Container>
    );
}