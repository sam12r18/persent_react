import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../services/AxiosClient.jsx";
import useAlert from "../hook/Alert.jsx";
import { useAuth } from "../Context/AuthContext.jsx";
import MinBtn from "../Components/public/MinBtn.jsx";

export default function InviteBox() {
    const [invites, setInvites] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const alert = useAlert();
    const { setCompanyData } = useAuth();

    // Fetch invites and companies
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [suggestRes, companiesRes] = await Promise.all([
                    apiGet("suggest"),
                    apiGet("company")
                ]);

                const inviteData = suggestRes?.data || [];
                const companyData = companiesRes?.data || [];

                setInvites(inviteData);
                setCompanies(companyData);

                // Set first company as default
                if (companyData.length > 0) {
                    setCompanyData(companyData[0]);
                }

                // Auto navigate if only one company and no invites
                if (inviteData.length === 0 && companyData.length === 1) {
                    const company = companyData[0];
                    navigate(company.role === "owner" ? "/admin" : "/employee");
                }
            } catch (err) {
                console.error("API error: ", err);
                alert({
                    title: "خطا",
                    text: "بارگذاری اطلاعات با مشکل مواجه شد",
                    icon: "error"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle accepting/rejecting suggested company
    const handleSuggested = async (id, status, name) => {
        const confirmResult = await alert({
            title: "هشدار",
            text: `آیا مطمئن هستید میخواهید درخواست عضویت خود در شرکت ${name} را ${status === "accept" ? "تایید" : "رد"} کنید؟`,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "بله، تأیید می‌کنم",
            cancelButtonText: "خیر، لغو کن",
        });

        if (confirmResult.isConfirmed) {
            try {
                await apiPost("suggest/action", { suggest_id: id, action: status });
                alert({
                    title: "موفقیت",
                    text: `درخواست با ${status === "accept" ? "تایید" : "رد"} موفقیت شد`,
                    icon: "success",
                });
                // Refresh data
                const suggestRes = await apiGet("suggest");
                setInvites(suggestRes?.data || []);
            } catch (err) {
                alert({
                    icon: "error",
                    title: "خطا",
                    text: err?.response?.data?.message || "خطای ناشناخته‌ای رخ داد",
                });
            }
        }
    };

    if (loading) {
        return (
            <Container className="container-sm d-flex justify-content-center align-items-center mt-5">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    return (
        <Container className="container-sm align-items-center justify-content-center mt-3">
            <div className="d-flex mb-4 mt-2">
                <span className="fs-5">کاربر میهمان</span>
            </div>

            <div>
                <span className="fs-4 fw-bold ms-3">دعوت شده اید به عنوان</span>
                {invites.length > 0 ? (
                    invites.map((invite) => (
                        <div key={invite.id} className="d-flex bg-orange justify-content-between rounded-4 p-3 mt-3">
                            <span className="text-white fs-5 fw-bold">{invite.name}</span>
                            <div className="d-flex gap-3">
                                <MinBtn className={"btn-green"}
                                    onClick={() => handleSuggested(invite.id, "accept", invite.name)} text={"تایید"}
                                />
                                <MinBtn className={"btn-red"}
                                    onClick={() => handleSuggested(invite.id, "reject", invite.name)} text={"لغو"}
                                />

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="d-flex bg-gray justify-content-between rounded-4 p-3 mt-3 mb-3">
                        <span className="text-gray fs-5 fw-bold">هیچ دعوتی برای شما ثبت نشده است</span>
                    </div>
                )}

                <span className="fs-4 fw-bold d-block mt-3">شرکت های شما</span>
                {companies.length > 0 ? (
                    companies.map((company, index) => (
                        <div key={index} className="d-flex bg-orange justify-content-between rounded-4 p-3 mt-3">
                            <div className="d-flex align-items-center gap-2">
                                <span className="text-white fs-5 fw-bold">
                                    {company.role === "owner" ? "مدیر:" : "کارمند:"}
                                </span>
                                <span className="text-white fs-5 fw-bold">{company.name}</span>
                            </div>
                            <Link
                                to={company.role === "owner" ? "/admin" : "/employee"}
                                className="btn px-3 text-decoration-none text-white btn-green rounded-3"
                            >
                                ورود
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="d-flex bg-gray justify-content-between rounded-4 p-3 mt-3 mb-3">
                        <span className="text-gray fs-5 fw-bold">هیچ شرکتی برای شما ثبت نشده</span>
                    </div>
                )}

                <div className="my-4 d-flex gap-4 flex-column">
                    <span className="fs-4 fw-bold">کسب و کار خود را ایجاد کنید</span>
                    <Link
                        to="/create-company"
                        className="btn fs-5 text-decoration-none text-white bg-orange rounded-4 p-3 fw-bold"
                    >
                        جهت ایجاد کسب و کار کلیک کنید
                    </Link>
                </div>

                <div className="d-flex flex-column gap-4">
                    <span className="fs-4 fw-bold">درباره برنامه حضور و غیاب رایاسان</span>
                    <p className="fs-5 text-justify">
                        این برنامه به شما کمک می‌کند تا ورود و خروج کارمندان خود را در
                        شرکت، کارگاه یا کارخانه مدیریت نمایید. با استفاده از این برنامه
                        دیگر نیازی به سیستم‌های حضور غیاب فیزیکی ندارید و به صورت آنلاین و
                        بسیار دقیق‌تر می‌توانید ورود و خروج افراد را مدیریت کنید.
                    </p>

                    <span className="fs-4 fw-bold">حضور و غیاب رایاسان چیست؟</span>
                    <p className="fs-5 text-justify">
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
