import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import PageTitle from "../../Components/public/PageTitle.jsx";
import CustomInputs from "../../Components/public/Inputs/CustomInputs.jsx";
import CustomBtn from "../../Components/public/CustomBtn.jsx";
import {apiPost} from "../../services/AxiosClient.jsx";
import {useAuth} from "../../Context/AuthContext.jsx";

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setUserMobile} =useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });
    const onSubmit = async (data) => {
        console.log(data)
        setLoading(true);

        try {
            const response = await apiPost(`auth/forgot-password`, data);
            console.log("Response:", response);
            setUserMobile(data?.mobile)
            setTimeout(() => {
                navigate(`/auth/otp-reset-password`);
            }, 500);
        } catch (error) {
            console.log("error is :",error);
        }finally {
            setLoading(false);
        }
    };

    return (
        <Container className="container-sm align-items-center justify-content-center mt-3">
            <div className="d-flex flex-column">
                <PageTitle title={"فراموشی رمز عبور"}/>
                <div className=" d-flex flex-column gap-2 p-2">
                    <span className="fs-4 fw-bold">رمزعبورم خود را فراموش کرده اید !</span>
                    <span className="text-color">
                        شماره موبایل خود را جهت بازیابی رمز عبز وارد کنید.
                    </span>
                </div>
                <div className="my-4">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <CustomInputs type={"tel"} placeHolder={"0912"} label={"موبایل"} post={"mobile"} register={register} errors={errors} isRequired={true} requiredMessage={"وارد کردن شماره تلفن الزامی است"} pattern={{value: /^09\d{9}$/, message: "شماره موبایل باید با 09 شروع بشه و 11 رقم باشه",}} minLength={{value: 11, message: "شماره موبایل باید 11 رقم باشه",}} maxLength={{value: 11, message: "شماره موبایل باید 11 رقم باشه",}}/>
                       <CustomBtn text={"ویرایش رمز عبور"} loadingText={"درحال انجام"} />
                    </Form>
                </div>
            </div>
        </Container>
    );
}