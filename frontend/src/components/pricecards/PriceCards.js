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
                <div className="d-flex justify-content-center flex-column " style={{ minWidth: "100%" }}>
                    <div style={{ color: "white", backgroundColor: "#172736", height: "450px", borderRadius: "15px", border: "solid #172736" }}>
                        <h3 className="pt-3 d-flex justify-content-center">Most popular <i className="bi bi-stars ps-2 h5"></i></h3>
                        <div className="bg-white w-100 h-100 d-flex justify-content-between flex-column">
                            <div className="w-100 h-50 d-flex justify-content-center flex-column align-items-center" style={{ color: "black" }}>
                                <p className="h1">{props.name}</p>
                                <p className="h3" style={{ fontWeight: "1000" }}>{props.price}<span className="opacity-50" style={{ fontWeight: "400" }}>/month</span></p>
                            </div>
                            <div className=" w-100 h-100 bg-dark-subtle d-flex justify-content-center flex-column" style={{ color: "black" }}>
                                <div className="text-start ps-4 pt-4">
                                    <p><i className="bi bi-check-lg h4 pe-2"></i> {props.feature1}</p>
                                    <p><i className="bi bi-check-lg h4 pe-2"></i> {props.feature2}</p>
                                    <p><i className="bi bi-check-lg h4 pe-2"></i> {props.feature3}</p>
                                    <p><i className="bi bi-check-lg h4 pe-2"></i> {props.feature4}</p>
                                    <p><i className="bi bi-check-lg h4 pe-2"></i> {props.feature5}</p>
                                </div>
                                <button type="button" className="btn m-1 mt-auto" style={{ backgroundColor: "#FFBF00", fontWeight: "bold" }} onClick={props.onclick}>Get started</button>
                            </div>

                        </div>

                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center flex-column" style={{ minWidth: "100%", marginTop: "4rem", border: "solid #172736", borderRadius: props.radius }}>
                    <div className="bg-white w-100 h-100 d-flex justify-content-between flex-column" style={{ borderRadius: props.radius }}>
                        <div className="w-100 h-50 d-flex justify-content-center flex-column align-items-center" style={{ color: "black" }}>
                            <p className="h1 pt-2">{props.name}</p>
                            <p className="h3" style={{ fontWeight: "1000" }}>{props.price}<span className="opacity-50" style={{ fontWeight: "400" }}>/month</span></p>
                        </div>
                        <div className=" w-100 h-100 bg-dark-subtle d-flex justify-content-center flex-column" style={{ color: "black", borderRadius: props.Inerradius }}>
                            <div className="text-start ps-4 pt-4">
                                <p><i className="bi bi-check-lg h4 pe-2"></i>{props.feature1}</p>
                                <p><i className="bi bi-check-lg h4 pe-2"></i>{props.feature2}</p>
                                <p><i className="bi bi-check-lg h4 pe-2"></i>{props.feature3}</p>
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