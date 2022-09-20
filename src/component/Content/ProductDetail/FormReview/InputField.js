import React from "react";
// import PropTypes from 'prop-types';
import styles from "./FormReview.module.scss";
import clsx from "clsx";
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
            <input
                {...field}
                id={name}
                name={name}
                placeholder={placeholder}
                type={type}
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
