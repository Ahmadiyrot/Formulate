import React from 'react';
import { Link } from "react-router-dom";
import Logo from '../../img/logo.png';
import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const NavBar = () => {
    return (
        <div className="navbar navbar-expand-lg ">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center ps-3" href="#">
                    <img src={Logo} alt="Logo" width={50} height={50} className="d-inline-block align-text-top" />
                    <span className="ms-3" style={{ fontWeight: "bolder", fontSize: "1.4rem", textAlign: "center" }}>Formulate</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse pe-5" id="navbarNav">
                    <ul className="navbar-nav ms-auto ps-2 pe-2" style={{ fontWeight: "bolder" }}>
                        <li className="nav-item ps-4 pe-4">
                            <Link className="nav-link ItemListStyle active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item ps-4 pe-4">
                            <a className="nav-link ItemListStyle" href="#HowItWorks">How it works</a>
                        </li>
                        <li className="nav-item ps-4 pe-4">
                            <a className="nav-link ItemListStyle" href="#Pricing">Pricing</a>
                        </li>
                        <li className="nav-item ps-4 pe-4">
                            <a className="nav-link ItemListStyle" href="#WhyUs">Why us</a>
                        </li>
                        <li className="nav-item ps-4 pe-4">
                            <a className="nav-link ItemListStyle" href="#FAQ">FAQ</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>




        // <nav className="navbar navbar-expand-md bg-transparent">
        //     <div className="container-fluid">
        //         <Link className="navbar-brand d-flex align-items-center" to="/">
        //             <img src={Logo} alt="Logo" className="logo-img" />
        //             <h2 className="ms-2">Formulate</h2>
        //         </Link>
        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         <div className="collapse navbar-collapse" id="navbarNav">
        //             <ul className="navbar-nav ms-auto">
        //                 <li className="nav-item">
        //                     <Link className="nav-link ItemListStyle active" aria-current="page" to="/">Home</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link ItemListStyle" href="#HowItWorks">How it works</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link ItemListStyle" href="#Pricing">Pricing</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link ItemListStyle" href="#WhyUs">Why us</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link ItemListStyle" href="#FAQ">FAQ</a>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </nav>
    );
}

export default NavBar;
