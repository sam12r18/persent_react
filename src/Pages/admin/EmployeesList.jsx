import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import "leaflet/dist/leaflet.css";
import {Link} from "react-router-dom";
import "react-multi-date-picker/styles/layouts/mobile.css";
import PageTitle from "../../Components/public/PageTitle.jsx";
import {apiPost, apiGet} from "../../services/AxiosClient.jsx";
import {useAuth} from "../../Context/AuthContext.jsx";
import Undefined from "../../Components/public/Undefined.jsx";

export default function EmployeesList() {
    const [employeesData, setEmployeesData] = useState([]);
    const [loading, setLoading] = useState(false); // 🔥 درست شد
    const {company} = useAuth();

    console.log("this is company data", company);

    const onSubmit = async (data) => {
        try {
            const response = await apiPost(``, data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            let finalCompany = company;
            if (!finalCompany || Object.keys(finalCompany).length === 0) {
                const stored = localStorage.getItem("companyData");
                if (stored) {
                    finalCompany = JSON.parse(stored);
                }
            }

            if (!finalCompany?.id) {
                console.warn("هیچ company_id موجود نیست ");
                return;
            }
            const response = await apiGet(`/employees?company_id=${finalCompany.id}`);
            console.log("this is response for employees ", response);
            setEmployeesData(response?.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container className="container-sm mt-3" style={{direction: "rtl"}}>
            <PageTitle title={"لیست کارمندان"} />
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
            { loading ?  (
                <div className={"d-flex justify-content-center align-items-center"} style={{height:'100vh'}}>
                    <span>درحال بارگذاری..</span>
                </div>
            ) : employeesData?.length > 0 ? (
                employeesData?.map((employee, index)=>(
                    <div key={index} className="d-flex bg-secondary justify-content-between rounded-4 p-2 my-3">
                        <div className={"d-flex flex-column gap-2"}>
                            <span className="text-white fs-5">{employee?.name}</span>
                            <span className={"text-color-smooth"}>{employee?.mobile}</span>
                        </div>
                        <div className="d-flex flex-column align-items-end justify-content-center gap-2">
                            <Link to={`/profile?id=${employee?.id}`}
                                  className="btn btn-blue text-nowrap rounded-4 text-white fs-7 px-4">
                                پروفایل
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <Undefined title={"کاربری برای شرکت شما وجود ندارد"} />
            )}
        </Container>
    );
}
