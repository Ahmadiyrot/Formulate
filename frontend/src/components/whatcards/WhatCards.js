import './WhatCards.css'

const WhatCards = (props) => {
    return (
        <div className="card" style={{ width: '20rem', backgroundColor: "#172736", borderRadius: "5px 5px 0px 0px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={props.image} className="pt-3" style={{ width: "7rem" }} alt="" />
            <div className="card-body" style={{ backgroundColor: "#172736", color: "white", textAlign: "center", width: "100%" }}>
                <p className="h3">{props.title}</p>
                <p className="card-text">{props.text}</p>
                <button type="button" className="btn" style={{ backgroundColor: "#FFBF00", fontWeight: "bold" }} onClick={props.onclick}>Read more</button>
            </div>
        </div>




    )
}
export default WhatCards