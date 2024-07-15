import './Forms.css'
import FavButton from './FavButton'
import StatusButton from './StatusButton'
const Forms = () => {
    return (
        <div className="bg-white container" style={{ minWidth: "22%", maxWidth: "22%", height: "15%", borderRadius: "15px" }}>
            <div className="row">
                <div className="col-8 p-3">
                    <p style={{ fontWeight: "bold" }} >E-commerce website Form</p>
                    <small style={{ display: "block", fontSize: "0.7em", color: "grey", marginTop: "-15px" }}><span style={{ fontWeight: "bold" }}>Date created:</span> 21-03-2022</small>
                </div>
                <div className="col-4 d-flex justify-content-end p-3">
                    <FavButton />
                </div>
            </div>
            <div className="row ">
                <div className="col-8 p-3">
                    <button type="submit" className="btn w-50 rounded-5 responsesButton">View responses</button>
                </div>
                <div className="col p-3">
                    <StatusButton
                    color="#FDE9E9" />
                </div>
            </div>
        </div>
    )
}
export default Forms