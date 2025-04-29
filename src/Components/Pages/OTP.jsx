import { Container, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import {Link, useNavigate,useSearchParams} from "react-router-dom";
import { useServer } from "../../AppContext.jsx";

export default function OTP() {
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const phoneNumber = searchParams.get("phoneNumber");
    const register = searchParams.get("register");
    const { serverAddress } = useServer();
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        setLoading(true);

        if (!data.otp1 || !data.otp2 || !data.otp3 || !data.otp4) {
            return;
        }

        const otpCode = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}`;
        console.log(otpCode)
        try {
            const response = await axios.post(`${serverAddress}otp/check`, { code: otpCode, phoneNumber });
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
                title: `${response.data.message}`,
            });
            console.log("Response:", response.data);
            if(register === "register"){
                setTimeout(() => {
                    navigate(`/invite-box`);
                }, 500);
            }else{
                setTimeout(() => {
                    navigate(`/new-password`);
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
                title: `${error.message}`,
            });
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e, index, field) => {
        const value = e.target.value;
        const fieldName = `otp${index + 1}`;

        if (/^\d$/.test(value)) {
            setValue(fieldName, value, { shouldValidate: true });
            if (index < inputRefs.length - 1) {
                inputRefs[index + 1].current.focus();
            }
        } else if (value === "") {
            setValue(fieldName, "", { shouldValidate: true });
            if (index > 0) {
                inputRefs[index - 1].current.focus();
            }
        } else {
            e.target.value = "";
            setValue(fieldName, "", { shouldValidate: true });
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && e.target.value === "") {
            if (index > 0) {
                inputRefs[index - 1].current.focus();
                setValue(`otp${index}`, "", { shouldValidate: true });
            }
        }
    };

    useEffect(() => {
        if (inputRefs[0].current) {
            inputRefs[0].current.focus();
        }
    }, []);

    return (
        <Container className="container-sm align-items-center justify-content-center mt-3" dir="rtl">
            <div className="row">
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
                <div className="mt-5 d-flex flex-column">
                    <span className="fs-4 fw-bold mb-3">کد تایید ورود</span>
                    <span className="text-color mb-3">
                        کد ارسال شده به شماره تلفن {phoneNumber} را در کادر زیر وارد نمایید
                    </span>
                </div>
                <div className="mt-5 mb-5">
                    <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
                        <div className="d-flex align-items-center gap-4 justify-content-center">
                            {inputRefs.map((ref, index) => (
                                <Form.Group
                                    key={3 - index}
                                    className="mb-3 position-relative otp-input"
                                >
                                    <Controller
                                        name={`otp${4 - index}`}
                                        control={control}
                                        rules={{
                                            pattern: {
                                                value: /^\d$/,
                                                message: "فقط باید یک عدد وارد کنید",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <Form.Control
                                                ref={(el) => {
                                                    inputRefs[3 - index].current = el;
                                                    field.ref(el);
                                                }}
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                maxLength="1"
                                                className="rounded-4 py-3 no-arrows text-center"
                                                value={field.value || ""}
                                                onChange={(e) => handleChange(e, 3 - index, field)}
                                                onKeyDown={(e) => handleKeyDown(e, 3 - index)}
                                            />
                                        )}
                                    />
                                    {errors[`otp${4 - index}`] && (
                                        <p className="text-danger mt-2">{errors[`otp${4 - index}`].message}</p>
                                    )}
                                </Form.Group>
                            ))}
                        </div>
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 rounded-5 fs-6 input-color border border-color py-3"
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
                                    در حال بررسی...
                                </>
                            ) : (
                                "بررسی کد"
                            )}
                        </Button>
                    </Form>
                </div>
            </div>
        </Container>
    );
}