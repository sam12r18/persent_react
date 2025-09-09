import { Container, Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import { useForm } from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import CustomInputs from "../../Components/public/Inputs/CustomInputs.jsx";
import CustomBtn from "../../Components/public/CustomBtn.jsx";
import PageTitle from "../../Components/public/PageTitle.jsx";
import {apiPost} from "../../services/AxiosClient.jsx";
import useAlert from "../../hook/Alert.jsx";
import {useAuth} from "../../Context/AuthContext.jsx";


export default function Register() {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const alert = useAlert();
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
        setLoading(true);
        try {
            const response = await apiPost(`auth/register`, data ,);
            console.log("Response:", response);
            setUserMobile(data.mobile);
            setTimeout(() => {
            navigate(`/auth/otp`);
          }, 500);
        } catch (error) {
            console.log("error is :",error);
            alert({
                icon: "error",
                title: "خطا",
                text: "مشکلی در ثبت نام پیش آمده است",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="container-sm align-items-center justify-content-center mt-3">
            <div className="d-flex flex-column">
                <PageTitle title={"ایجاد حساب کاربری"}/>
                <Image src="/img/Header.png" className="mx-auto" style={{width:'100px'}} />
                <div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <CustomInputs type={"tel"} placeHolder={"0912"} label={"موبایل"} post={"mobile"} register={register} errors={errors} isRequired={true} requiredMessage={"وارد کردن شماره تلفن الزامی است"} pattern={{value: /^09\d{9}$/, message: "شماره موبایل باید با 09 شروع بشه و 11 رقم باشه",}} minLength={{value: 11, message: "شماره موبایل باید 11 رقم باشه",}} maxLength={{value: 11, message: "شماره موبایل باید 11 رقم باشه",}}/>
                        <CustomInputs type="text" placeHolder="اینجا وارد کنید" label="نام و نام خانوادگی" post="name" register={register} errors={errors} isRequired={true} requiredMessage="وارد کردن نام و نام خانوادگی الزامی است" pattern={{value: /^[\u0600-\u06FF\u200c\s]+$/u, message: "فقط حروف فارسی مجاز است",}} minLength={{ value: 2, message: "حداقل ۲ کاراکتر" }} maxLength={{ value: 50, message: "حداکثر ۵۰ کاراکتر" }}/>
                        <CustomInputs type={"password"} placeHolder={"*********"} label={"رمز عبور"} post={"password"} register={register} errors={errors} isRequired={true} requiredMessage={"وارد کردن رمز عبور الزامی است"}/>
                        <CustomInputs type={"password"} placeHolder={"*********"} label={"تکرار رمز عبور"} post={"password_confirmation"} register={register} errors={errors} isRequired={true} requiredMessage={"وارد کردن رمز عبور الزامی است"}/>
                        <CustomInputs type={"number"} placeHolder={""} label={"کد معرف"} post={"ref_code"} register={register} errors={errors}/>
                        <span className="ps-3 d-block mb-4">
                            ثبت نام در رایاحضور به منزله
                            <Link to={"/auth/terms"}  state={{ from: location.pathname }}> پذیرش قوانین و مقررات </Link>این برنامه می‌باشد
                        </span>
                        <CustomBtn text={"ثبت نام"} loadingText={"درحال ارسال.."}/>
                    </Form>
                </div>
                <div className="my-4">
                    <Image src="/img/raayasun.png" width="30px" height="30px"/>
                    <Link to={"https://raayasun.ir/"}  className="text-decoration-none text-color me-2">
                        رایاسان پردازان پارت
                    </Link>
                </div>
            </div>
        </Container>
    );
}