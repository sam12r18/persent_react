import React, {  useState} from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import useAlert from "../../hook/Alert.jsx";
import {apiPost} from "../../services/AxiosClient.jsx";
import CustomInputs from "./Inputs/CustomInputs.jsx";
import CustomBtn from "./CustomBtn.jsx";


export default function ModalRequestTime({ updatePage , id }) {
  const [show, setShow] = useState(false);
  const alert = useAlert();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const handleClose = () => {
    setShow(false);

  }
  const handleShow = () => {
    setShow(true);
    reset();
  };
  const onSubmit = async (data) => {
      data.task_id = id
    try {
      const response = await apiPost(``, data);
      console.log(" عملیات موفقیت آمیز بود:", response);
      alert({
        icon: "success",
        title: "موفقیت",
        text: "درخواست زمان با موفقیت ارسال شد",
      });
      updatePage("success");
      handleClose();
      reset();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <button type="button"  onClick={handleShow} className="btn btn-primary px-3 py-2 text-white fs-6 rounded-4">
          نیازمند زمان
      </button>

      <Modal show={show} onHide={handleClose} size="lg" centered className="modal-add-ticket">
        <Modal.Header className=" w-100">
          <Modal.Title className=" fanoos">
            <span className="ms-3">درخواست زمان</span>
          </Modal.Title>
          <button type="button" className="btn " onClick={handleClose} style={{position: "absolute", top: "1rem", left: "1rem", background: "transparent", border: "none", padding: 0, cursor: "pointer",}}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path
                d="M21.5 16.5L14 24M14 24L21.5 31.5M14 24H34M46.5 24C46.5 36.4265 36.4265 46.5 24 46.5C11.5736 46.5 1.5 36.4265 1.5 24C1.5 11.5736 11.5736 1.5 24 1.5C36.4265 1.5 46.5 11.5736 46.5 24Z"
                stroke="#2A5EBE"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"/>
            </svg>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="container position-relative">
            <form className={"pb-4"} onSubmit={handleSubmit(onSubmit)}>
                <CustomInputs type={"number"} placeHolder={"اینجا بنویسید"} label={"زمان مد نظر (روز)"} post={"time"} register={register} errors={errors}/>
                <CustomBtn text={"ثبت"} loadingText={"درحال ثبت .."} />
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

