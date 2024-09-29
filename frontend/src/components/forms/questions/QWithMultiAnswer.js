import { useState } from 'react';

const QWithMultiAnswer = ({ inputValue, setInputValue }) => {
    const [answers, setAnswers] = useState(['']); // Initialize with one answer field

    // Clear the question input
    const clearInput = () => {
        setInputValue('');
    };

    // Handle adding a new answer field
    const addAnswer = () => {
        if (answers.length < 4) {
            setAnswers([...answers, '']);
        }
    };

    // Handle removing an answer field
    const removeAnswer = (index) => {
        const updatedAnswers = answers.filter((_, i) => i !== index);
        setAnswers(updatedAnswers);
    };

    // Handle changing the value of an answer field
    const handleAnswerChange = (value, index) => {
        const updatedAnswers = answers.map((answer, i) => (i === index ? value : answer));
        setAnswers(updatedAnswers);
    };

    return (
        <div className="w-100 mt-2 mb-2 d-flex justify-content-center flex-column row-gap-2 rounded-3" style={{ backgroundColor: "#fff", padding: "5px" }}>
            {/* Question Input */}
            <div className="position-relative w-100">
                <input
                    type="text"
                    className="w-100 ps-2 rounded-2 textArea-Textinput"
                    placeholder="Question"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <i
                    className="bi bi-x-lg position-absolute"
                    style={{
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        backgroundColor: 'transparent',
                    }}
                    onClick={clearInput}
                />
            </div>

            {/* Answer Textareas */}
            {answers.map((answer, index) => (
                <div key={index} className="position-relative w-100">
                    <textarea
                        className="w-100 p-2 rounded-2 textArea-Textinput"
                        placeholder={`Answer ${index + 1}`}
                        value={answer}
                        onChange={(e) => handleAnswerChange(e.target.value, index)}
                        style={{ height: '100px', resize: 'none' }} // Making it a bit bigger
                    />
                    {/* Remove Answer Button */}
                    {index > 0 && (
                        <i
                            className="bi bi-x-lg position-absolute"
                            style={{
                                right: '10px',
                                top: '10px',
                                cursor: 'pointer',
                                backgroundColor: 'transparent',
                            }}
                            onClick={() => removeAnswer(index)}
                        />
                    )}
                </div>
            ))}

            {/* Add Answer Button */}
            {answers.length < 4 && (
                <button
                    type="button"
                    className="btn mt-2"
                    onClick={addAnswer}
                    style={{ alignSelf: 'center', color: "black", borderColor: "black" }}
                    disabled

                >
                    <i className="bi bi-plus-lg" style={{ color: "black !important" }}></i>
                </button>
            )}
        </div>
    );
};

export default QWithMultiAnswer;
