export default function AttendanceStatus({status , userClock}){
    return(
        <div className={"my-5 d-flex flex-column align-items-center gap-2"}>
            <span className={"fs-4 fw-bold"}>{status === "enter" ? "ورود" : "خروج"} شما با موفقیت ثبت شد</span>
            <span className={"text-color fs-7 "}>
                شما {status === "enter" ? "ورود" : "خروج"} خود را در{userClock} ثبت کردید
            </span>
        </div>
    )
}