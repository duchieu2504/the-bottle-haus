import React from "react";
// import PropTypes from 'prop-types';
import { Formik, FastField } from "formik";
import styles from "./../User.module.scss";
import clsx from "clsx";
// import { PROVINCE_OPTIONS } from 'constants/options.js'
import InputField from "./InputField";
import SelectField from "./SelectField";
import * as Yup from "yup";

UserFormik.propTypes = {};

function UserFormik(props) {
    const { handleSubmit } = props;
    const initialValues = {
        fullname: "",
        email: "",
        billing_address_phone: "",
        province: "",
        billing_address: "",
    };

    // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const rePhoneNumber =
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

    const validationSchema = Yup.object().shape({
        fullname: Yup.string().trim().required("Please enter this field name"),
        billing_address_phone: Yup.string()
            .matches(rePhoneNumber, "Please enter this field name")
            .required("Please enter this field name"),
        billing_address: Yup.string()
            .trim()
            .required("Please enter this field name"),
        province: Yup.string().trim().required("Please enter this field name"),
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
                        className={clsx(styles.form)}
                        {...props}
                    >
                        <FastField
                            name="fullname"
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
                            name="billing_address_phone"
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
                            placeholder="Tỉnh/Thành phố"
                            // options={PROVINCE_OPTIONS}
                        />
                        <FastField
                            name="billing_address"
                            component={InputField}
                            type="text"
                            label="Billing Address"
                            placeholder="Cạnh trạm cứu họa trên quốc lộ 1"
                        />
                        <button
                            // onClick={props.handleSubmit}
                            type="submit"
                            className={clsx(styles.form_submit)}
                        >
                            Continue
                        </button>
                    </form>
                );
            }}
        </Formik>
    );
}

export default UserFormik;
