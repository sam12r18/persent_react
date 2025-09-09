import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useRef, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {useNavigate } from "react-router-dom";
import PageTitle from "../../Components/public/PageTitle.jsx";
import CustomBtn from "../../Components/public/CustomBtn.jsx";
import {apiPost} from "../../services/AxiosClient.jsx";
import {useAuth} from "../../Context/AuthContext.jsx";
import useAlert from "../../hook/Alert.jsx";
export default function OTP() {
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const {mobile} =useAuth()
    console.log(mobile)
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setLoading(true);

    if (!data.otp1 || !data.otp2 || !data.otp3 || !data.otp4) {
      return;
    }

    const otpCode = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}`;
    try {
      const response = await apiPost(`auth/check-otp/register`, { code: otpCode, mobile: mobile }
      );
      console.log("this is response fo register" , response)
      const token = response?.token;
        console.log(token)
      localStorage.setItem("authToken",token);
        alert({
            icon: "success",
            title: "موفق",
            text: "عملیات موفقیت آمیز بود",
        });
        setTimeout(() => {
            navigate(`/invite-box`);
        }, 500);

    } catch (error) {
        alert({
            icon: "error",
            title: "خطا",
            text: "مشکلی   پیش آمده است",
        });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    const fieldName = `otp${index + 1}`;

    if (/^\d$/.test(value)) {
      setValue(fieldName, value, { shouldValidate: true });
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    } else if (value === "") {
      setValue(fieldName, "", { shouldValidate: true });
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    } else {
      e.target.value = "";
      setValue(fieldName, "", { shouldValidate: true });
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "") {
      if (index > 0) {
        inputRefs[index - 1].current.focus();
        setValue(`otp${index}`, "", { shouldValidate: true });
      }
    }
  };

  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, []);

  return (
    <Container className="container-sm mt-3" dir="rtl">
      <div className="d-flex flex-column">
        <PageTitle title={"کد تایید ورود"}/>
        <div className="mt-5 d-flex flex-column">
          <span className="fs-4 fw-bold mb-3">کد تایید ورود</span>
          <span className="text-color mb-3">
            کد ارسال شده به شماره تلفن {mobile} را در کادر زیر وارد نمایید
          </span>
        </div>
        <div className="mt-5 mb-5">
          <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
            <div className="d-flex align-items-center gap-4 justify-content-center">
              {inputRefs.map((ref, index) => (
                <Form.Group
                  key={3 - index}
                  className="mb-3 position-relative otp-input"
                >
                  <Controller
                    name={`otp${4 - index}`}
                    control={control}
                    rules={{
                      pattern: {
                        value: /^\d$/,
                        message: "فقط باید یک عدد وارد کنید",
                      },
                    }}
                    render={({ field }) => (
                      <Form.Control
                        ref={(el) => {
                          inputRefs[3 - index].current = el;
                          field.ref(el);
                        }}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength="1"
                        className="rounded-4 py-3 no-arrows text-center"
                        value={field.value || ""}
                        onChange={(e) => handleChange(e, 3 - index, field)}
                        onKeyDown={(e) => handleKeyDown(e, 3 - index)}
                      />
                    )}
                  />
                  {errors[`otp${4 - index}`] && (
                    <p className="text-danger mt-2">
                      {errors[`otp${4 - index}`].message}
                    </p>
                  )}
                </Form.Group>
              ))}
            </div>
            <CustomBtn text={"بررسی کد"} loadingText={"درحال بررسی"}/>
          </Form>
        </div>
      </div>
    </Container>
  );
}
