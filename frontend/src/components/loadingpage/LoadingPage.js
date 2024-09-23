import './LoadingPage.css'
const LoadingPage = () => {
    return (
        <>

            <div className="container-fluid d-flex justify-content-center align-items-center vh-100 flex-column">
                <p style={{ fontweight: "bolder", color: "#bebebe", fontsize: "1.5rem" }}>Fun fact: Formulate was developed by a single individual.</p>
                <div className="loader text-center">
                    <p>loading</p>
                    <div className="words">
                        <span className="word">buttons</span>
                        <span className="word">forms</span>
                        <span className="word">switches</span>
                        <span className="word">cards</span>
                        <span className="word">buttons</span>
                    </div>
                </div>
            </div >



        </>
    )
}
export default LoadingPage