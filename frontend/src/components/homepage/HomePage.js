import React from 'react';
import JoinUsPng from '../../img/Join_us.png';
import WelcomeCard from '../welcomecard/WelcomeCard';
import arrows from '../../img/arrows.svg';
import clipboardcheck from '../../img/clipboardcheck.svg';
import collaboration from '../../img/collaboration.svg';
import PriceCards from '../pricecards/PriceCards';
import './HomePage.css';
import NavBar from '../navbar/NavBar';
import WhatCards from '../whatcards/WhatCards';
import Steps from '../steps/Steps';
import useIsElementInViewport from './useIsElementInViewport';
import Footer from '../footer/Footer';

const HomePage = () => {
    const [navRef, isNavInView] = useIsElementInViewport();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className="img-fluid overflow-hidden d-flex justify-content-center">
                <div ref={navRef}>
                    <NavBar />
                </div>
                <img src={JoinUsPng} alt='Couldnt load' className="img-fluid" style={{ position: "absolute", zIndex: "-999" }} />
            </div>

            <WelcomeCard />
            <div>
                <div className="pt-5 mt-5 overflow-hidden" style={{ color: "white" }}>
                    <h1>What Makes Us different</h1>
                    <p style={{ width: "100vw" }}>To build a brand, having a unique style and being distinctive in the market is a must for every company.
                        We create strategy and design with production across all platforms.</p>
                </div>
                <div className="container d-flex justify-content-around pb-5">
                    <WhatCards
                        title="Drag and Drop"
                        text="Formulate offers a drag-and-drop interface for easy organization and customization, enhancing user experience compared to traditional form builders."
                        image={arrows}
                    />
                    <WhatCards
                        title="Collaboration"
                        text="Formulate includes tools for commenting on forms and responses, facilitating real-time discussion and teamwork directly within the form."
                        image={collaboration}
                    />
                    <WhatCards
                        title="Task Management"
                        text="Formulate integrates task management features with checkboxes for marking tasks as complete, combining form creation with progress tracking."
                        image={clipboardcheck}
                    />
                </div>
            </div>
            <div>
                <h1 className="pt-5 mt-5" style={{ color: "white" }} id='HowItWorks'>How it works</h1>
                <div className="pt-3 mt-3 d-flex justify-content-center">
                    <Steps />
                </div>
            </div>
            <div>
                <h1 className="pt-5 mt-5 pb-5" style={{ color: "white" }} id='Pricing'>Pricing</h1>
                <div className="pt-3 mt-3 d-flex justify-content-center flex-row" style={{ height: "auto" }}>
                    <PriceCards
                        type="false"
                        radius="15px 0px 0px 15px"
                        name="basic"
                        price="4.99$"
                        feature1="50 forms limit"
                        feature2="Access to Form Creation Tools"
                        feature3="Email Support"
                        onclick=""//the function to handle the click
                    />
                    <PriceCards
                        type="true"
                        radius="15px 0px 0px 15px"
                        name="Essential"
                        price="14.99$"
                        feature1="150 forms limit"
                        feature2="All Basic Features"
                        feature3="Advanced Form Customization"
                        feature4="Task Management"
                        feature5="Priority Email Support"
                        onclick=""//the function to handle the click
                    />
                    <PriceCards
                        type="false"
                        radius="0px 15px 15px 0px"
                        name="Premium"
                        price="14.99$"
                        feature1="No forms limit"
                        feature2="All Essential Features"
                        feature3="Custom Branding"
                        onclick=""//the function to handle the click
                    />
                </div>
            </div>

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            {!isNavInView && (
                <button
                    onClick={scrollToTop}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        background: '#000',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 1000
                    }}
                >
                    ↑
                </button>
            )}
            <Footer />
        </>
    );
};

export default HomePage;
