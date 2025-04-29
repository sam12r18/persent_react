import { Container, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useForm  } from "react-hook-form";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import {useServer} from "../../AppContext.jsx";

export default function LoginPage() {
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {serverAddress} = useServer();
    console.log(serverAddress)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        console.log("Response:", data);

        try {
            const response = await axios.post(`${serverAddress}auth/login`, data);



            if (response.data.status === 200) {
                localStorage.setItem("access_token", response?.data?.token);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });

                await Toast.fire({
                    icon: "success",
                    title: "ورود موفقیت‌آمیز بود!"
                });
                
                const roule = response?.data?.roule;
                if( roule === ""){
                    setTimeout(() => {
                        navigate(`/invite-box`);
                    }, 500);
                } else if(roule === "admin"){
                    setTimeout(() => {
                        navigate(`/admin-dashboard`);
                    }, 500);
                } else {
                    setTimeout(() => {
                        navigate(`/registration-of-attendance`);
                    }, 500);
                }
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
                }

            });


            await Toast.fire({
                icon: "error",
                title: error
            });

            console.error("Error:", error);
        } finally {
            setLoading(false);
        }

    };

    return (
        <Container className="container-sm align-items-center justify-content-center mt-3">
            <div className="row">
                <div className="justify-content-end m-n">
                    <Image src="/img/Header.png" className="mx-auto d-flex" />
                </div>
                <div className="mt-3">
                    <span className="me-3 mb-3 fs-4 fw-bold">حضورغیاب</span>
                    <p className="me-3 mt-3 mb-4 fs-6 text-color">
                        شماره موبایل خود را جهت بررسی وارد کنید
                    </p>
                </div>
                <div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3 position-relative" controlId="formBasicEmail">
                            <Form.Label
                                column="sm"
                                className={`rounded-4 fs-6 py-2 px-2 ${isFocused || errors.phoneNumber ? "text-orange" : "text-color"}`}
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
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                            {errors.phoneNumber && (
                                <p className="text-danger mt-2">{errors.phoneNumber.message}</p>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
                            <Form.Label
                                column="sm"
                                className={`rounded-4 fs-6 py-2 px-2 ${isFocused2 || errors.password ? "text-orange" : "text-color"}`}
                            >
                                رمز عبور
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="********"
                                className="rounded-5 py-3 mt-4 mb-4 text-end"
                                {...register("password", {
                                    required: "رمز عبور الزامی است",
                                })}
                                onFocus={() => setIsFocused2(true)}
                                onBlur={() => setIsFocused2(false)}
                            />
                            {errors.password && (
                                <p className="text-danger mt-2">{errors.password.message}</p>
                            )}
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 rounded-5 fs-6 input-color border border-color py-3"
                            disabled={loading}
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
                                    در حال ورود...
                                </>
                            ) : (
                                "ورود"
                            )}
                        </Button>
                    </Form>
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <Link to="/forget-password" className="text-decoration-none text-color">
                        فراموشی رمز ورود
                    </Link>
                    <Link to="/register" className="text-decoration-none text-color">
                        ایجاد حساب کاربری
                    </Link>
                </div>
                <div className="mt-3 mb-3">
                    <Image src="img/Rayasan.png" width="30px" height="30px" />
                    <Link to={"https://raayasun.ir/"}  className="text-decoration-none text-color me-2">
                        رایاسان پردازان پارت
                    </Link>
                </div>
            </div>
        </Container>
    );
}
