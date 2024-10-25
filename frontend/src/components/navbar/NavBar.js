import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Logo from '../../img/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Brand href="#" className="d-flex align-items-center ps-3">
                    <img
                        src={Logo}
                        alt="Logo"
                        width={50}
                        height={50}
                        className="d-inline-block align-text-top"
                    />
                    <span
                        className="ms-3"
                        style={{
                            fontWeight: "bolder",
                            fontSize: "1.4rem",
                            textAlign: "center",
                        }}
                    >
                        Formulate
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav" className="pe-5">
                    <Nav className="ms-auto ps-2 pe-2" style={{ fontWeight: "bolder" }}>
                        <Nav.Link as={Link} to="/" className="ps-4 pe-4 ItemListStyle">
                            Home
                        </Nav.Link>
                        <Nav.Link href="#HowItWorks" className="ps-4 pe-4 ItemListStyle">
                            How it works
                        </Nav.Link>
                        <Nav.Link href="#Pricing" className="ps-4 pe-4 ItemListStyle">
                            Pricing
                        </Nav.Link>
                        <Nav.Link href="#WhyUs" className="ps-4 pe-4 ItemListStyle">
                            Why us
                        </Nav.Link>
                        <Nav.Link href="#FAQ" className="ps-4 pe-4 ItemListStyle">
                            FAQ
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
