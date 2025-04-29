import { Container, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from 'react-bootstrap/Spinner';
import {useServer} from "../../AppContext.jsx";
import {Link, useNavigate} from "react-router-dom";


export default function Register() {
   
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [isFocused3, setIsFocused3] = useState(false);
    const [isFocused4, setIsFocused4] = useState(false);
    const [isFocused5, setIsFocused5] = useState(false);
    const [isFocused6, setIsFocused6] = useState(false);
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
        console.log(data);
        setLoading(true);
        try {

            const response = await axios.post(`${serverAddress}user/register`, data ,);

            console.log("Response:", response);

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

          if (response.status === 200){
              setTimeout(() => {
                  navigate(`/otp?phoneNumber=${data.phoneNumber}&Links && rgister`);
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
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const mobileValue = watch("mobile") || "";

    const handleMobileChange = (e) => {
        let value = e.target.value;
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        if (value.length >= 2 && !value.startsWith("09")) {
            value = "09" + value.slice(2);
            if (value.length > 11) value = value.slice(0, 11);
        }
        setValue("phoneNumber", value, { shouldValidate: true });
        e.target.value = value;
    };

    return (
        <Container className="container-sm align-items-center justify-content-center mt-3">
            <div className="row">
                <div className="d-flex justify-content-between mb-4">
                    <span className="fs-5 fw-bold">ایجاد حساب کاربری</span>
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
                <div className="justify-content-end m-n">
                    <Image src="/img/Header.png" className="mx-auto d-flex" />
                </div>
                <div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className=" position-relative" controlId="formfirstName">
                            <Form.Label
                                column="sm"
                                className={`rounded-4 fs-6 py-2 px-2 ${
                                    isFocused || errors.firstName ? "text-orange" : "text-color"
                                }`}
                            >
                                نام
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="rounded-5 py-3 no-arrows text-end"
                                {...register("firstName")}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                            {errors.firstName && (
                                <p className="text-danger mt-2">{errors.firstName.message}</p>
                            )}
                        </Form.Group>
                        <Form.Group className="my-4 position-relative" controlId="formlastName">
                            <Form.Label
                                column="sm"
                                className={`rounded-4 fs-6 py-2 px-2  ${
                                    isFocused2 || errors.lastName ? "text-orange" : "text-color"
                                }`}
                            >
                                نام خانوادگی
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="rounded-5 py-3 no-arrows text-end"
                                {...register("lastName")}
                                onFocus={() => setIsFocused2(true)}
                                onBlur={() => setIsFocused2(false)}
                            />
                            {errors.lastName && (
                                <p className="text-danger mt-2">{errors.lastName.message}</p>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-4 position-relative" controlId="formBasicEmail">
                            <Form.Label
                                column="sm"
                                className={`rounded-4 fs-6 py-2 px-2 ${
                                    isFocused3 || errors.phoneNumber ? "text-orange" : "text-color"
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
                                onFocus={() => setIsFocused3(true)}
                                onBlur={() => setIsFocused3(false)}
                            />
                            {errors.phoneNumber && (
                                <p className="text-danger mt-2">{errors.phoneNumber.message}</p>
                            )}
                        </Form.Group>
                        <Form.Group className=" mb-4 position-relative" controlId="formBasicPassword">
                            <Form.Label
                                column="sm"
                                className={`rounded-4 fs-6 py-2 px-2 ${
                                    isFocused4 || errors.password ? "text-orange" : "text-color"
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
                                onFocus={() => setIsFocused4(true)}
                                onBlur={() => setIsFocused4(false)}
                            />
                            {errors.password && (
                                <p className="text-danger mt-2">{errors.password.message}</p>
                            )}
                        </Form.Group>
                        <Form.Group className="my-4 position-relative" controlId="formConfirmPassword">
                           <Form.Label
                                column="sm"
                                className={`rounded-4 fs-6 py-2 px-2 ${
                                    isFocused5 || errors.confirmPassword ? "text-orange" : "text-color"
                                }`}
                            >
                                تأیید رمز ورود جدید
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="1234"
                                className="rounded-5 py-3 text-end"
                                {...register("confirmPassword", {
                                    required: "تأیید رمز عبور الزامی است",
                                    validate: (value) =>
                                        value === watch("password") || "رمز عبور و تأیید آن باید یکسان باشند"
                                })}
                                onFocus={() => setIsFocused5(true)}
                                onBlur={() => setIsFocused5(false)}
                            />
                            {errors.confirmPassword && (
                                <p className="text-danger mt-2">{errors.confirmPassword.message}</p>
                            )}
                        </Form.Group>
                        <Form.Group className=" position-relative" controlId="formReferralCode">
                            <Form.Label
                                column="sm"
                                className={`rounded-4 fs-6 py-2 px-2 ${
                                    isFocused6 || errors.referralCode ? "text-orange" : "text-color"
                                }`}
                            >
                                کدمعرف
                            </Form.Label>
                            <Form.Control
                                type="number"
                                className="rounded-5 py-3 no-arrows text-end"
                                {...register("referral")}
                                onFocus={() => setIsFocused6(true)}
                                onBlur={() => setIsFocused6(false)}
                            />
                            {errors.referral   && (
                                <p className="text-danger mt-2">{errors.referral  .message}</p>
                            )}
                        </Form.Group>

                        <span className="ps-3">
                            ثبت نام در حضور و غیاب رایاسان به منزله{" "}
                            <Link to={"/terms"}  state={{ from: location.pathname }}>پذیرش قوانین و مقررات </Link>این برنامه می‌باشد
                        </span>
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
                                    در حال ورود...
                                </>
                            ) : (
                                "ثبت نام"
                            )}
                        </Button>
                    </Form>
                </div>
                <div className="mt-4 mb-3">
                    <Image src="img/Rayasan.png" width="30px" height="30px" />
                    <Link to={"https://raayasun.ir/"}  className="text-decoration-none text-color me-2">
                        رایاسان پردازان پارت
                    </Link>
                </div>
            </div>
        </Container>
    );
}