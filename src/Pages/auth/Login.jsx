import {Container, Image} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import useAlert from "../../hook/Alert.jsx";
import {apiPost} from "../../services/AxiosClient.jsx";
import CustomInputs from "../../Components/public/Inputs/CustomInputs.jsx";
import CustomBtn from "../../Components/public/CustomBtn.jsx";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await apiPost(`auth/login`, data);
            console.log("this is response", response);

            localStorage.setItem("authToken", response?.token);
            alert({
                title: "موفق",
                text: "خوش آمدید",
                icon: "success",
            });
            setTimeout(() => {
                navigate(`/invite-box`);
            }, 500);

        } catch (error) {
            if (error.status==402)
                alert({
                    title: "ورود ناموفق",
                    text: "رمز ورود اشتباه وارد شده است",
                    icon: "danger",
                });
            console.error("Error:", error);

        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="container-sm align-items-center justify-content-center mt-3">
            <div className="d-flex flex-column">
                <Image src="/img/Header.png" className="mx-auto" style={{width: '100px'}}/>
                <div className="ms-3">
                    <span className="fs-4 fw-bold">رایاحضور</span>
                    <p className="mt-2 mb-0">
                        به برنامه حضور و غیاب آنلاین رایاحضور خوش آمدید </p>
                </div>
                <div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <CustomInputs type={"tel"} placeHolder={"0912"} label={"موبایل"} post={"mobile"} register={register}
                                      errors={errors}
                                      isRequired={true} requiredMessage={"وارد کردن شماره تلفن الزامی است"}
                                      number={true}
                                      pattern={{value: /^09\d{9}$/, message: "شماره موبایل باید با 09 شروع بشه و 11 رقم باشه",}}
                                      minLength={{value: 11, message: "شماره موبایل باید 11 رقم باشه",}}
                                      maxLength={{value: 11, message: "شماره موبایل باید 11 رقم باشه",}}/>
                        <CustomInputs type={"password"} placeHolder={"*********"} label={"رمز عبور"}
                                      post={"password"} register={register} errors={errors} isRequired={true}
                                      requiredMessage={"وارد کردن رمز عبور الزامی است"}/>
                        <CustomBtn text={"ورود"} loadingText={"درحال ورود.."}/>
                    </Form>
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <Link to="/auth/forgot-password" className="text-decoration-none text-color">
                        فراموشی رمز ورود
                    </Link>
                    <Link to="/auth/register" className="text-decoration-none text-color">
                        ایجاد حساب کاربری
                    </Link>
                </div>
                <div className="mt-3 mb-3">
                    <Image src="/img/raayasun.png" width="30px" height="30px"/>
                    <Link to={"https://raayasun.ir/"} className="text-decoration-none text-color me-2">
                        رایاسان پردازان پارت
                    </Link>
                </div>
            </div>
        </Container>
    );
}
