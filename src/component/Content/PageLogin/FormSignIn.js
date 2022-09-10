import { FastField, Formik } from "formik";
import React from "react";
import InputField from "./InputField";
import styles from "./PageLogin.module.scss";
import * as Yup from "yup";
import clsx from "clsx";
import { showPageLogin } from "redux/Login";
import { useDispatch, useSelector } from "react-redux";

const FormSignIn = (props) => {
    const { handleSubmit, errorLogin, handleClickClose } = props;
    const activeLogin = useSelector((state) => state.activeLogin.active);

    const dispatch = useDispatch();

    const errorMessageLogin = {
        INVALID_PASSWORD: "Invalid password",
        USER_NOT_FOUND: "Can't locate gmail account, please check again",
    };

    const initialValues = {
        email_signIn: "",
        password_signIn: "",
    };

    const validationSchema = Yup.object().shape({
        email_signIn: Yup.string()
            .trim()
            .email("Please enter the correct email")
            .required("This field is required"),
        password_signIn: Yup.string()
            .min(6, "Enter at least 6 characters")
            .required("Please enter this field name"),
    });
    const handleReset = async ({ resetForm }) => {
        resetForm();
        // try {
        //     const action = await showPageLogin(activeLogin);
        //     await dispatch(action);
        //     await resetForm;
        //     console.log("Success");
        // } catch (err) {
        //     console.log("Error");
        // }
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            // onReset={handleReset}
        >
            {(formikProps) => {
                return (
                    <form
                        // onReset={formikProps.handleReset}
                        onSubmit={formikProps.handleSubmit}
                        className={clsx(styles.form_submit)}
                    >
                        <FastField
                            name="email_signIn"
                            component={InputField}
                            type="text"
                            label="Email"
                        />
                        <FastField
                            name="password_signIn"
                            component={InputField}
                            type="password"
                            label="Password"
                        />
                        <div className={clsx(styles.errorLogin)}>
                            {errorLogin && errorMessageLogin[errorLogin]}
                        </div>
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

export default FormSignIn;
