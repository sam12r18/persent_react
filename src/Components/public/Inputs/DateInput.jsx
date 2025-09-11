import Form from "react-bootstrap/Form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useState } from "react";
import { Controller } from "react-hook-form";

export default function DateInput({ control, post, errors, text, isStartDate, start_date, end_date ,isBirthDay=false }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Form.Group className="position-relative" controlId={post}>
            <Form.Label
                column="sm"
                className={`rounded-4 fs-6 py-2 px-2 ${
                    isFocused || errors[post] ? "text-orange" : "text-color"
                }`}>
                {text}
            </Form.Label>

            <Controller
                name={post}
                control={control}
                rules={
                    isBirthDay
                        ? {}
                        : {
                            required: isStartDate
                                ? "تاریخ شروع نمی‌تواند خالی باشد"
                                : "تاریخ پایان نمی‌تواند خالی باشد",
                            validate: isStartDate
                                ? {
                                    notPast: (value) =>
                                        value >= new Date().setHours(0, 0, 0, 0) ||
                                        "تاریخ شروع نمی‌تواند در گذشته باشد",
                                    validEnd: (value) =>
                                        !end_date || value <= end_date || "تاریخ شروع باید قبل یا برابر با تاریخ پایان باشد",
                                }
                                : {
                                    validStart: (value) =>
                                        !start_date || value >= start_date || "تاریخ پایان باید بعد یا برابر با تاریخ شروع باشد",
                                },
                        }
                }
                render={({ field }) => (
                    <DatePicker
                        {...field}
                        inputClass="form-control rounded-5 py-3 text-end"
                        calendar={persian}
                        locale={persian_fa}
                        value={field.value}
                        minDate={!isStartDate ? start_date : undefined}
                        onChange={(date) => field.onChange(date?.toDate?.() || null)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                )}
            />

            {errors[post] && (
                <p className="text-danger mt-2">{errors[post].message}</p>
            )}
        </Form.Group>
    );
}
