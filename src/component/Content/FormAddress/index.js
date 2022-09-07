import {
    editApiAdress,
    postApiAdress,
    putApiAdress,
} from "apiServices/addressServices";
import clsx from "clsx";
import { AuthContext } from "Context/AuthProvider";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import UserFormik from "../User/UserFormik/UserFormik";
import styles from "./FormAddress.module.scss";
const FormAddress = () => {
    const { id } = useParams();
    const [adderss, setAdderss] = useState({});
    const [loading, setLoading] = useState(false);
    const {
        user: { uid },
    } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            const getAddress = async () => {
                const result = await editApiAdress(id);
                const {
                    fullName,
                    email,
                    phoneNumber,
                    province,
                    billingAddress,
                } = result;
                if (result) {
                    await setAdderss({
                        fullName,
                        email,
                        phoneNumber,
                        province,
                        billingAddress,
                    });
                    await setLoading(true);
                }
            };
            getAddress();
            return;
        } else {
            setAdderss({});
            setLoading(true);
            return;
        }
    }, []);

    const handleSubmit = async (values) => {
        if (id) {
            await putApiAdress(id, values);
            await navigate(-1);
            return;
        } else {
            const data = { ...values, userId: uid };
            await postApiAdress(data);
            await navigate(-1);
            return;
        }
    };
    return (
        <div className={clsx(styles.form_edit_address_container)}>
            <div className="grid wide">
                <div className={clsx(styles.form_edit_address_wrap)}>
                    {loading && (
                        <UserFormik
                            adderss={adderss}
                            handleSubmit={handleSubmit}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormAddress;
