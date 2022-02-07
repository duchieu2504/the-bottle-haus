import clsx from 'clsx';
import React from 'react';
import styles from './Notice.module.scss'

function Notice(props) {
    return (
        <div id={clsx(styles.notice)}>
            <div className={clsx(styles.notice)}>
                <div className={clsx(styles.notice_icon)}>
                    <img src="https://img.icons8.com/external-flatarticons-blue-flatarticons/65/000000/external-info-hotel-services-flatarticons-blue-flatarticons.png" alt='Info'/>
                </div>
                <div className={clsx(styles.notice_body)}>
                    <h3 className={styles.notice_title}>Thông tin</h3>
                    <p className={styles.notice_msg}>Bạn đã có sản phẩm này trong giỏ hàng vui lòng xem thông tin chi tiết trong giỏ hàng</p>
                </div>
                <div className={styles.notice_close}>
                    <img src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-delete-user-interface-flatart-icons-flat-flatarticons.png" alt='close'/>
                </div>
            </div>
        </div>
    );
}

export default Notice;