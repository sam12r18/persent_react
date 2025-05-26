import { Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Terms() {
    const navigate = useNavigate();

    return (
        <Container className={"container-sm align-items-center justify-content-center mt-3"}>
            <div className={"row"}>
                <div className={"d-flex justify-content-between"}>
                    <span className={"fs-4 fw-bold"}>قوانین و مقررات</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-arrow-left"
                        viewBox="0 0 16 16"
                        role="button"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(-1)}
                    >
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 7.5H14.5a.5.5 0 0 1 .5.5z" />
                    </svg>

                </div>
                <div className={"mt-5 mb-5"}>
                    <span className={"fs-4 fw-bold"}>
                        قوانین و مقررات استفاده از برنامه حضور و غیاب رایاسان
                    </span>
                    <p className={"mt-3 text-justifyed"}>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
                        طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
                        که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف
                        بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال
                        و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت
                        بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در
                        زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود
                        در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل
                        حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
                        طراحان گرافیک است...
                    </p>
                </div>
            </div>
        </Container>
    );
}
