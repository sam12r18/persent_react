import { Container, Image } from "react-bootstrap";
import {Link} from "react-router-dom";

export default function SuccesEntery() {
    return (

        <Container className={"container-sm align-items-center justify-content-center mt-3"}>
            <div className={"row text-center"}>
                <div className={" justify-content-end m-n" }>
                    <Image src={"/img/Succes.png"} className={"mx-auto d-flex"} />
                </div>
                <div className={"mt-5 d-flex flex-column"}>
                    <span className={"fs-4 fw-bold mb-3"}>ورود شما با موفقیت ثبت شد</span>
                    <span className={"text-color mb-3 fs-7 "}>
                        شما ورود خود را در ساعت 8:30روز دوشنبه 5مرداد ثبت کردید
                    </span>
                </div>
                <div className={"mt-5 mb-5"}>
                        <Link to={"#"} className={"btn bg-orange rounded-5 text-white fs-5 w-100  p-3"}>خانه</Link>
                </div>
            </div>
        </Container>
    );
}
