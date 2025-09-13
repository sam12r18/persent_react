import {Link} from "react-router-dom";
import ModalRequestTime from "./ModalRequestTime.jsx";

export default function TasksCard({data , endTask , updatePage , isAdmin=false}){
    return (
        <>
            {data.map((item, index) => (
                <div key={index} className="d-flex flex-column p-3 gap-3 my-4 border-color rounded-4 bg-orange text-white">
                    <div className="justify-content-between d-flex">
                        <span className="fw-bold">نام پروژه</span>
                        <span className="fw-bold">{item?.project_name}</span>
                    </div>

                    <div className="justify-content-between d-flex">
                        <span className="fw-bold">نام وظیفه</span>
                        <span className="fw-bold">{item?.name}</span>
                    </div>

                    <div className="justify-content-between d-flex">
                        <span className="fw-bold">مهلت انجام تا تاریخ</span>
                        <span className="fw-bold">{item?.deadline}</span>
                    </div>

                    <p className="fs-6 text-justifyed">{item?.description}</p>
                    <div className="d-flex gap-2 justify-content-end">
                        <button className="btn btn-green px-3 py-2 text-white fs-6 rounded-4" type="button" onClick={() => endTask(item?.id)}>
                            اتمام
                        </button>
                        <ModalRequestTime updatePage={updatePage} id={item?.id} />
                        {isAdmin && (
                            <Link to={`/admin/edit-task?id=${item?.id}`} className="btn btn-red px-3 py-2 text-white fs-6 rounded-4 ms-2" type="button">
                                ویرایش
                            </Link>
                        )}
                    </div>
                </div>
            ))}
        </>
    )
}