import { Container, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { useServer } from "../../AppContext.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

export default function EditTask() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState(false);
  const navigate = useNavigate();
  const { serverAddress } = useServer();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

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
      console.log("this is employee task : ", employeeTask) ;
      setTask(employeeTask?.data)
      
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
              className="mb-3 mt-4 position-relative"
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
                onChange={(e)=> setTask(e.target.value)}
                className="rounded-5 py-3 no-arrows text-end"
                {...register("task_title")}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                readOnly
              />
              {errors.task_title && (
                <p className="text-danger mt-2">{errors.task_title.message}</p>
              )}
            </Form.Group>
            <Form.Group
              className="mb-3 position-relative mt-4"
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
                {...register("task_description")}
                onFocus={() => setIsFocused2(true)}
                onBlur={() => setIsFocused2(false)}
                value={task?.description}
                onChange={(e)=>setTask(e.target.value)}
                className="rounded-5 py-3 no-arrows text-right w-100 px-2"
                style={{ direction: "rtl", textAlign: "right" }}
              />
              {errors.task_description && (
                <p className="text-danger mt-2">
                  {errors.task_description.message}
                </p>
              )}
            </Form.Group>
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
