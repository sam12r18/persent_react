import { Container, Image } from "react-bootstrap";
import {Link, useSearchParams} from "react-router-dom";
import {apiGet} from "../../services/AxiosClient.jsx";
import {useEffect, useState} from "react";

export default function AdminAttendanceStatus() {
    const [userClock,setUserClock] = useState('')
    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");
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
    return (
        <Container className={"container-sm mt-3"}>
            <Image src={"/img/Success.png"} className={"mx-auto"} />
            <div className={"my-5 d-flex flex-column align-items-center gap-2"}>
                <span className={"fs-4 fw-bold"}>{status === "enter" ? "ورود" : "خروج"} شما با موفقیت ثبت شد</span>
                <span className={"text-color fs-7 "}>
                    شما {status === "enter" ? "ورود" : "خروج"} خود را در{userClock} ثبت کردید
                </span>
            </div>
            <Link to={"/admin"} className={"btn bg-orange rounded-5 text-white fs-5 w-100  p-3"}>خانه</Link>
        </Container>
    );
}