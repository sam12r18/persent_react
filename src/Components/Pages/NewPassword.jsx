import { Container, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import {Link, useNavigate,} from "react-router-dom";
import { useServer } from "../../AppContext.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

export default function NewPassword() {
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
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

    const onSubmit = async (data) => {
        console.log(data);
        setLoading(true);

        try {
            const response = await axios.post(`${serverAddress}user/reset-password`, {
                password: data.password,
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
                title: "رمز عبور با موفقیت تغییر کرد!",
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

    const password = watch("password");

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
                    <span className="fs-4 fw-bold mb-3">تعیین رمز ورود جدید</span>
                    <span className="text-color mb-3">رمز ورود جدیدی برای خود بنویسید</span>
                </div>
                <div className="mt-5 mb-5">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
                            <Form.Label
                                column="sm"
                                className={`rounded-4 fs-6 py-2 px-2 ${
                                    isFocused || errors.password ? "text-orange" : "text-color"
                                }`}
                            >
                                رمز ورود جدید
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="1234"
                                className="rounded-5 py-3 no-arrows text-end"
                                {...register("password", {
                                    required: "رمز عبور الزامی است",
                                    minLength: {
                                        value: 8,
                                        message: "رمز عبور باید حداقل 8 کاراکتر باشد",
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/,
                                        message: "رمز عبور باید شامل یک حرف بزرگ و یک عدد باشد",
                                    },
                                })}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                            {errors.password && (
                                <p className="text-danger mt-2">{errors.password.message}</p>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3 mt-4 position-relative" controlId="formConfirmPassword">
                            <Form.Label
                                column="sm"
                                className={`rounded-4 fs-6 py-2 px-2 ${
                                    isFocused2 || errors.confirmPassword ? "text-orange" : "text-color"
                                }`}
                            >
                                تأیید رمز ورود جدید
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="1234"
                                className="rounded-5 py-3 no-arrows text-end"
                                {...register("confirmPassword", {
                                    required: "تأیید رمز عبور الزامی است",
                                    validate: (value) =>
                                        value === password || "رمز عبور و تأیید آن باید یکسان باشند",
                                })}
                                onFocus={() => setIsFocused2(true)}
                                onBlur={() => setIsFocused2(false)}
                            />
                            {errors.confirmPassword && (
                                <p className="text-danger mt-2">{errors.confirmPassword.message}</p>
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
                                    در حال تأیید...
                                </>
                            ) : (
                                "ویرایش رمز عبور"
                            )}
                        </Button>
                    </Form>
                </div>
            </div>
        </Container>
    );
}