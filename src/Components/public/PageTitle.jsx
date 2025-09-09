import {useNavigate} from "react-router-dom";

export default function PageTitle({title}){
    const navigate = useNavigate();

    return(
        <div className="d-flex justify-content-between mb-4">
            <span className="fs-5 fw-bold">{title}</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
                role="button"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}>
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 7.5H14.5a.5.5 0 0 1 .5.5z" />
            </svg>
        </div>
    )
}