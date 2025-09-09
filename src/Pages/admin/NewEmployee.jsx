import { Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState} from "react";
import { Link, useNavigate, } from "react-router-dom";
import { useForm } from "react-hook-form";
import PageTitle from "../../Components/public/PageTitle.jsx";
import CustomInputs from "../../Components/public/Inputs/CustomInputs.jsx";
import SelectInput from "../../Components/public/Inputs/SelectInput.jsx";
import CustomBtn from "../../Components/public/CustomBtn.jsx";
import useAlert from "../../hook/Alert.jsx";
import {apiPost} from "../../services/AxiosClient.jsx";
import {useAuth} from "../../Context/AuthContext.jsx";

export default function NewEmployee() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();
    const {company} = useAuth()
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const onSubmit = async (data) => {
        setLoading(true);
        data.company_id =company.id;
        console.log("this is data" , data)
        try {
           const response = await apiPost(`employees`,data);
           await alert({
               title: "موفق",
               text:"کارمند با موفقیت ثبت شد",
               icon: "success",
           })
            setTimeout(() => {
                navigate(`/admin`);
            }, 500);
            console.log("response", response)
        } catch (error) {
            await alert({
                title: "ناموفق",
                text:"در ثبت کارمند مشکلی پیش آمده است",
                icon: "error",
            })
            console.log(error)
        } finally {
            setLoading(false);
        }
    };
    return (
        <Container className="container-sm mt-3">
           <PageTitle title={"ثبت کارمند جدید"} />
            <div className="my-5">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <CustomInputs type={"text"} placeHolder={"اینجا بنویسید"} label={"نام و نام خانوادگی"} post={"name"} register={register} errors={errors}/>
                    <SelectInput label=" جنسیت" post="gender" register={register} errors={errors} fallbackOptions={[{ value: "male", label: "مرد" }, { value: "female", label: "زن" },]}/>
                    <CustomInputs number={true} type={"tel"} placeHolder={"0912"} label={"موبایل"} post={"mobile"} register={register} errors={errors} isRequired={true} requiredMessage={"وارد کردن شماره تلفن الزامی است"} pattern={{value: /^09\d{9}$/, message: "شماره موبایل باید با 09 شروع بشه و 11 رقم باشه",}} minLength={{value: 11, message: "شماره موبایل باید 11 رقم باشه",}} maxLength={{value: 11, message: "شماره موبایل باید 11 رقم باشه",}}/>
                   <CustomBtn text={"ثبت کارمند"} loadingText={"درحال ثبت"}/>
                    <Link to={"/admin"} className="btn bg-smooth-gray mt-3 w-100 text-white fs-5 rounded-5 my-2 p-3">
                        بازگشت
                    </Link>
                </Form>
            </div>
        </Container>
    );
}
