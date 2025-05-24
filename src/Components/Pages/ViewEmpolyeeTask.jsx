import { Container} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import Swal from "sweetalert2";
import { useServer } from "../../AppContext.jsx";

export default function ViewEmployeeTask() {
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
  }), [reload];

  const deleteTask = async (id) => {
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
            <span className="fs-5">لیست تسک های عرفان محسنی</span>
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
              لیست تسک ها
            </span>
          </div>
          <div className="col-12">
            <div className="d-flex flex-column p-3 border border-2 border-secondary rounded-4 ">
              <div className="justify-content-between d-flex">
                <span className="fw-bold">کامل کردن صفحه لاگین</span>
                <span className="fw-bold">#13</span>
              </div>
              <div className="justify-content-between d-flex mt-3">
                <span className="fw-bold">مهلت انجام تا تاریخ:</span>
                <span className="fw-bold text-danger">1404/03/03</span>
              </div>
              <div className="text-justifyed mt-3">
                <p>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                </p>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <Link
                  to={"/view"}
                  className="btn bg-yellow text-white fs-6 rounded-3"
                >
                  مشاهده
                </Link>
                <Link
                  to={"/edit-task"}
                  className="btn btn-blue text-white fs-6 rounded-3 mx-3"
                >
                  ویرایش
                </Link>
                <button
                  className="btn btn-red text-white fs-6 rounded-3"
                  type="submit"
                  onClick={() => deleteTask(taskId)}
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
