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
            <div className="d-flex justify-content-center w-100 overflow-hidden" style={{ overflow: "hidden" }}>
                <div className="w-100" ref={navRef}>
                    <NavBar />
                </div>
                <img src={JoinUsPng} loading="lazy" alt='Couldnt load' className='position-absolute top-0 start-0 w-100' style={{ zIndex: "-999", }} />
            </div>

            <WelcomeCard />
            <div>
                <div className="pt-5 mt-5 overflow-hidden " style={{ color: "white" }}>
                    <h1 className='d-flex justify-content-center'>What Makes Us different</h1>
                    <p className='d-flex justify-content-center'>To build a brand, having a unique style and being distinctive in the market is a must for every company.
                        We create strategy and design with production across all platforms.</p>
                </div>
                <div className="container">
                    <div className="row flex-wrap">
                        <div className="col-lg-4 col-md-6 col-sm-12 ps-5">
                            <WhatCards
                                title="Drag and Drop"
                                text="Formulate offers a drag-and-drop interface for easy organization and customization, enhancing experience compared to traditional form builders."
                                image={arrows}
                            />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 ps-5">
                            <WhatCards
                                title="Collaboration"
                                text="Formulate includes tools for commenting on forms and responses, facilitating real-time discussion and teamwork directly within the form."
                                image={collaboration}
                            />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 ps-5">
                            <WhatCards
                                title="Task Management"
                                text="Formulate integrates task management features with checkboxes for marking tasks as complete, combining form creation with progress tracking."
                                image={clipboardcheck}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="pt-5 mt-5 w-100 justify-content-center d-flex" style={{ color: "white" }} id='HowItWorks'>How it works</h1>
                <div className="pt-3 mt-3 d-flex justify-content-center">
                    <Steps />
                </div>
            </div>
            <div>
                <h1 className="pt-5 mt-5 pb-5 w-100 justify-content-center d-flex" style={{ color: "white" }} id='Pricing'>Pricing</h1>
                <div className="container">
                    <div className="row flex-wrap">
                        <div className="col-lg-4 col-md-6 col-sm-12 p-0">
                            <PriceCards
                                type="false"
                                radius="15px 0px 0px 15px"
                                Inerradius="0px 0px 0px 0px"
                                name="basic"
                                price="$4"
                                feature1="50 forms limit"
                                feature2="Access to Form Creation Tools"
                                feature3="Email Support"
                            // onclick=""the function to handle the click
                            />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 p-0">
                            <PriceCards
                                type="true"
                                radius="15px 0px 0px 15px"
                                name="Essential"
                                price="$14"
                                feature1="150 forms limit"
                                feature2="All Basic Features"
                                feature3="Advanced Form Customization"
                                feature4="Task Management"
                                feature5="Priority Email Support"
                            // onclick=""the function to handle the click
                            />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 p-0">
                            <PriceCards
                                type="false"
                                radius="0px 15px 0px 0px"
                                Inerradius="0px 0px 15px 0px"
                                name="Premium"
                                price="$29"
                                feature1="No forms limit"
                                feature2="All Essential Features"
                                feature3="Custom Branding"
                            // onclick=""the function to handle the click
                            />
                        </div>
                    </div>
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
