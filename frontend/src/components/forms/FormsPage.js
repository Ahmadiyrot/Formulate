import Form from "./Form.js"
const FormsPage = (props) => {
    return (
        <div className="container-fluid ">
            {/* First Row */}
            <div className="row">
                <div className="col d-flex justify-content-start flex-row align-items-center p-3">
                    <h2 className="ps-2 pe-2 text-white-50">Ahmad iyrot</h2>

                    <div className="ps-2 pe-2 text-center">
                        <img
                            src="https://scontent.fjrs29-1.fna.fbcdn.net/v/t39.30808-6/354249817_256558793688728_6586745897640383776_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=cUODFerD0t4Q7kNvgHtuHD2&_nc_ht=scontent.fjrs29-1.fna&_nc_gid=A7FRAyca9QzMEtnoOS6DgYS&oh=00_AYCu6arlVALmbImQW37x1H0GGYpJB0z8BtPtdGkCrmzYuw&oe=66E23A50"
                            className="rounded-circle"
                            width={80}
                        />
                        <div className="mt-1" style={{ height: "2px", backgroundColor: "#ccc", width: "100%" }}></div>
                    </div>
                </div>
            </div>

            {/* Second Row */}
            <div className="row">
                {/* First Column (Small) */}
                <div className="col-2 ">
                    <div className="p-3 border bg-light">

                    </div>
                </div>


                <div className="col-8">
                    <div className="d-flex flex-wrap justify-content-center">
                        {Array(7).fill().map((_, index) => (
                            <div key={index} style={{ width: "300px", margin: "10px" }}>
                                <Form />
                            </div>
                        ))}
                    </div>
                </div>






                {/* Last Column (Small) */}
                <div className="col-2">
                    <div className="p-3 border bg-light">Small Column</div>
                </div>
            </div>
        </div>
    )
}
export default FormsPage