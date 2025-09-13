import { Container, Image } from "react-bootstrap";
import {Link, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {apiGet} from "../../services/AxiosClient.jsx";
import AttendanceStatus from "../../Components/public/AttendanceStatus.jsx";

export default function EmployeeAttendanceStatus() {
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
                <Image src={"/img/Success.png"} className={"mx-auto d-flex"} />
                <AttendanceStatus status={status} userClock={userClock}/>
        </Container>
    );
}