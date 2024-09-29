import { useState } from "react";


const QTrueOrFalse = ({ inputValue, setInputValue }) => {

    const [option, setOption] = useState('')

    const clearInput = () => {
        setInputValue('');
    };

    return (
        <div className="w-100 mt-2 mb-2 d-flex justify-content-center flex-column row-gap-2 rounded-3" style={{ backgroundColor: "#fff", padding: "5px" }}>
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
            <div className="d-flex justify-content-center align-items-center pe-2 pt-4 pb-4">
                <div className="d-flex justify-content-center gap-5 disabled">
                    <div className="d-flex align-items-center me-3">
                        <input
                            type="radio"
                            id="no"
                            name="no"
                            value="no"
                            checked={option === 'no'}
                            onChange={() => setOption('no')}
                            disabled

                        />
                        <label htmlFor="no">
                            <i className="bi bi-check2 p-2 rounded-circle icon" style={{ backgroundColor: "#F4F8FF" }}></i>
                            <span className="ms-1">No</span>
                        </label>
                    </div>
                    <div className="d-flex align-items-center ">
                        <input
                            type="radio"
                            id="yes"
                            name="yes"
                            value="yes"
                            checked={option === 'yes'}
                            onChange={() => setOption('yes')}
                            disabled
                        />
                        <label htmlFor="yes">
                            <i className="bi bi-x-lg p-2 rounded-circle icon" style={{ backgroundColor: "#F4F8FF" }}></i>
                            <span className="ms-1">Yes</span>
                        </label>
                    </div>
                    <div className="d-flex align-items-center ">
                        <input
                            type="radio"
                            id="DontMatter"
                            name="DontMatter"
                            value="DontMatter"
                            checked={option === 'DontMatter'}
                            onChange={() => setOption('DontMatter')}
                            disabled
                        />
                        <label htmlFor="DontMatter">
                            <i className="bi bi-question-lg p-2 rounded-circle icon" style={{ backgroundColor: "#F4F8FF" }}></i>
                            <span className="ms-1">doesn't Matter</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default QTrueOrFalse