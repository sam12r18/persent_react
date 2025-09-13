import {Container} from "react-bootstrap";
import {Link, useNavigate,} from "react-router-dom";
import Button from "react-bootstrap/Button";
import PageTitle from "../../Components/public/PageTitle.jsx";
import MapComponent from "../../Components/MapComponent.jsx";
import useAlert from "../../hook/Alert.jsx";
import {apiGet, apiPost} from "../../services/AxiosClient.jsx";
import {useEffect, useState} from "react";
import PersentMap from "../../Components/public/PersentMap.jsx";
import {useAuth} from "../../Context/AuthContext.jsx";

export default function EmployeeExitConfirmation() {
    const navigate = useNavigate();
    const [loading , setLoading] = useState(false);
    const [userClock,setUserClock] = useState('')
    const alert =useAlert();
    const { sendLocation ,company} = useAuth();
    console.log(company)
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
    const  handleExitConfirmation = async () => {
        setLoading(true);
        let finalCompany = company;
        if (!finalCompany || Object.keys(finalCompany).length === 0) {
            const stored = localStorage.getItem("companyData");
            if (stored) {
                finalCompany = JSON.parse(stored);
            }
        }
        let finalLocation = sendLocation;
        if (!finalLocation || Object.keys(finalLocation).length === 0) {
            const stored_location = localStorage.getItem("location");
            if (stored_location) {
                finalLocation = JSON.parse(stored_location);
            }
        }
        try {
            const response = await apiPost(`attendance_check`,{company_id:finalCompany.id , lat:finalLocation.lat , lng:finalLocation.lng ,check:"check_in",device_id:'' , with_schedule:false} );
            console.log("this is response", response);
            setTimeout(()=>{
                navigate('/employee/attendance-status?status=exit')
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
            <PageTitle title={"تایید خروج"}/>
            <PersentMap/>
           <div className={"p-2"}>
                <span className={"fs-5 fw-bold text-justify d-block mb-3"}>
                    شما درحال تایید خروج از شرکت در ساعت 08:30 روز دوشنبه 5 مرداد 1402 میباشیید
                </span>
               <span className={"fs-5 text-color"}>
                    درصورت درست بودن محل و زمان دکمه تایید را بزنید
                </span>
           </div>
            <Button className={"btn bg-orange w-100 text-white fs-5 rounded-5 my-3 p-3"} type={"submit"}
                    onClick={() => handleExitConfirmation()}>
                {loading ? "درحال ثبت .." : "تایید و ثبت خروج"}
            </Button>
            <Link to={"/admin"}
                  className={"btn bg-smooth-gray w-100 text-white fs-5 rounded-5 my-2 p-3"}> بازگشت</Link>
        </Container>
    );
}