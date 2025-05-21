import { Container, Image, InputGroup } from "react-bootstrap";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { Link, useNavigate } from "react-router-dom";
import ExitConfirmation from "./ExitConfirmation.jsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import "react-multi-date-picker/styles/layouts/mobile.css";

export default function EmployeesTasks() {
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
      FullName: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(``, data);

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
        title: "کمی صبر کتید..",
      });
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
        title: error.response.data.message,
      });
    }
  };
  return (
    <Container className="container-sm mt-3" style={{ direction: "rtl" }}>
      <div className="row">
        <div className="d-flex mb-4 mt-2 justify-content-between">
          <div>
            <span className="fs-5"> ایجاد تسک برای کارمندان </span>
          </div>
          <div className="">
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
        </div>
        <div className=" d-flex flex-column ">
          <div className="col-12">
            <span className="fs-5 fw-bold d-inline-block border-2 border-secondary border-bottom pe-5 py-3 mb-5">
              لیست کارمندان شرکت
            </span>
          </div>
          <div className="col-12">
            <div className="d-flex bg-secondary justify-content-between rounded-4 p-2 mt-2 mb-3">
              <div className={"d-flex flex-column"}>
                <span className="text-white fs-5">عرفان محسنی </span>
              </div>
              <div className="d-flex align-items-end">
                <Link
                  to={"/add-task"}
                  className="btn btn-blue text-nowrap rounded-4 text-white fs-7 px-4"
                >
                  ایجاد تسک
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="d-flex bg-secondary justify-content-between rounded-4 p-2 mt-2 mb-3">
              <div className={"d-flex flex-column"}>
                <span className="text-white fs-5">عرفان محسنی </span>
              </div>
              <div className="d-flex align-items-end">
                <Link
                  to={"/add-task"}
                  className="btn btn-blue text-nowrap rounded-4 text-white fs-7 px-4"
                >
                  ایجاد تسک
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="d-flex bg-secondary justify-content-between rounded-4 p-2 mt-2 mb-3">
              <div className={"d-flex flex-column"}>
                <span className="text-white fs-5">عرفان محسنی </span>
              </div>
              <div className="d-flex align-items-end">
                <Link
                  to={"/add-task"}
                  className="btn btn-blue text-nowrap rounded-4 text-white fs-7 px-4"
                >
                  ایجاد تسک
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
