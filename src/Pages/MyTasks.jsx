import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import Swal from "sweetalert2";
import { useServer } from "../AppContext.jsx";

export default function MyTasks() {
  const navigate = useNavigate();
  const { serverAddress } = useServer();
  const [taskId, setTaskId] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const Token = localStorage.getItem("authToken");
      const tasks = await axios.get("${serverAddress}", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      console.log("this is response for delete", tasks);
      setTaskId(tasks?.data.task_id);
    };
    getTasks();
  }),
    [reload];

  const endTask = async (id) => {
    try {
      const response = await axios.post(`${serverAddress}/delete-task${id}`, {
        task_id: taskId,
      });
      setReload((prev) => !prev);

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
            <span className="fs-5">لیست وظیفه های من </span>
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
        <div className=" d-flex flex-column gap-4">
          <div className="col-12 my-4">
            <div className="d-flex flex-column p-3 border-color rounded-4 bg-orange text-white ">
              <div className="justify-content-between d-flex">
                <span className="fw-bold">کامل کردن صفحه لاگین</span>
                <span className="fw-bold">#13</span>
              </div>
              <div className="justify-content-between d-flex mt-3">
                <span className="fw-bold">مهلت انجام تا تاریخ:</span>
                <span className="fw-bold">1404/03/03</span>
              </div>
              <div className="mt-3">
                <p className="fs-6 text-justifyed">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                </p>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button
                  className="btn btn-green px-3 py-2 text-white fs-6 rounded-4"
                  type="submit"
                  onClick={() => endTask(taskId)}
                >
                  اتمام
                </button>
                <button
                  className="btn btn-blue px-3 py-2 text-white fs-6 rounded-4 ms-2"
                  type="submit"
                  onClick={() => endTask(taskId)}
                >
                  نیازمند زمان
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 my-4">
            <div className="d-flex flex-column p-3 border-color rounded-4 bg-orange text-white ">
              <div className="justify-content-between d-flex">
                <span className="fw-bold">کامل کردن صفحه لاگین</span>
                <span className="fw-bold">#13</span>
              </div>
              <div className="justify-content-between d-flex mt-3">
                <span className="fw-bold">مهلت انجام تا تاریخ:</span>
                <span className="fw-bold">1404/03/03</span>
              </div>
              <div className="mt-3">
                <p className="fs-6 text-justifyed">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                </p>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button
                  className="btn btn-green px-3 py-2 text-white fs-6 rounded-4"
                  type="submit"
                  onClick={() => endTask(taskId)}
                >
                  اتمام
                </button>
                <button
                  className="btn btn-blue px-3 py-2 text-white fs-6 rounded-4 ms-2"
                  type="submit"
                  onClick={() => endTask(taskId)}
                >
                  نیازمند زمان
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 my-4">
            <div className="d-flex flex-column p-3 border-color rounded-4 bg-orange text-white ">
              <div className="justify-content-between d-flex">
                <span className="fw-bold">کامل کردن صفحه لاگین</span>
                <span className="fw-bold">#13</span>
              </div>
              <div className="justify-content-between d-flex mt-3">
                <span className="fw-bold">مهلت انجام تا تاریخ:</span>
                <span className="fw-bold">1404/03/03</span>
              </div>
              <div className="mt-3">
                <p className="fs-6 text-justifyed">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                </p>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button
                  className="btn btn-green px-3 py-2 text-white fs-6 rounded-4"
                  type="submit"
                  onClick={() => endTask(taskId)}
                >
                  اتمام
                </button>
                <button
                  className="btn btn-blue px-3 py-2 text-white fs-6 rounded-4 ms-2"
                  type="submit"
                  onClick={() => endTask(taskId)}
                >
                  نیازمند زمان
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
