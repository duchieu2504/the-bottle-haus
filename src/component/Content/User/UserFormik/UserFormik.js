import React from 'react';
// import PropTypes from 'prop-types';
import { Formik, FastField } from 'formik';
import styles from './../User.module.scss'
import clsx from 'clsx';
// import { PROVINCE_OPTIONS } from 'constants/options.js'
import InputField from './InputField';
import SelectField from './SelectField';
import * as Yup from 'yup'


UserFormik.propTypes = {
    
};

function UserFormik(props) {
    const { activesubmit } = props;
    const initialValues = {
        fullname: '',
        email: '',
        billing_address_phone: '',
        province: '',
        billing_address: ''
    }

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
            .trim()
            .required('Vui lòng nhập tên của khách hàng'),
        billing_address_phone: Yup.string()
            .matches(rePhoneNumber, 'Vui lòng nhập số điện thoại')
            .required('Vui lòng nhập số điện thoại'),
        billing_address: Yup.string()
            .trim()
            .required('Vui lòng chọn địa chỉ gửi hàng'),
        province: Yup.string()
            .trim()
            .required('Vui lòng thêm mô tả số nhà, tên đường')
    })
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={props.handleSubmit}
        >
            {
                formikProps => {
                    {/* const { isSubmitting } = formikProps */}
                    return (
                        <form
                            onReset={formikProps.handleReset} 
                            onSubmit={formikProps.handleSubmit} 
                            className={clsx(styles.form, {[styles.active] : activesubmit})}
                            {...props}   
                        >
                            
                            <FastField 
                                name='fullname'
                                component={InputField}
                                type="text"
                                label="Tên khách hàng"
                                placeholder="Nguyễn Hiếu"
                            />

                            <FastField 
                                name='email'
                                component={InputField}

                                type="text"
                                label="Email (Không bắt buộc)"
                                placeholder="imfox@gmail.com"
                            />

                            <FastField 
                                name='billing_address_phone'
                                component={InputField}
                                type="tel"
                                label="Số điện thoại"
                                placeholder="0987654321"
                            />
                            <FastField 
                                name='province'
                                component={SelectField}

                                label="Địa chỉ"
                                placeholder="Tỉnh/Thành phố"
                                // options={PROVINCE_OPTIONS}
                            />
                            <FastField 
                                name='billing_address'
                                component={InputField}
                                type="text"
                                label="Số nhà, tên đường"
                                placeholder="Cạnh trạm cứu họa trên quốc lộ 1"
                            />
                             <button 
                                // onClick={props.handleSubmit}
                                type="submit" 
                                className={clsx(styles.form_submit)}
                            >
                                Tiếp tục
                            </button>
                        </form>
                        
                    )
                }
            }
        </Formik>
    );
}

export default UserFormik;