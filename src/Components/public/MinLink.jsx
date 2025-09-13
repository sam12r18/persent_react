import { Link } from "react-router-dom";

/**
 * MinLink - یک دکمه کوچک لینک‌شده
 *
 * Props:
 * @param {string} to - مسیر لینک
 * @param {string} bgColor - رنگ پس‌زمینه (مثلاً "green", "red", "orange")
 * @param {string} text - متن دکمه
 * @param {string} textColor - رنک متن دکمه
 */
export default function MinLink({ to = "#", bgColor = "btn-primary", text = "", textColor = "" }) {
    return (
        <Link
            to={to}
            className={`btn ${bgColor} text-nowrap rounded-3 fs-7 ${textColor}`}
        >
            {text}
        </Link>
    );
}
