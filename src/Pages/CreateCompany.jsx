import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAlert from "../hook/Alert.jsx";
import MapComponent from "../Components/MapComponent.jsx";
import 'leaflet/dist/leaflet.css';
import {apiPost} from "../services/AxiosClient.jsx";
import PageTitle from "../Components/public/PageTitle.jsx";
import CustomBtn from "../Components/public/CustomBtn.jsx";
import CustomInputs from "../Components/public/Inputs/CustomInputs.jsx";

export default function CreateCompany() {
  const [loading, setLoading] = useState(false);
  const [customMarker, setCustomMarker] = useState(null);
  const navigate = useNavigate();
  const alert = useAlert();
  const {
    register,
    setValue,
    handleSubmit,
      watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (!customMarker) {
          alert({
              icon: "error",
              title: "موقعیت مکانی یافت نشد!",
              text: "لطفاً اجازه دسترسی به موقعیت مکانی را بدهید.",
          });
        setLoading(false);
        return;
      }
      if(customMarker){
          data.lat =customMarker[0];
          data.lng =customMarker[1];
      }
      const response = await apiPost(`company`, data , {});
      console.log("Response:", response.data);
        alert({
            icon: "success",
            title: "موفقیت",
            text: "شرکت شما با موفقیت ساخته شد",
        });

      setTimeout(() => {
        navigate(`/admin`);
      }, 500);
    } catch (error) {
        alert({
            icon: "error",
            title: "ناموفق",
            text: "مشکلی در ایجاد شرکت پیش آمده است !",
        });

      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container className="container-sm align-items-center justify-content-center mt-3">
        <PageTitle title={"ایجاد کسب‌وکار من"}/>
        <div className="my-5">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <CustomInputs type={"text"} placeHolder={"اینجا بنویسید"} label={"عنوان کسب‌وکار شما"} post={"company_name"} register={register} errors={errors} isRequired={true} requiredMessage={"وارد کردن نام کسب و کار الزامی است"}/>
            <CustomInputs as={"textarea"} placeHolder={"اینجا بنویسید"} label={"نشانی منزل"} post={"address"} register={register} errors={errors} watch={watch}/>
            <div className="my-4 d-flex flex-column">
              <span className="fs-5 fw-bold text-color mt-3 mb-2">
                موقعیت شرکت شما
              </span>
              <MapComponent onAddressSelect={({ address, lat, lng }) => {setValue("address", address);setValue("lat", lat);setValue("lng", lng); setCustomMarker([lat, lng]);}} />
            </div>
            <CustomBtn text={"ثبت کسب و کار من"} loadingText={"درحال ثبت.."}/>
            <Link to={"/invite-box"} className="btn bg-smooth-gray mt-3 w-100 text-white fs-5 rounded-5 my-2 p-3">
              بازگشت
            </Link>
          </Form>
        </div>
    </Container>
  );
}
