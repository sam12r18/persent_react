import { Container, Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import DateInput from "../../Components/public/Inputs/DateInput.jsx";
import CustomInputs from "../../Components/public/Inputs/CustomInputs.jsx";
import CustomBtn from "../../Components/public/CustomBtn.jsx";
import PageTitle from "../../Components/public/PageTitle.jsx";
import {apiGet, apiPost} from "../../services/AxiosClient.jsx";
import useAlert from "../../hook/Alert.jsx";

export default function EditTask() {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
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
      const employeeTask = await apiGet(``, data, {});
      console.log("this is employee task : ", employeeTask);
      setTask(employeeTask?.data);

      const response = await apiPost(``, data);
      console.log("Response:", response.data);

        alert({
            icon: "success",
            title: "موفق",
            text: "وظیفه با موفقیت ویرایش شد",
        });

      setTimeout(() => {
        navigate(`/admin-dashboard`);
      }, 500);
    } catch (error) {
        alert({
            icon: "error",
            title: "ناموفق",
            text: "در ویرایش وظیفه مشکل یپیش آمده است",
        });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container className="container-sm align-items-center justify-content-center mt-3">
        <PageTitle title="ویرایش وظیفه" />
        <span className="text-color fs-5">عرفان محسنی</span>
        <div className="my-5">
          <Form onSubmit={handleSubmit(onSubmit)}>
              <CustomInputs type={"text"} placeHolder={"اینجا بنویسید"} label={"نام پروژه"} post={"project_name"} register={register} errors={errors} watch={watch}/>
              <CustomInputs type={"text"} placeHolder={"اینجا بنویسید"} label={"کامل کردن بخش"} post={"task_title"} register={register} errors={errors} watch={watch}/>
              <CustomInputs as="textarea" placeHolder="اینجا بنویسید" label="توضیحات وظیفه" post="task_description" register={register} errors={errors} watch={watch} isRequired={true} requiredMessage="توضیحات وظیفه الزامی است"/>
              <div className="d-flex gap-2 my-5">
                  <div className="col-6">
                      <DateInput control={control} post="start_date" register={register} errors={errors} setValue={setValue} start_date={start_date} end_date={end_date} text="تاریخ شروع" isStartDate={true}/>
                  </div>
                  <div className="col-6">
                      <DateInput control={control} post="end_date" register={register} errors={errors} setValue={setValue} start_date={start_date} end_date={end_date} text="تاریخ پایان" isStartDate={false}/>
                  </div>
              </div>
            <CustomBtn type="submit" text="ویرایش وظیفه" loading={"درحال ویرایش"}/>
          </Form>
        </div>
    </Container>
  );
}
