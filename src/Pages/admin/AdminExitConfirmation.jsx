import {Container} from "react-bootstrap";
import {Link, useNavigate,} from "react-router-dom";
import Button from "react-bootstrap/Button";
import PageTitle from "../../Components/public/PageTitle.jsx";
import useAlert from "../../hook/Alert.jsx";
import {apiGet, apiPost} from "../../services/AxiosClient.jsx";
import {useEffect, useState} from "react";
import {useAuth} from "../../Context/AuthContext.jsx";
import PresentMap from "../../Components/public/PresentMap.jsx";

export default function AdminExitConfirmation() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const alert = useAlert();
    const { sendLocation ,company} = useAuth();
    const [userClock,setUserClock] = useState('')
    const fetchClock= async ()=>{
        try {
            const response = await apiGet(`datetime` );
            setUserClock(response?.message)
        }catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchClock()
    },[])
    const handleExitConfirmation = async () => {
        setLoading(true);
        try {
            const response = await apiPost(`attendance_check`,{company_id:company.id , lat:sendLocation.lat , lng:sendLocation.lng ,check:"check_out",device_id:'' , with_schedule:false});
            console.log("this is response", response);
            setTimeout(() => {
                navigate('/admin/attendance-status?status=exit')
            }, 500)
        } catch (error) {
            alert({
                title: "نا موفق",
                text: "در ثبت خروج مشکل پیش آمده است",
                icon: "error",
            });
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="container-sm mt-3">
            <PageTitle title={"تایید خروج"}/>
            <PresentMap/>
            <div className={"p-3"}>
               <span className={"fs-5 fw-bold text-justify d-block mb-3"}>
                    شما درحال تایید ورود به شرکت {company?.name} در {userClock} می‌باشید
                </span>
                <span className={"fs-5 text-color"}>
                    درصورت درست بودن محل و زمان دکمه تایید را بزنید
                </span>
            </div>
            <Button className={"btn bg-orange w-100 text-white fs-5 rounded-5 my-2 p-3"} type={"submit"} onClick={() => handleExitConfirmation()}>
                {loading ? "درحال ثبت .." : "تایید و ثبت خروج"}
            </Button>
            <Link to={"/admin"} className={"btn bg-smooth-gray w-100 text-white fs-5 rounded-5 my-2 p-3"}> بازگشت</Link>
        </Container>
    );
}