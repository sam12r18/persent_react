import { Container, Image } from "react-bootstrap";
import {Link, useSearchParams} from "react-router-dom";
import {apiGet} from "../../services/AxiosClient.jsx";
import {useEffect, useState} from "react";
import AttendanceStatus from "../../Components/public/AttendanceStatus.jsx";

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
            <Image src={"/img/Success.png"} className={"mx-auto d-block"} />
           <AttendanceStatus status={status} userClock={userClock}/>
            <Link to={"/admin"} className={"btn bg-orange rounded-5 text-white fs-5 w-100  p-3"}>خانه</Link>
        </Container>
    );
}