import { useState } from "react";

const TextAreaAnswer = ({ question, answer, onAnswerChange, readOnly }) => {
    const [textAreaValue, setTextAreaValue] = useState(answer || '');

    const handleAnswerChange = (e) => {
        const newAnswer = e.target.value;
        setTextAreaValue(newAnswer);
        if (onAnswerChange) {
            onAnswerChange(newAnswer); 
        }
    };

    return (
        <div
            className="w-100 mt-2 mb-2 d-flex justify-content-center flex-column row-gap-2 rounded-3"
            style={{ backgroundColor: "#fff", padding: "5px" }}
        >
            <div className="position-relative w-100 pb-2 pt-2">
                <textarea
                    className="w-100 p-1 ps-2 rounded-2 textArea-Textinput"
                    placeholder="Write your question here"
                    value={question}
                    readOnly
                    style={{
                        resize: "none",
                        backgroundColor: "#f0f0f0",
                    }}
                />
            </div>

            <div className="position-relative w-100 pb-2 pt-2">
                <textarea
                    className="w-100 p-1 ps-2 textArea-Textinput rounded-2"
                    value={textAreaValue}
                    onChange={readOnly ? undefined : handleAnswerChange}
                    placeholder="Answer"
                    readOnly={readOnly}
                    style={{
                        resize: "none",
                        backgroundColor: "#f0f0f0",
                        height: "120px",
                    }}
                />
            </div>
        </div>
    );
};

export default TextAreaAnswer;
