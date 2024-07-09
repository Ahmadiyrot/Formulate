import './PriceCards'

const PriceCards = (props) => {
    var typeOfCard = props.type
    if (props.type === "true") {
        typeOfCard = true
    } else {
        typeOfCard = false
    }
    return (
        <>
            {typeOfCard ? (
                <div className="d-flex justify-content-center flex-column " style={{ width: "25%" }}>
                    <div style={{ color: "white", backgroundColor: "#172736", height: "450px", borderRadius: "15px" }}>
                        <h3 className="pt-3">Most popular <i className="bi bi-stars"></i></h3>
                        <div className="bg-white w-100 h-100 d-flex justify-content-between flex-column" style={{ border: "solid #172736" }}>
                            <div className=" w-100 h-50 pt-5" style={{ color: "black" }}>
                                <p className="h1">{props.name}</p>
                                <p className="h3">{props.price}<span className="opacity-25">/month</span></p>
                            </div>
                            <div className=" w-100 h-100 bg-dark-subtle d-flex justify-content-center flex-column" style={{ color: "black" }}>
                                <div className="text-start ps-4 pt-4">
                                    <p><i className="bi bi-check-lg"></i> {props.feature1}</p>
                                    <p><i className="bi bi-check-lg"></i> {props.feature2}</p>
                                    <p><i className="bi bi-check-lg"></i> {props.feature3}</p>
                                    <p><i className="bi bi-check-lg"></i> {props.feature4}</p>
                                    <p><i className="bi bi-check-lg"></i> {props.feature5}</p>
                                </div>
                                <button type="button" className="btn m-1 mt-auto" style={{ backgroundColor: "#FFBF00", fontWeight: "bold" }} onClick={props.onclick}>Get started</button>
                            </div>

                        </div>

                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center flex-column" style={{ width: "25%", marginTop: "4rem" }}>
                    <div className="bg-white w-100 h-100 d-flex justify-content-between flex-column" style={{ border: "solid #172736", borderRadius: props.radius }}>
                        <div className=" w-100 h-50 pt-5 " style={{ color: "black" }}>
                            <p className="h1">{props.name}</p>
                            <p className="h3">{props.price}<span className="opacity-25">/month</span></p>
                        </div>
                        <div className=" w-100 h-100 bg-dark-subtle d-flex justify-content-center flex-column" style={{ color: "black", borderRadius: props.radius }}>
                            <div className="text-start ps-4 pt-4">
                                <p><i className="bi bi-check-lg"></i>{props.feature1}</p>
                                <p><i className="bi bi-check-lg"></i>{props.feature2}</p>
                                <p><i className="bi bi-check-lg"></i>{props.feature3}</p>
                            </div>
                            <button type="button" className="btn m-1 mt-auto" style={{ backgroundColor: "#FFBF00", fontWeight: "bold" }} onClick={props.onclick}>Get started</button>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}
export default PriceCards