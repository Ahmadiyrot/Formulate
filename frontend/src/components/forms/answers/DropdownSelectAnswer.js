import React from 'react';

const DropdownSelectAnswer = ({ question, options, selectedOption, onOptionChange }) => {
    return (
        <div
            className="w-100 mt-2 mb-2 d-flex flex-column row-gap-2 rounded-3"
            style={{
                backgroundColor: '#fff',
                padding: '15px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            }}
        >
            <div className="mb-3">
                <strong>{question}</strong>
            </div>

            <select
                className="form-select"
                value={selectedOption}
                onChange={(e) => onOptionChange(e.target.value)}
            >
                <option value="" disabled hidden>Select an option</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownSelectAnswer;
