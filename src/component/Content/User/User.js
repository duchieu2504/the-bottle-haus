import React from 'react';
import PropTypes from 'prop-types';
import styles from './User.module.scss'
import clsx from 'clsx';

User.propTypes = {
    activeSubmit: PropTypes.bool,
    handleSubmit: PropTypes.func
};

User.defaultProps = {
    activeSubmit: false,
    handleSubmit: null
}

function User(props) {
    const { activeSubmit, handleSubmit } = props
    return (
        <form className={clsx(styles.form, {[styles.active] : activeSubmit})}>
            <h1 className={clsx(styles.heading)}>Thông tin khách hàng</h1>
            <div className={clsx(styles.form_group)}>
                <label for="fullname" className={clsx(styles.form_label)}>Tên khách hàng</label>
                <input id="fullname" name="fullname" type="text" placeholder="Nguyễn Hiếu" className={clsx(styles.form_control)} />
                <span className={clsx(styles.form_message)}></span>
            </div>

            <div className={clsx(styles.form_group)}>
                <label for="email" className={clsx(styles.form_label)}>Email (Không bắt buộc)</label>
                <input id="email" name="email" type="text" placeholder="email@domain.com" className={clsx(styles.form_control)} />
                <span className={clsx(styles.form_message)}></span>
            </div>

            <div className={clsx(styles.form_group)}>
                <label for="billing_address_phone" className={clsx(styles.form_label)}>Số điện thoại</label>
                <input id="billing_address_phone" name="billing_address_phone" type="tel" placeholder="0987654321" className={clsx(styles.form_control)} />
                <span className={clsx(styles.form_message)}></span>
            </div>

            <div className={clsx(styles.form_group)}>
                <label for="province" className={clsx(styles.form_label)}>Địa chỉ</label>
                <div className={clsx(styles.form_select)}>
                    <select id="province" name="province" className={clsx(styles.form_control)}>
                        <option value="">Tỉnh/Tp</option>
                        <option value="hni">Hà Nội</option>
                        <option value="hpg">Hải Phòng</option>
                    </select>
                    <select id="province" name="province" className={clsx(styles.form_control)}>
                        <option value="">Quận/Huyện</option>
                        <option value="hni">Hà Nội</option>
                        <option value="hpg">Hải Phòng</option>
                    </select>
                    <select id="province" name="province" className={clsx(styles.form_control)}>
                        <option value="">Phường/Xã</option>
                        <option value="hni">Hà Nội</option>
                        <option value="hpg">Hải Phòng</option>
                    </select>
                </div>
                <span className={clsx(styles.form_message)}></span>
            </div>

            <div className={clsx(styles.form_group)}>
                <label for="fullname" className={clsx(styles.form_label)}>Số nhà và tên đường</label>
                <input id="billing_address" name="billing_address" type="text" placeholder="Đường Quốc lộ 1, cạnh trạm cứu hỏa" className={clsx(styles.form_control)} />
                <span className={clsx(styles.form_message)}></span>
            </div>

            <button 
                className={clsx(styles.form_submit)}
                onClick={handleSubmit}
            >
                Tiếp tục
            </button>
        </form>
    );
}

export default User;