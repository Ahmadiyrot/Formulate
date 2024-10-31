import React from 'react';
import './Answers.css'; 

const PickAnswerAnswer = ({ question, answers, selectedOption, onOptionChange }) => {
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

            <div className="btn-group" role="group" aria-label="Options">
                {answers.map((option, idx) => (
                    <button
                        key={idx}
                        type="button"
                        className={`btn btn-outline-primary ${selectedOption === option ? 'active' : ''}`}
                        onClick={() => onOptionChange(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PickAnswerAnswer;
