import FormPicture from '../../img/form_picture.png';
import { Link } from "react-router-dom";
const WelcomeCard = () => {
    return (
        <div className="container d-flex justify-content-center ">
            <><br /><br /><br /><br /></>
            <div className='pt-5 mt-5 col'>
                <h3>Formulate Craft, Collaborate, and Conquer Your Forms with Ease.</h3>
                <p style={{ fontSize: "1rem", fontWeight: "500" }}>New to Formulate? Sign up now and experience effortless form creation with personalized guidance tailored just for you!</p>
                <Link to="/SignUp">
                    <button type="button" className="btn btn-dark">Sign up it’s free</button>
                </Link>
            </div>
            <div className='pt-3 mt-3 col'>
                <img className="img-fluid" src={FormPicture} alt='couldnt load piccure' />
            </div>
        </div>
    )
}
export default WelcomeCard