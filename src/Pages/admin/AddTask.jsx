import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PageTitle from "../../Components/public/PageTitle.jsx";
import CustomInputs from "../../Components/public/Inputs/CustomInputs.jsx";
import CustomBtn from "../../Components/public/CustomBtn.jsx";
import DateInput from "../../Components/public/Inputs/DateInput.jsx";
import {apiPost} from "../../services/AxiosClient.jsx";
import useAlert from "../../hook/Alert.jsx";

export default function AddTask() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      task_title: "",
      task_description: "",
      start_date: null,
      end_date: null,
    },
  });
  const start_date = watch("start_date");
  const end_date = watch("end_date");

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);

    try {
      const response = await apiPost(``, data);
      console.log("Response:", response.data);
        alert({
            icon: "success",
            title: "موفق",
            text: "وظیفه با موفقیت ثبت ش ",
        });

      setTimeout(() => {
        navigate(`/admin-dashboard`);
      }, 500);
    } catch (error) {
        alert({
            icon: "error",
            title: "ناموفق",
            text: "در ثب ت وظیقه مشکل پیش آمده است",
        });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="container-sm align-items-center justify-content-center mt-3">
      <div className="row">
          <PageTitle title={"ایجاد وظیفه برای کارمندان"}/>
          <span className="text-color mb-3 fs-5">عرفان محسنی</span>
        <div className="my-5">
          <Form onSubmit={handleSubmit(onSubmit)}>
              <CustomInputs type={"text"} placeHolder={"اینجا بنویسید"} label={"نام پروژه"} post={"project_name"} register={register} errors={errors} watch={watch}/>
              <CustomInputs type={"text"} placeHolder={"اینجا بنویسید"} label={"کامل کردن بخش"} post={"task_title"} register={register} errors={errors} watch={watch}/>
              <CustomInputs as="textarea" placeHolder="اینجا بنویسید" label="توضیحات وظیفه" post="task_description" register={register} errors={errors} watch={watch} isRequired={true} requiredMessage="توضیحات وظیفه الزامی است"/>
                <div className="d-flex row mb-5 mt-5">
                  <div className="col-6">
                    <DateInput control={control} post="start_date" register={register} errors={errors} setValue={setValue} start_date={start_date} end_date={end_date} text="تاریخ شروع" isStartDate={true}/>
                  </div>
                  <div className="col-6">
                    <DateInput control={control} post="end_date" register={register} errors={errors} setValue={setValue} start_date={start_date} end_date={end_date} text="تاریخ پایان" isStartDate={false}/>
                  </div>
                </div>
            <CustomBtn text={"ایجاد وظبفه"} loadingText={"درحال ایجاد"}/>
          </Form>
        </div>
      </div>
    </Container>
  );
}
