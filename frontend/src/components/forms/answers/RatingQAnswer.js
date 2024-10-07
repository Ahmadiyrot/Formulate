import Rating from 'react-rating';
import React from 'react';

const RatingQAnswer = ({ question, rating, setRating }) => {
    const clearRating = () => {
        setRating(0);
    };

    return (
        <div className="w-100 mt-2 mb-2 d-flex justify-content-center flex-column row-gap-2 rounded-3" 
            style={{ backgroundColor: "#fff", padding: "5px", borderRadius: "8px", border: "1px solid #ccc" }}>
            
            <div className="position-relative w-100">
                <input
                    type="text"
                    className="w-100 ps-2 rounded-2 textArea-Textinput"
                    placeholder="Question"
                    value={question}
                    readOnly 
                    style={{ backgroundColor: "#f0f0f0", border: "1px solid #ccc", height: "40px", fontSize: "16px" }}
                />
            </div>

            <div className="d-flex justify-content-between align-items-center p-2" style={{ marginTop: "10px" }}>
                <p>Unsatisfied</p>
                <Rating
                    initialRating={rating}
                    emptySymbol={<span className="empty-circle" style={{ margin: '0 5px' }}>⚪</span>}
                    fullSymbol={<span className="full-circle" style={{ margin: '0 5px' }}>⚫</span>}
                    onChange={value => {
                        setRating(value); 
                        
                    }}
                    fractions={2}
                    stop={10}
                    readonly={false} 
                />
                <p>Very Satisfied</p>
            </div>

            <i
                className="bi bi-x-lg position-absolute"
                style={{
                    right: '10px',
                    top: '10px',
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                }}
                onClick={clearRating}
            />
        </div>
    );
};

export default RatingQAnswer;
