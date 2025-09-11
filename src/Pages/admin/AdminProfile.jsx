import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import MapComponent from "../../Components/MapComponent.jsx";
import { apiFilePost, apiGet } from "../../services/AxiosClient.jsx";
import PageTitle from "../../Components/public/PageTitle.jsx";
import CustomInputs from "../../Components/public/Inputs/CustomInputs.jsx";
import CustomBtn from "../../Components/public/CustomBtn.jsx";
import useAlert from "../../hook/Alert.jsx";
import SelectInput from "../../Components/public/Inputs/SelectInput.jsx";
import DateInput from "../../Components/public/Inputs/DateInput.jsx";

export default function AdminProfile() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [selectedFileName, setSelectedFileName] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const alert = useAlert();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        control,
        reset,
    } = useForm({ mode: "onChange" });

    const fetchData = async () => {
        try {
            const response = await apiGet(`profile`);
            console.log("this is response for profile", response);
            if (response) {
                reset({
                    fullName: response.name || "",
                    gender: response.gender || "",
                    birthday: response.birthday || "",
                    national_code: response.national_code || "",
                    email: response.email || "",
                    address: response.address || "",
                    mobile: response.mobile || "",
                    avatar: response.avatar || null,
                });
            }
            if (response.avatar) {
                setImagePreview(`${import.meta.env.VITE_API_URL}/${response.avatar}`);
            }
        } catch (error) {
            console.log("this is error", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (key === "avatar" && value) {
                    formData.append(key, value);
                } else if (key === "birthday" && value) {
                    const dateObj = new Date(value);
                    const formatted = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
                    formData.append(key, formatted);
                } else {
                    formData.append(key, value);
                }
            });

            for (let [key, val] of formData.entries()) {
                console.log(`${key} →`, val);
            }

            const response = await apiFilePost(`profile/update`, formData);
            console.log("response", response);

            await alert({
                title: "موفق",
                text: "اطلاعات پروفایل شما با موفقیت بروزرسانی شد",
                icon: "success",
            });

            setTimeout(() => {
                navigate(`/admin`);
            }, 500);
        } catch (error) {
            await alert({
                title: "نا موفق",
                text: "در ثبت اطلاعات مشکلی پیش آمده است",
                icon: "error",
            });
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="container-sm  mt-3">
            <PageTitle title={"پروفایل کاربری"} />
            <div className="my-5">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <CustomInputs type={"text"} placeHolder={"اینجا بنویسید"} label={"نام و نام خانوادگی"} post={"fullName"} register={register} errors={errors}/>
                    <SelectInput label=" جنسیت" post="gender" register={register} errors={errors} fallbackOptions={[{ value: "male", label: "مرد" }, { value: "female", label: "زن" },]}/>
                    <Form.Group className="mb-4 position-relative">
                        <Form.Label className={`fs-6 py-2 px-2 rounded-4 position-absolute top-0 start-0 translate-middle-y ms-3 bg-white`} style={{ zIndex: 2, pointerEvents: "none", whiteSpace: "nowrap" }}>
                            انتخاب عکس پروفایل
                        </Form.Label>
                        <Form.Control id="profilePhoto" type="file" accept="image/*" className="d-none"{...register("avatar")}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setSelectedFileName(file.name);
                                    const reader = new FileReader();
                                    reader.onloadend = () => setImagePreview(reader.result);
                                    reader.readAsDataURL(file);

                                    // ست کردن فقط همون فایل در فرم
                                    setValue("avatar", file);
                                } else {
                                    setSelectedFileName("");
                                    setImagePreview(null);
                                    setValue("avatar", null);
                                }
                            }}/>
                        <label htmlFor="profilePhoto" className="btn btn-outline-secondary rounded-5 py-3 w-100 fs-5" style={{ cursor: "pointer" }}>{selectedFileName || "انتخاب عکس پروفایل"}</label>
                        {imagePreview && (
                            <div className="mt-3 text-center">
                                <img src={imagePreview} alt="Preview" style={{maxWidth: "200px", maxHeight: "200px", borderRadius: "10px", objectFit: "cover",}}/>
                            </div>
                        )}
                    </Form.Group>
                    <DateInput control={control} post="birthday" register={register} errors={errors} setValue={setValue} text="تاریخ تولد" isStartDate={true} isBirthDay={true}/>
                    <CustomInputs type={"number"} placeHolder={"اینجا بنویسید"} label={"کد ملی"} post={"national_code"} register={register} errors={errors} minLength={{ value: 10, message: "کد ملی باید 10 رقم باشه" }} maxLength={{ value: 10, message: "کد ملی باید 10 رقم باشه" }}/>
                    <CustomInputs type={"email"} placeHolder={"اینجا بنویسید"} label={"ایمیل"} post={"email"} register={register} errors={errors}/>
                    <CustomInputs type={"text"} placeHolder={"اینجا بنویسید"} label={"نشانی منزل"} post={"address"} register={register} errors={errors} watch={watch}/>
                    <CustomInputs number={true} type={"tel"} placeHolder={"0912"} label={"موبایل"} post={"mobile"} register={register} errors={errors} isRequired={true} requiredMessage={"وارد کردن شماره تلفن الزامی است"} pattern={{value: /^09\d{9}$/, message: "شماره موبایل باید با 09 شروع بشه و 11 رقم باشه",}} minLength={{ value: 11, message: "شماره موبایل باید 11 رقم باشه" }} maxLength={{ value: 11, message: "شماره موبایل باید 11 رقم باشه" }}/>
                    <MapComponent onAddressSelect={({ address, lat, lng }) => {setValue("address", address);setValue("lat", lat);setValue("lng", lng);}}/>
                    <CustomBtn text={"ذخیره تغییرات"} loadingText={"درحال ذخیره.."} />
                    <Link to={"/admin-dashboard"} className="btn bg-smooth-gray mt-3 w-100 text-white fs-5 rounded-5 my-2 p-3">
                        بازگشت
                    </Link>
                </Form>
            </div>
        </Container>
    );
}
