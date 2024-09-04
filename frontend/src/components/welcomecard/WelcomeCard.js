import React from 'react';
import FormPicture from '../../img/form_picture.png';
import { Link } from "react-router-dom";

const WelcomeCard = () => {
    return (
        <div className="container d-flex flex-column flex-md-row justify-content-center align-items-center">
            <div className='text-center text-md-start pt-5 mt-5 col-md-6'>
                <h3 style={{color: "white"}}>Formulate Craft, Collaborate, and Conquer Your Forms with Ease.</h3>
                <p style={{ fontSize: "1rem", fontWeight: "500",color: "white" }}>New to Formulate? Sign up now and experience effortless form creation with personalized guidance tailored just for you!</p>
                <Link to="/SignUp">
                    <button type="button" className="btn btn-dark">Sign up it’s free</button>
                </Link>
            </div>
            <div className='pt-3 mt-3 col-md-6 d-none d-md-block'>
                <img className="img-fluid" src={FormPicture} alt='Couldn’t load picture' />
            </div>
        </div>
    )
}

export default WelcomeCard;
