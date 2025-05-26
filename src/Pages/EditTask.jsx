import { Container, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { useServer } from "../AppContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function EditTask() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState(false);
  const navigate = useNavigate();
  const { serverAddress } = useServer();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
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
      const Token = localStorage.getItem("authToken");
      const employeeTask = await axios.get("${serverAddress}", data, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      console.log("this is employee task : ", employeeTask);
      setTask(employeeTask?.data);

      const response = await axios.post(`${serverAddress}`, data);
      console.log("Response:", response.data);

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      await Toast.fire({
        icon: "success",
        title: "وظیفه شما با موفقیت ویرایش شد",
      });

      setTimeout(() => {
        navigate(`/admin-dashboard`);
      }, 500);
    } catch (error) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      await Toast.fire({
        icon: "error",
        title: `${error.response?.data?.message || "خطایی رخ داد"}`,
      });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="container-sm align-items-center justify-content-center mt-3">
      <div className="row">
        <div className="text-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
            role="button"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 7.5H14.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
        </div>
        <div className="mt-5 d-flex flex-column">
          <div className="d-flex justify-content-between">
            <span className="fs-4 fw-bold mb-3"> ویرایش وظیفه شماره </span>
            <span className="fs-4 fw-bold ">#22</span>
          </div>
          <span className="text-color mb-3 fs-5">عرفان محسنی</span>
        </div>
        <div className="mt-5 mb-5">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group
              className="mb-5 mt-5 position-relative"
              controlId="taskTitle"
            >
              <Form.Label
                column="sm"
                className={`rounded-4 fs-6 py-2 px-2 ${
                  isFocused || errors.taskTitle ? "text-orange" : "text-color"
                }`}
              >
                نام وظیفه
              </Form.Label>
              <Form.Control
                type="text"
                value={task?.title}
                onChange={(e) => setTask(e.target.value)}
                className="rounded-5 py-3 no-arrows text-end"
                {...register("task_title", {
                  required: "نام وظیفه نباید خالی باشد",
                })}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                readOnly
              />
              {errors.task_title && (
                <p className="text-danger mt-2">{errors.task_title.message}</p>
              )}
            </Form.Group>
            <Form.Group
              className="mb-5 mt-5 position-relative "
              controlId="taskDescription"
            >
              <Form.Label
                column="sm"
                className={`rounded-4 fs-6 py-2 px-2 ${
                  isFocused2 || errors.taskDescription
                    ? "text-orange"
                    : "text-color"
                }`}
              >
                توضیحات وظیفه
              </Form.Label>
              <textarea
                {...register("task_description", {
                  required: "توضیحات وظیفه نمی‌تواند خالی باشد",
                })}
                onFocus={() => setIsFocused2(true)}
                onBlur={() => setIsFocused2(false)}
                value={task?.description}
                onChange={(e) => setTask(e.target.value)}
                className="rounded-5 py-3 no-arrows text-right w-100 px-2"
                style={{ direction: "rtl", textAlign: "right" }}
              />
              {errors.task_description && (
                <p className="text-danger mt-2">
                  {errors.task_description.message}
                </p>
              )}
            </Form.Group>
            <div className="d-flex row mb-5 mt-5">
              <div className="col-6">
                <Form.Group className="position-relative" controlId="startDate">
                  <Form.Label
                    column="sm"
                    className={`rounded-4 fs-6 py-2 px-2 ${
                      isFocused3 || errors.start_date
                        ? "text-orange"
                        : "text-color"
                    }`}
                  >
                    از تاریخ
                  </Form.Label>
                  <DatePicker
                    inputClass="form-control rounded-5 py-3 text-end"
                    calendar={persian}
                    locale={persian_fa}
                    value={start_date}
                    {...register("start_date", {
                      required: "تاریخ شروع نمی‌تواند خالی باشد",
                      validate: {
                        notPast: (value) =>
                          value >= new Date().setHours(0, 0, 0, 0) ||
                          "تاریخ شروع نمی‌تواند در گذشته باشد",
                        validEnd: (value) =>
                          !end_date ||
                          value <= end_date ||
                          "تاریخ شروع باید قبل یا برابر با تاریخ پایان باشد",
                      },
                    })}
                    onChange={(date) =>
                      setValue("start_date", date?.toDate?.() || null, {
                        shouldValidate: true,
                      })
                    }
                    onFocus={() => setIsFocused3(true)}
                    onBlur={() => setIsFocused3(false)}
                  />
                  {errors.start_date && (
                    <p className="text-danger mt-2">
                      {errors.start_date.message}
                    </p>
                  )}
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="position-relative" controlId="endDate">
                  <Form.Label
                    column="sm"
                    className={`rounded-4 fs-6 py-2 px-2 ${
                      isFocused4 || errors.end_date
                        ? "text-orange"
                        : "text-color"
                    }`}
                  >
                    تا تاریخ
                  </Form.Label>
                  <DatePicker
                    inputClass="form-control rounded-5 py-3 text-end"
                    calendar={persian}
                    locale={persian_fa}
                    value={end_date}
                    minDate={start_date}
                    {...register("end_date", {
                      required: "تاریخ پایان نمی‌تواند خالی باشد",
                      validate: (value) =>
                        !start_date ||
                        value >= start_date ||
                        "تاریخ پایان باید بعد یا برابر با تاریخ شروع باشد",
                    })}
                    onChange={(date) =>
                      setValue("end_date", date?.toDate?.() || null, {
                        shouldValidate: true,
                      })
                    }
                    onFocus={() => setIsFocused4(true)}
                    onBlur={() => setIsFocused4(false)}
                  />
                  {errors.end_date && (
                    <p className="text-danger mt-2">
                      {errors.end_date.message}
                    </p>
                  )}
                </Form.Group>
              </div>
            </div>
            <Button
              variant="primary"
              type="submit"
              className="w-100 rounded-5 fs-6 input-color border border-color py-3 mt-4"
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  در حال ارسال...
                </>
              ) : (
                "ویرایش وظیفه"
              )}
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}
