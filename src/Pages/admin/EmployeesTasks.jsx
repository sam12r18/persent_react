import { Container } from "react-bootstrap";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import "react-multi-date-picker/styles/layouts/mobile.css";
import PageTitle from "../../Components/public/PageTitle.jsx";

export default function EmployeesTasks() {
const employees_task = [
    {
        id:1,
        name:"عرفان محسنی"
    },
    {
        id:1,
        name:"عرفان محسنی"
    },
    {
        id:1,
        name:"عرفان محسنی"
    },
    {
        id:1,
        name:"عرفان محسنی"
    }
]

  return (
    <Container className="container-sm mt-3" style={{ direction: "rtl" }}>
        <PageTitle title={"وظیفه های برای کارمندان"}/>
        <div className=" d-flex flex-column ">
            <span className="fs-5 fw-bold d-inline-block border-2 border-secondary border-bottom pe-5 py-3 mb-5">
              لیست کارمندان شرکت
            </span>
            {employees_task?.length > 0 && employees_task?.map((employee , index)=>{
                return(
                    <div key={index} className="d-flex bg-secondary justify-content-between rounded-4 p-2 mt-2 mb-3 py-3">
                        <div className={"d-flex flex-column"}>
                            <span className="text-white fs-5">{employee?.name}</span>
                        </div>
                        <div className="d-flex align-items-end">
                            <Link to={`/admin/add-task?=${employee?.id}`} className="btn btn-green text-nowrap rounded-4 text-white fs-7 me-2 px-2">
                                ایجاد وظیفه
                            </Link>
                            <Link to={`/admin/view-task?=${employee?.id}`} className="btn btn-blue text-nowrap rounded-4 text-white fs-7 px-2">
                                نمایش وظیفه
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    </Container>
  );
}
