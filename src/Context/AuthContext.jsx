import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // ---------- Auth ----------
    const [mobile, setMobile] = useState("");
    const [hash, setHash] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // ← mount اولیه false
    const [loadingAuth, setLoadingAuth] = useState(true); // ← برای جلوگیری از redirect اشتباه
    const [company, setCompany] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token);
        setLoadingAuth(false); // ← وقتی localStorage آماده شد
    }, []);

    const setPasswordHash = (hash) => setHash(hash);
    const setUserMobile = (mobile) => setMobile(mobile);
    const setCompanyData = (data)=>{
        setCompany(data);
    }

    // ---------- Location ----------
    const [location, setLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [sendLocation  , setSendLocation] = useState([]);
    const setUserLocation = (data)=>{
        setSendLocation(data);
    }
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
                loadingAuth, // ← اضافه شد
                setUserMobile,
                setPasswordHash,
                location,
                locationError,
                setCompanyData,
                company,
                setUserLocation,
                sendLocation
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
