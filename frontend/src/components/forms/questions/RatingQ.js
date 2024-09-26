import Rating from 'react-rating';

const RatingQ = ({ inputValue, setInputValue, rating, setRating }) => {
    const clearInput = () => {
        setInputValue(''); 
        setRating(0); 
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
            <div className='d-flex justify-content-between p-2'>
                <p>Unsatisfied</p>
                <Rating
                    initialRating={rating}
                    emptySymbol={<span className="empty-circle" style={{ margin: '0 5px' }}>⚪</span>}
                    fullSymbol={<span className="full-circle" style={{ margin: '0 5px' }}>⚫</span>}
                    onChange={value => {
                        setRating(value);
                        console.log(`Selected value: ${value}`);
                    }}
                    fractions={2}
                    stop={10}
                    readonly={true}
                />
                <p>Very satisfied</p>
            </div>

        </div>
    );
}

export default RatingQ;
