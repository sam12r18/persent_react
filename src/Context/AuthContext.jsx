import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // ---------- Auth ----------
    const [mobile, setMobile] = useState("");
    const [hash, setHash] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(true);

    // مقدار اولیه company از localStorage
    const [company, setCompany] = useState(() => {
        const stored = localStorage.getItem("companyData");
        return stored ? JSON.parse(stored) : {};
    });

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token);
        setLoadingAuth(false);
    }, []);

    // هر بار که company تغییر کنه، توی localStorage هم ذخیره میشه
    useEffect(() => {
        if (company && Object.keys(company).length > 0) {
            localStorage.setItem("companyData", JSON.stringify(company));
        } else {
            localStorage.removeItem("companyData");
        }
    }, [company]);

    const setPasswordHash = (hash) => setHash(hash);
    const setUserMobile = (mobile) => setMobile(mobile);

    const setCompanyData = (data) => {
        setCompany(data); // هم state آپدیت میشه هم useEffect ذخیره میکنه
    };

    // ---------- Location ----------
    const [location, setLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [sendLocation, setSendLocation] = useState([]);

    const setUserLocation = (data) => {
        setSendLocation(data);
    };
    useEffect(() => {
        if (sendLocation && Object.keys(sendLocation).length > 0) {
            localStorage.setItem("location", JSON.stringify(sendLocation));
        } else {
            localStorage.removeItem("location");
        }
    }, [sendLocation]);

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocationError("مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setLocation({ lat: latitude, lng: longitude });
            },
            (err) => {
                console.error("Geolocation Error:", err);
                setLocationError("دسترسی به موقعیت امکان‌پذیر نیست.");
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    }, []);

    return (
        <AuthContext.Provider
            value={{
                mobile,
                hash,
                isLoggedIn,
                loadingAuth,
                setUserMobile,
                setPasswordHash,
                location,
                locationError,
                setCompanyData,
                company,
                setUserLocation,
                sendLocation,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
