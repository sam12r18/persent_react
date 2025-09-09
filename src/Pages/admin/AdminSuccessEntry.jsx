import { Container, Image } from "react-bootstrap";
import {Link} from "react-router-dom";

export default function AdminSuccessEntry() {
    return (
        <Container className={"container-sm mt-3"}>
            <Image src={"/img/Success.png"} className={"mx-auto d-flex"} />
            <div className={"mt-5 gap-2 d-flex align-items-center flex-column"}>
                <span className={"fs-4 fw-bold"}>ورود شما با موفقیت ثبت شد</span>
                <span className={"text-color fs-7 "}>
                        شما ورود خود را در ساعت 8:30روز دوشنبه 5مرداد ثبت کردید
                    </span>
            </div>
            <div className={"my-5"}>
                <Link to={"/admin"} className={"btn bg-orange rounded-5 text-white fs-5 w-100  p-3"}>خانه</Link>
            </div>
        </Container>
    );
}