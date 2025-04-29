import { createContext, useContext, useEffect, useState } from "react";
import {data, useNavigate} from "react-router-dom";
import axios from "axios";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("access_token"));
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/");
        } else {
            checkTokenWithServer(token);
        }
    }, [token, navigate]);

    const checkTokenWithServer = async (token) => {
        try {
            const response = await axios.post('API',token , {} )
            console.log(response)
        } catch (error) {
            console.error(error.message);
            localStorage.removeItem("token");
            setToken(null);
            navigate("/");
        }
    };

    return (
        <ProfileContext.Provider value={{ token, setToken }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
