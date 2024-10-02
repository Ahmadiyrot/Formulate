import './Steps.css'
import arrow from '../../img/stepsArrow.svg'
const Steps = () => {
    return (
        <div className="container text-white">
            <div className="row justify-content-center text-center align-items-center">

                <div className="col-12 col-md-4 p-3">
                    <div style={{ fontSize: "4rem" }}>1</div>
                    <p><strong>Create and Customize Forms</strong></p>
                    <p>Sign up and log into Formulate. Use the drag and drop interface to design forms with various question types, customizing them to fit your needs.</p>
                </div>

                <div className="col-12 col-md-auto p-3">
                    <img src={arrow} loading="lazy" alt="arrow" className="arrow" />
                </div>

                <div className="col-12 col-md-4 p-3">
                    <div style={{ fontSize: "4rem" }}>2</div>
                    <p><strong>Share and Collect Responses</strong></p>
                    <p>Share your form via email or a link. Recipients can fill out the form, and their responses are organized in your dashboard for easy access and analysis.</p>
                </div>

                <div className="col-12 col-md-auto p-3">

                </div>

                <div className="col-12 col-md-4 p-3">
                    <div style={{ fontSize: "4rem" }}>3</div>
                    <p><strong>Collaborate and Manage Tasks</strong></p>
                    <p>Leave comments on forms and responses for feedback. Mark tasks as finished using checkboxes, and manage everything from your comprehensive dashboard to stay organized and productive.</p>
                </div>
            </div>
        </div>
        // <div className="d-flex justify-content-center flex-column" style={{color: "white"}}>
        //     <div style={{ fontSize: "6rem" }}>
        //         <span className="p-5">1</span>
        //         <img src={arrow} loading="lazy" alt="arrow" />
        //         <span className="p-5">2</span>
        //         <img src={arrow} loading="lazy" alt="arrow" />
        //         <span className="p-5">3</span>
        //     </div>
        //     <div  className="d-flex justify-content-center flex-row" style={{color: "white"}}>
        //         <div className="w-25 p-3">
        //             <p>Create and Customize Forms</p>
        //             <p>Sign up and log into Formulate. Use the drag and drop interface to design forms with various question types, customizing them to fit your needs.</p>
        //         </div>
        //         <div className="w-25 p-3">
        //             <p>Share and Collect Responses</p>
        //             <p>Share your form via email or a link. Recipients can fill out the form, and their responses are organized in your dashboard for easy access and analysis.</p>
        //         </div>
        //         <div className="w-25 p-3">
        //             <p>Collaborate and Manage Tasks</p>
        //             <p>Leave comments on forms and responses for feedback. Mark tasks as finished using checkboxes, and manage everything from your comprehensive dashboard to stay organized and productive.</p>
        //         </div>
        //     </div>
        // </div>
    )
}
export default Steps