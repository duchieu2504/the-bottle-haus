import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { CircularProgress } from "@mui/material";

import { auth } from "firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { showPageLogin } from "redux/Login";

// Cấu hình Context Api
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // info  user
    const [user, setUser] = useState({
        displayName: "",
        email: "",
        uid: "",
        photoURL: "",
    });
    const actionLogin = useSelector((state) => state.activeLogin.active);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    // hiệu ứng loading

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // khi firebase thay đổi kiểm tra xem người dùng đã đăng nhập thành công hay chưa???
        const unsubscibed = auth.onAuthStateChanged((user) => {
            console.log(user);

            if (user) {
                // switch (user.providerId) {
                //     case "firebase": {
                //     }
                //     case "facebook.com": {
                //     }
                // }
                const { displayName, email, uid, photoURL } = user;
                const action = showPageLogin(true);
                setUser({
                    displayName,
                    email,
                    uid,
                    photoURL,
                });

                dispatch(action);
                setIsLoading(false);
                navigate("/the-bottle-haus/home");
            }

            setUser({});
            setIsLoading(false);
        });

        // clean function
        return () => {
            unsubscibed();
        };
    }, [navigate]);
    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
