import clsx from 'clsx';
import React from 'react';
import styles from './Pagination.module.scss'
// import PropTypes from 'prop-types';

Pagination.propTypes = {
    
};

function Pagination(props) {
    const _page = 1
    const handleClick = () => {
        console.log(1);
    }
    return (
        <div className={clsx(styles.pagination)}>
            <button 
                disabled={ _page <= 1}
                className={clsx(styles.button)}
                onClick={handleClick}
            >
                <i className={clsx(styles.page_icon, 'fas fa-arrow-left')}></i>
            </button>
            <div className={clsx(styles.page)}>
                <p>{_page}</p>
            </div>
            <button 
                className={clsx(styles.button)}
            >
                <i className={clsx(styles.page_icon, 'fas fa-arrow-right')}></i>
            </button>
        </div>
    );
}

export default Pagination;