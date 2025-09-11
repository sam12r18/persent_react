import Form from "react-bootstrap/Form";
import {useState} from "react";

export default function CustomInputs({
                                         type,
                                         placeHolder,
                                         label,
                                         post,
                                         number = false,
                                         register,
                                         errors,
                                         isRequired = false,
                                         watch,
                                         requiredMessage,
                                         as = "",
                                         rows = 4,
                                         ...props
                                     }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Form.Group className="mb-3 position-relative" controlId={`formBasic${post}`}>
            <Form.Label column="sm" className={`rounded-4 fs-6 py-2 px-2 ${isFocused || errors[post] ? "text-orange" : "text-color"}`}>
                {label}
            </Form.Label>

            <Form.Control
                as={as || "input"} // اگر textarea بود، textarea میشه وگرنه input
                {...(as === "textarea" ? { rows } : { type })} // اینجا دیگه تداخل نداری
                placeholder={placeHolder}
                className={`rounded-4 py-3 mt-4 mb-4 ${
                    number ? "text-end" : "text-start"
                }`}
                {...register(`${post}`, {
                    required: isRequired ? requiredMessage : false,
                    ...props,
                })}
                defaultValue={watch ? watch(post) : ""}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}/>
            {errors[post] && (
                <p className="text-danger mt-2">{errors[post].message}</p>
            )}
        </Form.Group>
    );
}
