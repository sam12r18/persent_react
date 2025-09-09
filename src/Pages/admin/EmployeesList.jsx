import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import "leaflet/dist/leaflet.css";
import {Link,} from "react-router-dom";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import "react-multi-date-picker/styles/layouts/mobile.css";
import PageTitle from "../../Components/public/PageTitle.jsx";
import CustomInputs from "../../Components/public/Inputs/CustomInputs.jsx";
import {apiPost, apiGet} from "../../services/AxiosClient.jsx";
import {useAuth} from "../../Context/AuthContext.jsx";

export default function EmployeesList() {
    const [employeesData, setEmployeesData] = useState([])
    const {register, errors, handleSubmit} = useForm({
        defaultValues: {
            startDate: null,
            endDate: null,
            FullName: "",
        },
    });
    const employees = [
        {
            id: 1,
            name: "سروش اربابی",
            current_month_persent_hour: 140,
            current_month_persent_days: 20,
            last_month_persent_hour: 110,
            last_month_persent_days: 12,
        },
        {
            id: 2,
            name: "عرفان محسنی",
            current_month_persent_hour: 140,
            current_month_persent_days: 20,
            last_month_persent_hour: 110,
            last_month_persent_days: 12,
        }
    ]
    const {company} = useAuth()
    // console.log("this is company data", company)
    const onSubmit = async (data) => {
        try {
            const response = await apiPost(``, data);
        } catch (error) {
            console.log(error)
        }
    };
    const fetchData = async () => {
        try {
            const response = await apiGet(`/employees?company_id=${company.id}`)
            console.log("this is response for employees ", response)
            setEmployeesData(response?.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container className="container-sm mt-3" style={{direction: "rtl"}}>
            <PageTitle title={"لیست کارمندان"}/>
            <div>
                <div className="row justify-content-around my-3 gap-2">
                    <div className="col-5 bg-orange rounded-4 p-3">
              <span className="text-white mb-3 fs-4 fw-bold d-block">
                تاریخچه
              </span>
                        <div className="justify-content-end d-flex">
                            <Link to={"/admin/history"} className="btn btn-blue text-nowrap rounded-4 text-white fs-7">
                                ورود و خروج
                            </Link>
                        </div>
                    </div>
                    <div className="col-5 bg-orange rounded-4 p-3">
                        <span className="text-white fs-4 fw-bold d-block mb-3">جدید</span>
                        <div className="justify-content-end d-flex">
                            <Link to={"/admin/new-employees"}
                                  className={"btn btn-blue text-nowrap rounded-4 text-white fs-7"}>
                                افزودن کارمند
                            </Link>
                        </div>
                    </div>
                    <div className="col-5 bg-orange rounded-4 p-3 my-4">
                        <span className="text-white fs-5 fw-bold d-block mb-3">
                            وظیفه کارمندان
                        </span>
                        <div className="justify-content-end d-flex">
                            <Link to={"/admin/employees-tasks"} className={"btn btn-blue px-3 py-2 text-nowrap rounded-4 text-white fs-7"}>
                                مشاهده
                            </Link>
                        </div>
                    </div>
                    <div className="col-5 bg-orange rounded-4 p-3 my-4">
              <span className="text-white fs-6 fw-bold d-block mb-3">
                وظیفه هایه اتمام یافته
              </span>
                        <div className="justify-content-end d-flex">
                            <Link to={"/ended-tasks"}
                                  className={"btn btn-blue px-3 py-2 text-nowrap rounded-4 text-white fs-7"}>
                                مشاهده
                            </Link>
                        </div>
                    </div>
                </div>
                <Form className={"my-4"} onSubmit={handleSubmit(onSubmit)}>
                    {/*<CustomInputs type={"number"} placeHolder={"اینجا بنویسید"} post={""} label={"کد ملی"}  register={register} errors={errors}   minLength={{value: 10, message: "کد ملی باید 10 رقم باشه",}} maxLength={{value: 10, message: "کد ملی باید 10 رقم باشه",}}/>*/}
                </Form>
                {employees?.length > 0 && employees?.map((employee, index) => {
                    return (
                        <div key={index} className="d-flex bg-secondary justify-content-between rounded-4 p-2 my-3">
                            <div className={"d-flex flex-column gap-2"}>
                                <span className="text-white fs-5">{employee?.name}</span>
                                <span className={"text-color-smooth"}>
                                ساعت حضور ماه جاری: {employee?.current_month_persent_hour}
                              </span>
                                <span className={"text-color-smooth"}>
                                روز حضور ماه جاری: {employee?.current_month_persent_days}
                              </span>
                            </div>
                            <div className="d-flex flex-column align-items-end gap-2">
                                <Link to={`/profile?id=${employee?.id}`}
                                      className="btn btn-blue text-nowrap rounded-4 text-white fs-7 px-4">
                                    پروفایل
                                </Link>
                                <span className={"text-color-smooth"}>
                                    ساعت حضور ماه قبل: {employee?.last_month_persent_hour}
                                </span>
                                <span className={"text-color-smooth"}>
                                    روز حضور ماه قبل: {employee?.last_month_persent_days}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Container>
    );
}
