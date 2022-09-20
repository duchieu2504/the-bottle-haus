import { FastField, Formik } from "formik";
import React from "react";
import InputField from "./InputField";
import styles from "./FormReview.module.scss";
import * as Yup from "yup";
import clsx from "clsx";

const FormReview = (props) => {
    const { yourReview, handleSubmit } = props;

    const initialValues = {
        displayName_review: yourReview.displayName || "",
        title_review: yourReview.title || "",
        comment_review: yourReview.comment || "",
    };
    const validationSchema = Yup.object().shape({
        displayName_review: Yup.string()
            .trim()
            .required("This field is required"),
        title_review: Yup.string()
            .trim()
            .required("Please enter this field name"),
        comment_review: Yup.string()
            .trim()
            .required("Please enter this field name"),
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
                        onSubmit={formikProps.handleSubmit}
                        className={clsx(styles.form_submit)}
                    >
                        <FastField
                            name="displayName_review"
                            component={InputField}
                            type="text"
                            placeholder="Enter your name"
                        />
                        <FastField
                            name="title_review"
                            component={InputField}
                            type="text"
                            placeholder="Give your review a title"
                        />
                        <FastField
                            name="comment_review"
                            component={InputField}
                            type="text"
                            placeholder="Write your comments here"
                        />

                        <div className={clsx(styles.footer)}>
                            <button
                                type="submit"
                                className={clsx(
                                    styles.footer_submit,
                                    styles.have_evaluated
                                )}
                            >
                                {yourReview ? "Update Review" : "Submit Review"}
                            </button>
                        </div>
                    </form>
                );
            }}
        </Formik>
    );
};

export default FormReview;
