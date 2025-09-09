import { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import {apiGet, apiPost} from "../services/AxiosClient.jsx";
import useAlert from "../hook/Alert.jsx";
import {useAuth} from "../Context/AuthContext.jsx";
export default function InviteBox() {
  const [invites, setInvites] = useState([]);
  const [companies, setCompanies] = useState([]);
  const alert = useAlert();
    const {setCompanyData} = useAuth()
  const fetchData = async () => {
        try {
            const response = await apiGet(`suggest`, {});
            const companies = await apiGet(`company`, {});
            console.log("Thi is Data suggest:", response);
            console.log("Thi is Data companies:", companies);
            setInvites(response?.data)
            setCompanies(companies?.data)
        } catch (err) {
            console.error("API error: ", err);

        }
  }
  useEffect(() => {
      fetchData();
  }, []);

  const handleSuggested = async (id , status , name) => {
      alert({
          title: "هشدار",
          text: `آیا مطمئن هستید میخواهید درخواست عضویت خود در شرکت ${name} را ${status === "accept" ? "تایید" : "رد"} کنید ؟!`,
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "بله، تأیید می‌کنم",
          cancelButtonText: "خیر، لغو کن",
      }).then((result) => {
          if (result.isConfirmed) {
              try {
                  const response = apiPost("suggest/action", { suggest_id: id , action:status })
                  console.log("this is response" , response)
                  alert({
                      title: "موفقیت",
                      text: `درخواست با ${status === "accept" ? "تایید" : "رد"} موفقیت شد`,
                      icon: "success",
                  });
                  fetchData();
              }catch(err){
                  alert({
                      icon: "error",
                      title: "خطا",
                      text:
                          err?.response?.data?.message ||
                          "خطای ناشناخته‌ای رخ داد",
                  });
              }
          }
      });
  };

  return (
    <Container className="container-sm align-items-center justify-content-center mt-3">
        <div className="d-flex mb-4 mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-emoji-smile-upside-down-fill me-3" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M7 9.5C7 8.672 6.552 8 6 8s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5M4.285 6.433a.5.5 0 0 0 .683-.183A3.5 3.5 0 0 1 8 4.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.5 4.5 0 0 0 8 3.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683M10 8c-.552 0-1 .672-1 1.5s.448 1.5 1 1.5 1-.672 1-1.5S10.552 8 10 8" />
          </svg>
          <span className="fs-5">کاربر میهمان</span>
        </div>
        <div>
          <span className="fs-4 fw-bold ms-3">دعوت شده اید به عنوان</span>
            {invites.length > 0 ? (
                invites.map((invite) => (
                    <div className="d-flex bg-orange justify-content-between rounded-4 p-3 mt-3" key={invite?.id}>
                        <span className="text-white fs-5 fw-bold">{invite?.name}</span>
                        <div className="d-flex gap-3">
                            <button onClick={() => handleSuggested(invite.id, "accept",invite.name)} className="btn rounded-5 text-white btn-green">
                                تایید
                            </button>
                            <button onClick={() => handleSuggested(invite.id, "reject",invite.name)} className="btn rounded-5 text-white btn-red">
                                لغو
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="d-flex bg-gray justify-content-between rounded-4 p-3 mt-3 mb-3">
                    <span className="text-gray fs-5 fw-bold">
                      هیچ دعوتی برای شما ثبت نشده است
                    </span>
                </div>
            )}
            <span className="fs-4 fw-bold d-block mt-3">شرکت های شما</span>
          {companies.length > 0 ? (companies.map((company , index) =>{
              setCompanyData(company)
              return(
                  <div key={index} className="d-flex bg-orange justify-content-between rounded-4 p-3 mt-3">
                      <div className={"d-flex align-items-center gap-2"}>
                      <span className={"text-white fs-5 fw-bold"}>
                          {company.role === "owner" ? "مدیر:" : "کارمند:"}
                      </span>
                          <span className="text-white fs-5 fw-bold">{company?.name}</span>
                      </div>
                      <Link to={`${company.role === "owner" ? "/admin" : "/employee"}`} className="btn px-3 text-decoration-none text-white btn-green rounded-5">
                          ورود
                      </Link>
                  </div>
              )
          })
          ) : (
              <div className="d-flex bg-gray justify-content-between rounded-4 p-3 mt-3 mb-3">
                    <span className="text-gray fs-5 fw-bold">
                      هیچ شرکتی برای شما ثبت نشده
                    </span>
              </div>
          )}
          <div className="my-4 d-flex gap-4 flex-column">
            <span className="fs-4 fw-bold ">
              کسب و کار خود را ایجاد کنید
            </span>
          <Link to="/create-companies" className="btn fs-5 text-decoration-none text-white bg-orange rounded-4 p-3 fw-bold">
            جهت ایجاد کسب و کار کلیک کنید
          </Link>
          </div>
          <div className="d-flex flex-column gap-4">
            <span className="fs-4 fw-bold">
              درباره برنامه حضور و غیاب رایاسان
            </span>
            <p className="fs-5 text-justifyed">
              این برنامه به شما کمک می‌کند تا ورود و خروج کارمندان خود را در
              شرکت، کارگاه یا کارخانه مدیریت نمایید. با استفاده از این برنامه
              دیگر نیازی به سیستم‌های حضور غیاب فیزیکی ندارید و به صورت آنلاین و
              بسیار دقیق‌تر می‌توانید ورود و خروج افراد را مدیریت کنید.
            </p>
            <span className="fs-4 fw-bold ">حضور و غیاب رایاسان چیست؟</span>
            <p className="fs-5 text-justifyed">
              این برنامه به شما کمک می‌کند تا ورود و خروج کارمندان خود را در
              شرکت، کارگاه یا کارخانه مدیریت نمایید. با استفاده از این برنامه
              دیگر نیازی به سیستم‌های حضور غیاب فیزیکی ندارید و به صورت آنلاین و
              بسیار دقیق‌تر می‌توانید ورود و خروج افراد را مدیریت کنید.
            </p>
          </div>
        </div>
    </Container>
  );
}
