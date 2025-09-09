// axiosClient.js
import axios from "axios";
import Swal from "sweetalert2";
import {Navigate} from "react-router-dom";

const getToken = () => localStorage.getItem("authToken");
const SERVER_ADDRESS = "https://persents.damcheck.ir/api/v1/";
// const SERVER_ADDRESS = "http://127.0.0.1:8009/api/";

const instance = axios.create({
    baseURL: SERVER_ADDRESS,
    headers: {
        "Content-Type": "application/json",
        "X-Internal-Key":"N6u6726PaeKGeeqAm8DTXPf2HI9OzEf12kSvSrfbnGA",
    },
});

// اضافه کردن توکن به هر درخواست
instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// مدیریت خطاها
instance.interceptors.response.use(
    // اینجا اگه response وجود داشت جواب  ارسال میشه
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        const rawMessage = error?.response?.data?.message || error?.message;
        const readableMessage = typeof rawMessage === "string"
            ? rawMessage
            : Object.entries(rawMessage)
                .map(([key, value]) => `${key}: ${value.join("، ")}`)
                .join("\n");



        const warning = error;
        // if (status === 401) {
        //     localStorage.removeItem("authToken");
        //     localStorage.removeItem("role");
        //     localStorage.removeItem("avatar");
        //     localStorage.removeItem("full_name");
        //
        //     setTimeout(() => {
        //         window.location.href = "/";
        //     }, 300);
        //
        //
        //     return  console.log("logout completed");
        // }
        console.error("خطای API:", rawMessage);
       if (status === 500){
           Swal.fire({
               icon: 'error',
               title: 'خطا',
               text: readableMessage,
               confirmButtonText: 'باشه'
           });
       }
        return Promise.reject({
            status,
            readableMessage,
            raw: error.response?.data,
        });
    }
);

// توابع API
export const apiGet = (url, params = {}) => instance.get(url, {params}).then(res => res.data);
export const apiPost = (url, data = {}) => instance.post(url, data).then(res => res.data);
export const apiPut = (url, data = {}) => instance.put(url, data).then(res => res.data);
export const apiDelete = (url) => instance.delete(url).then(res => res.data);
export const apiFilePost = (url, formData) =>
    instance.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then(res => res.data);

export default instance;
