import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate,} from "react-router-dom";
import { useForm } from "react-hook-form";
import PageTitle from "../../Components/public/PageTitle.jsx";
import CustomInputs from "../../Components/public/Inputs/CustomInputs.jsx";
import CustomBtn from "../../Components/public/CustomBtn.jsx";
import useAlert from "../../hook/Alert.jsx";
import {apiPost} from "../../services/AxiosClient.jsx";
import {useAuth} from "../../Context/AuthContext.jsx";

export default function NewPassword() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();
    const {hash, mobile} = useAuth()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        setLoading(true);
        data.mobile = mobile;
        data.hash= hash;
        try {
            const response = await apiPost(`auth/reset-password`, data);
            console.log("Response:", response.data);
            alert({
                icon: "success",
                title: "موفق",
                text: "رمز عبور با موفقیت تغییر کرد",
            });

            setTimeout(() => {
                navigate(`/auth/login`);
            }, 500);
        } catch (error) {
            alert({
                icon: "error",
                title: "خطا",
                text: "مشکلی در تغییر رمز عبور پیش آمده است است",
            });
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const password = watch("password");

    return (
        <Container className="container-sm align-items-center justify-content-center mt-3">
            <div className="d-flex flex-column ">
                <PageTitle title={"رمز ورود جدید"}/>
                <div className=" d-flex flex-column gap-2 p-2">
                    <span className="fs-4 fw-bold ">تعیین رمز ورود جدید</span>
                    <span className="text-color">رمز ورود جدیدی برای خود بنویسید</span>
                </div>
                <div className="my-4">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <CustomInputs type={"password"} placeHolder={"*********"} label={"رمز عبور جدید"} post={"password"} register={register} errors={errors} isRequired={true} requiredMessage={"وارد کردن رمز عبور الزامی است"} pattern={{pattern: {value: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/, message: "رمز عبور باید شامل یک حرف بزرگ و یک عدد باشد",}}} minLenght={{minLength: {value: 8, message: "رمز عبور باید حداقل 8 کاراکتر باشد",},}}/>
                        <CustomInputs type={"password"} placeHolder={"*********"} label={" تکرار رمز عبور جدید"} post={"confirm_password"} register={register} errors={errors} isRequired={true} requiredMessage={"وارد کردن رمز عبور الزامی است"} validate={{validate: (value) => value === password || "رمز عبور و تأیید آن باید یکسان باشند",}}/>
                        <CustomBtn text={"ویرایش رمز عبور"} loadingText={"درحال ویرایش"}/>
                    </Form>
                </div>
            </div>
        </Container>
    );
}