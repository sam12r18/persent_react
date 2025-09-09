import { Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import MapComponent from "../../Components/MapComponent.jsx";
import {apiFilePost} from "../../services/AxiosClient.jsx";
import PageTitle from "../../Components/public/PageTitle.jsx";
import CustomInputs from "../../Components/public/Inputs/CustomInputs.jsx";
import CustomBtn from "../../Components/public/CustomBtn.jsx";
import useAlert from "../../hook/Alert.jsx";
import SelectInput from "../../Components/public/Inputs/SelectInput.jsx";
import DateInput from "../../Components/public/Inputs/DateInput.jsx";

export default function AdminProfile() {
    const [isFocused2, setIsFocused2] = useState(false);
    const [isFocused3, setIsFocused3] = useState(false);
    const [isFocused4, setIsFocused4] = useState(false);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);
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
    } = useForm({ mode: "onChange" });
    const startDate = watch("startDate");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsFocused2(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (key === "profilePhoto" && value?.[0]) {
                    formData.append(key, value[0]);
                } else if (value instanceof Date) {
                    formData.append(key, value.toISOString());
                } else {
                    formData.append(key, value);
                }
            });
            const response = await apiFilePost(``, formData);
            console.log("response" , response)
            await alert({
                title: "موفق",
                text:"خوش آمدید",
                icon: "success",
            });

            setTimeout(() => {
                navigate(`/`);
            }, 500);
        } catch (error) {
            await alert({
                title: "نا موفق",
                text:"در ثبت اطلاعات مشکلی پیش آمده است",
                icon: "error",
            });
            console.log(error)
        } finally {
            setLoading(false);
        }
    };
    return (
        <Container className="container-sm  mt-3">
            <div className="d-flex flex-column">
               <PageTitle title={"پروفایل کاربری"}/>
                <div className="my-5">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <CustomInputs type={"text"} placeHolder={"اینجا بنویسید"} label={"نام و نام خانوادگی"} post={"fullName"} register={register} errors={errors}/>
                        <SelectInput label=" جنسیت" post="gender" register={register} errors={errors} fallbackOptions={[{ value: "1", label: "مرد" }, { value: "2", label: "زن" },]}/>
                        <Form.Group className="mb-4 position-relative">
                            <Form.Label
                                className={`fs-6 py-2 px-2 rounded-4 position-absolute top-0 start-0 translate-middle-y ms-3 bg-white ${
                                    isFocused3 ? "text-orange" : "text-color"
                                }`}
                                style={{ zIndex: 2, pointerEvents: "none", whiteSpace: "nowrap" }}>
                                انتخاب عکس پروفایل
                            </Form.Label>

                            <Form.Control
                                id="profilePhoto"
                                type="file"
                                accept="image/*"
                                className="d-none"
                                {...register("profilePhoto")}
                                onFocus={() => setIsFocused3(true)}
                                onBlur={() => setIsFocused3(false)}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    setSelectedFileName(file?.name || "");
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setImagePreview(reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                    } else {
                                        setImagePreview(null);
                                    }
                                }}
                            />

                            <label htmlFor="profilePhoto" className="btn btn-outline-secondary rounded-5 py-3 w-100 fs-5" style={{ cursor: "pointer" }}>
                                {selectedFileName || "انتخاب عکس پروفایل"}
                            </label>
                            {imagePreview && (
                                <div className="mt-3 text-center">
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        style={{ 
                                            maxWidth: '200px', 
                                            maxHeight: '200px',
                                            borderRadius: '10px',
                                            objectFit: 'cover'
                                        }} 
                                    />
                                </div>
                            )}
                        </Form.Group>
                        <DateInput control={control} post="birthday_date" register={register} errors={errors} setValue={setValue} text="تاریخ تولد" isStartDate={true}/>

                        <CustomInputs type={"number"} placeHolder={"اینجا بنویسید"} label={"کد ملی"} post={"nationalCode"} register={register} errors={errors}   minLength={{value: 10, message: "کد ملی باید 10 رقم باشه",}} maxLength={{value: 10, message: "کد ملی باید 10 رقم باشه",}}/>
                        <CustomInputs type={"text"} placeHolder={"اینجا بنویسید"} label={"نشانی منزل"} post={"address"} register={register} errors={errors} watch={watch}/>
                        <MapComponent onAddressSelect={({ address, lat, lng }) => {setValue("address", address);setValue("lat", lat);setValue("lng", lng);}}/>
                        <CustomInputs number={true} type={"tel"} placeHolder={"0912"} label={"موبایل"} post={"mobile"} register={register} errors={errors} isRequired={true} requiredMessage={"وارد کردن شماره تلفن الزامی است"} pattern={{value: /^09\d{9}$/, message: "شماره موبایل باید با 09 شروع بشه و 11 رقم باشه",}} minLength={{value: 11, message: "شماره موبایل باید 11 رقم باشه",}} maxLength={{value: 11, message: "شماره موبایل باید 11 رقم باشه",}}/>
                        <CustomBtn text={"دخیره تغییرات"} loadingText={"درحال ذخیره.."}/>
                        <Link to={"/admin-dashboard"} className="btn bg-smooth-gray mt-3 w-100 text-white fs-5 rounded-5 my-2 p-3">
                            بازگشت
                        </Link>
                    </Form>
                </div>
            </div>
        </Container>
    );
}
