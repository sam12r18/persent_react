import { Container } from "react-bootstrap";
import {useEffect, useState} from "react";
import "leaflet/dist/leaflet.css";
import { Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import PageTitle from "../../Components/public/PageTitle.jsx";
import {apiGet, apiPost} from "../../services/AxiosClient.jsx";

export default function History() {
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [isFocused3, setIsFocused3] = useState(false);

    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            startDate: null,
            endDate: null,
            FullName: "",
        },
    });
    const cards = [
        {
            id:1,
            name:"سروش اربابی",
            enter_time:"10:29:30",
            exit_time:"10:29:30",
            date:"1404/06/14",
        },
        {
            id:1,
            name:"سروش اربابی",
            enter_time:"10:29:30",
            exit_time:"10:29:30",
        },
        {
            id:1,
            name:"سروش اربابی",
            enter_time:"10:29:30",
            exit_time:"10:29:30",
            date: "1404/06/14",
        }
    ]
    const startDate = watch("startDate");
    const endDate = watch("endDate");

    const onSubmit = async (data) => {
        try {
            const response = await apiPost(``, data);

        } catch (error) {
            console.log(error)
        }
    };
    const fetchData = async () => {
        try {
            const response = await apiGet(``);

        } catch (error) {
            console.log(error)
        }
    };
    // useEffect(() => {
    //     fetchData();
    // }, []);
    const [active , setActive] = useState('all')

    return (
        <Container className="container-sm mt-3" style={{ direction: "rtl" }}>
            <PageTitle title={"ورود و خروج ها"}/>
            <div className={"d-flex flex-column"}>
                <div className="d-flex btn-green justify-content-center rounded-4 p-3 my-3">
                    <span className={"fs-5 fw-bold"}>10:29:30 1403/01/08</span>
                </div>
                <div className={"mb-4"}>
                    <div className="btn-group w-100" role="group" aria-label="Basic outlined">
                        <button type="button" className={`btn ${active === "all" ? "bg-orange" : "bg-gray"} w-100 py-3 rounded-start-4`}onClick={()=>setActive("all")}>همه</button>
                        <button type="button" className={`btn ${active === "enter" ? "bg-orange" : "bg-gray"} w-100 py-3`} onClick={()=>setActive("enter")}>ورود</button>
                        <button type="button" className={`btn  ${active === "exit" ? "bg-orange" : "bg-gray"} w-100 py-3 rounded-end-4`} onClick={()=>setActive("exit")}>خارج</button>
                    </div>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className={"d-flex gap-2 mb-4"}>
                        <div className={"col-6"}>
                            <Form.Group className="position-relative" controlId="startDate">
                                <Form.Label column="sm" className={`rounded-4 fs-6 py-2 px-2 ${isFocused2 ? "text-orange" : "text-color"}`}>
                                    از تاریخ
                                </Form.Label>
                                <DatePicker
                                    inputClass="form-control rounded-5 py-3 text-end"
                                    calendar={persian}
                                    locale={persian_fa}
                                    value={startDate}
                                    onChange={(date) => setValue("startDate", date?.toDate?.() || null)}
                                    onFocus={() => setIsFocused2(true)}
                                    onBlur={() => setIsFocused2(false)}
                                />
                            </Form.Group>
                        </div>
                        <div className={"col-6"}>
                            <Form.Group className="position-relative" controlId="endDate">
                                <Form.Label column="sm" className={`rounded-4 fs-6 py-2 px-2 ${isFocused3 ? "text-orange" : "text-color"}`}>
                                    تا تاریخ
                                </Form.Label>
                                <DatePicker
                                    inputClass="form-control rounded-5 py-3 text-end"
                                    calendar={persian}
                                    locale={persian_fa}
                                    value={endDate}
                                    onChange={(date) => setValue("endDate", date?.toDate?.() || null)}
                                    onFocus={() => setIsFocused3(true)}
                                    onBlur={() => setIsFocused3(false)}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <Form.Group className="position-relative" controlId="FullName">
                        <Form.Label column="sm" className={`rounded-4 fs-6 py-2 px-2 ${isFocused ? "text-orange" : "text-color"}`}>
                            جست و جو نام یا کد ملی
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="rounded-5 py-3 text-end"
                            {...register("user")}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </Form.Group>
                </Form>
                {cards?.length > 0 && cards?.map((card,index)=>{
                    return(
                        <div key={index} className={"d-flex flex-column"}>
                            {card?.date ? (
                                <span className={"d-block mt-3"}>تاریخ: {card?.date}</span>
                            ) : ""}
                            <div className="d-flex bg-orange justify-content-between rounded-4 p-2 mt-2">
                                <div className={"d-flex flex-column"}>
                                    <span className="text-white fs-5">
                                        {card?.name}
                                    </span>
                                    <div className={"d-flex align-items-center gap-2"}>
                                        <span className={"text-color-smooth"}>ورود:</span>
                                        <span className={"mt-2 text-color-smooth"}> {card?.enter_time}</span>
                                    </div>
                                </div>
                                <div className="d-flex flex-column align-items-end">
                                    <Link to={"#"} className="btn btn-blue text-nowrap rounded-4 text-white fs-7 px-4">نقشه</Link>
                                    <div className={"d-flex align-items-center gap-2"}>
                                        <span className={"text-color-smooth"}>خروج:</span>
                                        <span className={"mt-2 text-color-smooth"}> {card?.exit_time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Container>
    );
}