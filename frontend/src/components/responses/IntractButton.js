import React from 'react';
import { Link } from 'react-router-dom';

const IntractButton = ({ iconClass, bgColor, textColor, to }) => {
    return (
        <Link to={to} className={`btn p-1 ${textColor} rounded-circle`} style={{ backgroundColor: bgColor}}>
            <i className={`${iconClass} h5 p-2`} />
        </Link>
    );
};

export default IntractButton;
