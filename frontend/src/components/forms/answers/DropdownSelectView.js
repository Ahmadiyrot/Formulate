import React from 'react';

const DropdownSelectView = ({ question, selectedOption }) => {
    return (
        <div
            className="w-100 mt-2 mb-2 d-flex flex-column rounded-3"
            style={{
                backgroundColor: '#fff',
                padding: '15px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            }}
        >
            <div className="mb-3">
                <strong>{question}</strong>
            </div>

            <div>
                <p>
                    <strong>Answer:</strong> {selectedOption}
                </p>
            </div>
        </div>
    );
};

export default DropdownSelectView;
