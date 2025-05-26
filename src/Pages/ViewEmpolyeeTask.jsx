import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import Swal from "sweetalert2";
import { useServer } from "../AppContext.jsx";

export default function ViewEmployeeTask() {
  const navigate = useNavigate();
  const { serverAddress } = useServer();
  const [dataTasks, setDataTasks] = useState();
  const Token = localStorage.getItem("authToken");

  useEffect(() => {
    const getTasks = async () => {
      const { data } = await axios.get("${serverAddress}", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      console.log("this is response for delete", data);
      setDataTasks(data?.tasks);
    };
    getTasks();
  }),
    [];

  const deleteTask = async (id) => {
    try {
      const response = await axios.post(`${serverAddress}/delete-task`, {task_id : id});
      console.log("this is response for delete item :", response);
      

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
      setDataTasks(prev=>prev.filter(item=> item?.id !== id));
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
        <div className="col-12">
          <div className="d-flex mb-4 mt-2 justify-content-between">
            <div>
              <span className="fs-5">لیست وظیفه های عرفان محسنی</span>
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
        </div>
        <div className="col-12">
          <div className=" row flex-column gap-4">
            {Array.isArray(dataTasks) &&
              dataTasks?.length > 0 &&
              dataTasks.map((item) => (
                <div className="col-12 my-3" key={item?.id}>
                  <div className="d-flex flex-column p-3 border-color rounded-4 bg-orange text-white ">
                    <div className="justify-content-between d-flex">
                      <span className="fw-bold"> {item?.title??"نامشخص"}</span>
                      <span className="fw-bold">{item?.id ?? "نامشخص"}</span>
                    </div>
                    <div className="justify-content-between d-flex mt-3">
                      <span className="fw-bold">مهلت انجام تا تاریخ:</span>
                      <span className="fw-bold">{item?.dead_linde ?? "نامشخص"}</span>
                    </div>
                    <div className="mt-3">
                      <p className="fs-6 text-justifyed">
                        {item?.description ?? "نامشخص"}
                      </p>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                      <Link
                        to={"/edit-task"}
                        className="btn btn-blue text-white fs-6 rounded-3 mx-3"
                      >
                        ویرایش
                      </Link>
                      <button
                        className="btn btn-red text-white fs-6 rounded-3"
                        type="submit"
                        onClick={() => deleteTask(item?.id)}
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
