import React, { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export default function SelectInput({
                                        label,
                                        post, // کلید فیلد در react-hook-form
                                        register,
                                        errors,
                                        is_required = false,
                                        message = "این فیلد الزامی است",
                                        custom_class = "",
                                        serverOptions = [], // گزینه‌هایی که ممکنه از سرور بیاد
                                        fallbackOptions = [], // گزینه‌های پیش‌فرض در صورت نبود داده از سرور
                                    }) {
    const [options, setOptions] = useState(fallbackOptions);

    useEffect(() => {
        if (serverOptions && serverOptions.length > 0) {
            setOptions(serverOptions);
        } else {
            setOptions(fallbackOptions);
        }
    }, [serverOptions]);

    return (
        <>
            <FloatingLabel controlId={`floating-${post}`} label={label} className={`mb-4 w-100 rounded-4`}>
                <Form.Select
                    className={`${custom_class} rounded-5`}
                    {...register(post, {
                        ...(is_required && { required: message }),
                    })}
                >
                    <option value="">انتخاب کنید...</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </Form.Select>
            </FloatingLabel>

            {errors[post] && (
                <div className="text-danger mb-2">{errors[post]?.message}</div>
            )}
        </>
    );
}
