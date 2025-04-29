import axios from "axios";
import { useEffect, useState } from "react";
import {Container, Image} from "react-bootstrap";
import {Link, useParams } from "react-router-dom";






export default function  InviteBox(){
    // useEffect(()=>{
    //    const fetchData = async()=>{
    //         try{
    //             const response = await axios.get('');

    //         }
    //         catch(error){

    //         }

        

    // })
    
    const {data }=useParams();
    console.log(data,"its data");
    const [acceptRequest , setAcceptRequest] = useState();
    const [rejectRequest , setRejectRequest] = useState();
    return(


        <Container className={"container-sm align-items-center justify-content-center mt-3 "}>
            <div className={"row" }>
                <div className={"d-flex mb-4 mt-2 "}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                         className="bi bi-emoji-smile-upside-down-fill me-3" viewBox="0 0 16 16">
                        <path
                            d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M7 9.5C7 8.672 6.552 8 6 8s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5M4.285 6.433a.5.5 0 0 0 .683-.183A3.5 3.5 0 0 1 8 4.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.5 4.5 0 0 0 8 3.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683M10 8c-.552 0-1 .672-1 1.5s.448 1.5 1 1.5 1-.672 1-1.5S10.552 8 10 8"/>
                    </svg>
                    <span className={"fs-5"}>کاربر میهمان</span>
                </div>
                <div className={""}>
                    <span className={"fs-4 fw-bold ms-3"}>
                        دعوت شده اید به عنوان
                    </span>
                    <div className={"d-flex bg-orange justify-content-between rounded-4 p-3 mt-3"}>
                        <span className={"text-white fs-5 fw-bold"}>
                            کارمند مایکروسافت
                        </span>
                        <div className={"gap-3 d-flex"}>
                            <button type="submit" onSubmit={acceptRequest()} className="btn rounded-5 text-white btn-green">تایید</button>
                            <button type="submit" onSubmit={rejectRequest()} className="btn rounded-5 text-white btn-red">لغو</button>
                        </div>
                    </div>
                    <div className={"d-flex bg-gray justify-content-between rounded-4 p-3 mt-3"}>
                        <span className={"text-gray fs-5 fw-bold"}>
                            هیچ دعوتی برای شما ثبت نشده است
                        </span>
                    </div>
                    <div className={"my-4 d-flex flex-column"}>
                        <span className={"fs-4 fw-bold mt-3 "}>
                            کسب و کار خود را ایجاد کنید
                        </span>
                        <div className={"d-flex bg-orange  rounded-4 p-3 mt-3"}>
                            <Link to={"/create-company"} className={"btn fs-5 text-decoration-none  text-white"}> جهت ایجاد کسب و کار کلیک کنید</Link>
                        </div>
                    </div>
                    <div className={"d-flex flex-column"}>
                        <span className={"fs-4 fw-bold my-3"}>
                            درباره برنامه حضور و غیاب رایاسان
                        </span>
                        <p className={"fs-5 text-justifyed"}>
                            این برنامه به شما کمک میکند تا ورود و خروج کارمندان خود را در شرکت، کارگاه یا کارخانه مدیریت نمایید.
                            با استفاده از این برنامه دیگر نیازی به سیستم های حضور غیاب فیزیکی ندارید و به صورت آنلاین و بسیار دقیقتر میتوانید ورود و خروج افراد را مدیریت کنید.
                        </p>
                        <span className={"fs-4 fw-bold my-3"}>
                            حضور و غیاب رایاسان چیست؟
                        </span>
                        <p className={"fs-5 text-justifyed"}>
                            این برنامه به شما کمک میکند تا ورود و خروج کارمندان خود را در شرکت، کارگاه یا کارخانه مدیریت نمایید.
                            با استفاده از این برنامه دیگر نیازی به سیستم های حضور غیاب فیزیکی ندارید و به صورت آنلاین و بسیار دقیقتر میتوانید ورود و خروج افراد را مدیریت کنید.
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    )
}