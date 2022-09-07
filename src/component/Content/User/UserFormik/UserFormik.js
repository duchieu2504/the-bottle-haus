import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Formik, FastField } from "formik";
import styles from "./../User.module.scss";
import clsx from "clsx";
// import { PROVINCE_OPTIONS } from 'constants/options.js'
import InputField from "./InputField";
import SelectField from "./SelectField";
import * as Yup from "yup";
import { editApiAdress } from "apiServices/addressServices";
import { useNavigate } from "react-router";

UserFormik.propTypes = {
    adderss: PropTypes.object,
};
UserFormik.defaultProps = {
    adderss: {},
};

function UserFormik(props) {
    const { handleSubmit, adderss } = props;
    const navigate = useNavigate();

    const initialValues = {
        fullName: adderss.fullName || "",
        email: adderss.email || "",
        phoneNumber: adderss.phoneNumber || "",
        province: adderss.province || "",
        billingAddress: adderss.billingAddress || "",
    };

    // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const rePhoneNumber =
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().trim().required("Please enter this field name"),
        phoneNumber: Yup.string()
            .matches(rePhoneNumber, "Please enter this field name")
            .required("Please enter this field name"),
        billingAddress: Yup.string()
            .trim()
            .required("Please enter this field name"),
        province: Yup.string().trim().required("Please enter this field name"),
    });

    const handleClickReturn = () => {
        navigate(-1);
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {(formikProps) => {
                return (
                    <form
                        onReset={formikProps.handleReset}
                        onSubmit={formikProps.handleSubmit}
                        className={clsx(styles.form)}
                        {...props}
                    >
                        <FastField
                            name="fullName"
                            component={InputField}
                            type="text"
                            label="Name"
                            placeholder="Nguyễn Hiếu"
                        />

                        <FastField
                            name="email"
                            component={InputField}
                            type="text"
                            label="Email (optional)"
                            placeholder="imfox@gmail.com"
                        />

                        <FastField
                            name="phoneNumber"
                            component={InputField}
                            type="tel"
                            label="Phone"
                            placeholder="0987654321"
                        />
                        <h1 className={clsx(styles.shipping)}>
                            Shipping address
                        </h1>
                        <FastField
                            name="province"
                            component={SelectField}
                            label="Province"
                            // options={PROVINCE_OPTIONS}
                        />
                        <FastField
                            name="billingAddress"
                            component={InputField}
                            type="text"
                            label="Billing Address"
                            placeholder="Cạnh trạm cứu họa trên quốc lộ 1"
                        />
                        <div className={clsx(styles.button)}>
                            <div
                                className={clsx(styles.cancel)}
                                onClick={handleClickReturn}
                            >
                                <img src="https://img.icons8.com/ios-glyphs/30/757575/return.png" />
                                <span>Return</span>
                            </div>
                            <button
                                // onClick={props.handleSubmit}
                                type="submit"
                                className={clsx(styles.form_submit)}
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                );
            }}
        </Formik>
    );
}

export default UserFormik;
