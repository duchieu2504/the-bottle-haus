import React from "react";
import PropTypes from "prop-types";

const buttonShowAll = (props) => {
    return (
        <div className={clsx(styles.btn_show_all)}>
            <NavLink to="/" className={clsx(styles.btn_show_all_link)}>
                <p>Show all</p>
            </NavLink>
        </div>
    );
};

buttonShowAll.propTypes = {};

export default buttonShowAll;
