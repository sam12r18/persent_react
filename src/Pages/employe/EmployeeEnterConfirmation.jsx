import { Container } from "react-bootstrap";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { Link, useNavigate, } from "react-router-dom";
import PageTitle from "../../Components/public/PageTitle.jsx";
import MapComponent from "../../Components/MapComponent.jsx";
import {apiPost} from "../../services/AxiosClient.jsx";
import useAlert from "../../hook/Alert.jsx";
import PersentMap from "../../Components/public/PersentMap.jsx";

export default function EmployeeEnterConfirmation() {
    const navigate = useNavigate();
    const [loading , setLoading] = useState(false);
    const alert =useAlert();

    const  handleConfirmEntry = async (data) => {
            setLoading(true);
            try {
                const response = await apiPost(``, data);
                console.log("this is response", response);
                alert({
                    title: "موفق",
                    text:"خوش آمدید",
                    icon: "success",
                });
                setTimeout(()=>{
                    navigate('/employee')
                },500)
            }catch (error) {
                alert({
                    title: "نا موفق",
                    text:"در ثبت خروج مشکل پیش آمده است",
                    icon: "error",
                });
                console.log(error)
            }finally {
                setLoading(false);
            }
    };


    return (
        <Container className="container-sm mt-3">
               <PageTitle title={"تایید ورود به شرکت"}/>
                <PersentMap/>
                <div className={"p-2"}>
                        <span className={"fs-5 fw-bold text-justify d-block mb-3"}>
                            شما درحال تایید ورود به شرکت در ساعت 08:30 روز دوشنبه 5 مرداد 1402 می‌باشید
                        </span>
                    <span className={"fs-5 text-color"}>
                            درصورت درست بودن محل و زمان دکمه تایید را بزنید
                        </span>
                    <span className={`btn bg-orange w-100 text-white fs-5 rounded-5 my-3 p-3`} onClick={handleConfirmEntry}>
                            {loading ? "درحال ثبت" : "تایید و ثبت ورود"}
                        </span>
                </div>
                <Link to={"/employee-dashboard"} className={"btn bg-smooth-gray w-100 text-white fs-5 rounded-5 my-2 p-3"}>
                    بازگشت
                </Link>
        </Container>
    );
}
