import './Forms.css';
import FavButton from './FavButton';
import StatusButton from './StatusButton';

const Form = () => {
    return (
        <div className="bg-white container p-3 mt-2 mb-2" style={{ maxWidth: "400px", borderRadius: "15px" }}>
            <div className="row">
                <div className="col-8 d-flex flex-column justify-content-center">
                    <p style={{ fontWeight: "bold" }}>E-commerce website Form</p>
                    <small style={{ fontSize: "0.7em", color: "grey" }}>
                        <span style={{ fontWeight: "bold" }}>Date created:</span> 21-03-2022
                    </small>
                </div>
                <div className="col-4 d-flex align-items-center justify-content-end">
                    <FavButton />
                </div>
            </div>
            <div className="row">
                <div className="col-8 d-flex align-items-center">
                    <button type="submit" className="btn w-100 rounded-5 responsesButton">
                        View responses
                    </button>
                </div>
                <div className="col-4 d-flex align-items-center justify-content-end">
                    <StatusButton color="#FDE9E9" />
                </div>
            </div>
        </div>
    );
};

export default Form;
