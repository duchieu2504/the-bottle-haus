import React from "react";
import clsx from "clsx";
// import PropTypes from 'prop-types';

import styles from "./User.module.scss";

InputField.propTypes = {};

function InputField(props) {
    const { field, form, label, placeholder, type } = props;
    const { errors, touched } = form;
    const { name } = field;
    const showErrors = errors[name] && touched[name];
    return (
        <div
            className={clsx(styles.form_group, {
                [styles.form_invalid]: showErrors,
            })}
        >
            <label
                htmlFor="billing_address_phone"
                className={clsx(styles.form_label)}
            >
                {label}
            </label>
            <input
                {...field}
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                defaultValue=""
                className={clsx(styles.form_control)}
            />
            {showErrors && (
                <span className={clsx(styles.form_message)}>
                    {errors[name]}
                </span>
            )}
        </div>
    );
}

export default InputField;
