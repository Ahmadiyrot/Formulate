import React from "react";

const QTrueOrFalseAnswer = ({ question, selectedOption, onOptionChange }) => {
    return (
        <div
            className="w-100 mt-2 mb-2 d-flex justify-content-center flex-column row-gap-2 rounded-3"
            style={{ backgroundColor: "#fff", padding: "5px" }}
        >
            <div className="position-relative w-100">
                <input
                    type="text"
                    className="w-100 ps-2 rounded-2 textArea-Textinput"
                    placeholder="Question"
                    value={question}
                    readOnly
                    style={{
                        backgroundColor: "#f0f0f0",
                        border: "1px solid #ccc",
                        height: "40px",
                        fontSize: "16px",
                    }}
                />
            </div>

            <div className="d-flex justify-content-center align-items-center pe-2 pt-4 pb-4">
                <div className="d-flex justify-content-center gap-5">
                    <div className="d-flex align-items-center me-3">
                        <input
                            type="radio"
                            id={`no-${question}`}
                            name={`option-${question}`}
                            value="No"
                            checked={selectedOption === "No"}
                            onChange={() => onOptionChange("No")}
                        />
                        <label htmlFor={`no-${question}`} className="d-flex align-items-center">
                            <i
                                className="bi bi-x-lg p-2 rounded-circle icon"
                                style={{ backgroundColor: "#F4F8FF" }}
                            ></i>
                            <span className="ms-1">No</span>
                        </label>
                    </div>

                    <div className="d-flex align-items-center">
                        <input
                            type="radio"
                            id={`yes-${question}`}
                            name={`option-${question}`}
                            value="Yes"
                            checked={selectedOption === "Yes"}
                            onChange={() => onOptionChange("Yes")}
                        />
                        <label htmlFor={`yes-${question}`} className="d-flex align-items-center">
                            <i
                                className="bi bi-check2 p-2 rounded-circle icon"
                                style={{ backgroundColor: "#F4F8FF" }}
                            ></i>
                            <span className="ms-1">Yes</span>
                        </label>
                    </div>

                    <div className="d-flex align-items-center">
                        <input
                            type="radio"
                            id={`dont-matter-${question}`}
                            name={`option-${question}`}
                            value="Doesn't Matter"
                            checked={selectedOption === "Doesn't Matter"}
                            onChange={() => onOptionChange("Doesn't Matter")}
                        />
                        <label htmlFor={`dont-matter-${question}`} className="d-flex align-items-center">
                            <i
                                className="bi bi-question-lg p-2 rounded-circle icon"
                                style={{ backgroundColor: "#F4F8FF" }}
                            ></i>
                            <span className="ms-1">Doesn't Matter</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QTrueOrFalseAnswer;
