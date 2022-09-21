import React from "react";
import clsx from "clsx";
import * as Yup from "yup";
import { FastField, Formik } from "formik";

import InputField from "./InputField";

import styles from "../PageLogin.module.scss";

const FormSignUp = (props) => {
    const { handleSubmit, userSignUp } = props;

    const initialValues = {
        fullName_signUp: "",
        email_signUp: "",
        password_signUp: "",
        password_confirmation: "",
    };

    const validationSchema = Yup.object().shape({
        fullName_signUp: Yup.string()
            .trim()
            .required("Please enter this field name"),
        email_signUp: Yup.string()
            .trim()
            .email("Please enter the correct email")
            .required("This field is required"),
        password_signUp: Yup.string()
            .min(6, "Enter at least 6 characters")
            .required("Please enter this field name"),
        password_confirmation: Yup.string()
            .oneOf(
                [Yup.ref("password_signUp"), null],
                "Please enter the correct password"
            )
            .required("This field is required"),
    });
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
                        className={clsx(styles.form_submit)}
                        {...props}
                    >
                        <FastField
                            name="fullName_signUp"
                            component={InputField}
                            type="text"
                            label="FullName"
                        />
                        <FastField
                            name="email_signUp"
                            component={InputField}
                            type="text"
                            label="Email"
                        />
                        <FastField
                            name="password_signUp"
                            component={InputField}
                            type="password"
                            label="Password"
                        />
                        <FastField
                            name="password_confirmation"
                            component={InputField}
                            type="password"
                            label="Confirm password"
                        />
                        <div className={clsx(styles.footer)}>
                            <button
                                type="submit"
                                className={clsx(styles.footer_submit)}
                            >
                                Sign In
                            </button>
                            <button
                                type="reset"
                                className={clsx(styles.footer_reset)}
                            ></button>
                        </div>
                    </form>
                );
            }}
        </Formik>
    );
};

export default FormSignUp;
