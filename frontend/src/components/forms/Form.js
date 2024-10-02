import './Forms.css';
import { useNavigate } from 'react-router-dom';
const Form = (props) => {
    const navigate = useNavigate();
    return (
        <div className="bg-white container p-3" style={{ maxWidth: "400px", borderRadius: "15px" }}>
            <div className="row d-flex justify-content-center p-1 mb-2">
                <p style={{ fontWeight: "bold" }}>{props.formName}</p>
                <small style={{ fontSize: "0.7em", color: "grey" }}>
                    <span style={{ fontWeight: "bold" }}>Date created:</span> {props.date}
                </small>
            </div>
            <div className="row">
                <div className="col-8 d-flex align-items-center">
                    <button onClick={() => navigate(`/Responses/${props.id}`)} className="btn w-100 rounded-5 responsesButton">
                        View responses
                    </button>
                </div>
                <div className="col-4 d-flex align-items-center justify-content-end">
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center rounded-2" style={{ backgroundColor: props.color, color: props.color2, width: props.cardwidth }}>
                        <span>{props.status}</span>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Form;
