import React from 'react';
import './Select.css';
import PropTypes from 'prop-types';

const Select = ({ size, label, options, onChange }) => {
    return (
        <label className={`select-component select-component--${size}`}>
            <span>{label}</span>
            <select className="select-component" onChange={onChange}>
                {options.map((option) => <option value={option.value}>{option.description}</option>)}
            </select>
        </label>
    );
};

Select.propTypes = {
    size: PropTypes.oneOf(['medium', 'large']),
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    })).isRequired,
    onChange: PropTypes.func,
};

Select.defaultProps = {
    size: 'medium',
    label: 'Options',
    options: []
};

export default Select;
