import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import unauthorizedImage from '../../img/Unauthorized.svg';
import './ErrorPage.css'
const NotFoundPage = () => (
    <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
            <h1 className="display-4">404 - Page Not Found</h1>
            <p className="lead">The page you're looking for doesn't exist.</p>
            <a href="/" className="btn btn-primary">Go to Home</a>
        </div>
    </div>
);

const InternalServerErrorPage = () => (
    <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
            <h1 className="display-4">500 - Internal Server Error</h1>
            <p className="lead">Something went wrong on our end. Please try again later.</p>
            <a href="/" className="btn btn-primary">Go to Home</a>
        </div>
    </div>
);

const UnauthorizedPageForm = () => {
    const navigate = useNavigate();

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 text-white">
            <div className="text-center">
                <img
                    src={unauthorizedImage}
                    alt="Unauthorized"
                    className="img-fluid mb-4"
                    style={{ maxWidth: '300px' }}
                />
                <h1 className="display-4" style={{ fontWeight: "600" }}>402 - Unauthorized</h1>
                <p className="lead" style={{ fontWeight: "600" }}>You have already answered this form.</p>

                <button
                    className='takemeback'
                    onClick={() => navigate('/')}
                >
                    <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024">
                        <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
                    </svg>
                    <span>Back</span>
                </button>
            </div>
        </div>
    );
};

const UnauthorizedPage = () => (
    <div className="container d-flex justify-content-center align-items-center vh-100 text-white">
        <div className="text-center">
            <img
                src={unauthorizedImage}
                alt="Unauthorized"
                className="img-fluid mb-4"
                style={{ maxWidth: '300px' }}
            />
            <h1 className="display-4" style={{ fontWeight: "600" }}>401 - Unauthorized</h1>
            <p className="lead" style={{ fontWeight: "600" }}>You don't have permission to access this page. Please log in first.</p>

            <button className='takemeback'>
                <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
                <span>Back</span>
            </button>
        </div>
    </div>
);

const ForbiddenPage = () => (
    <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
            <h1 className="display-4">403 - Forbidden</h1>
            <p className="lead">You are not allowed to view this page.</p>
            <a href="/" className="btn btn-primary">Go to Home</a>
        </div>
    </div>
);

const UnknownErrorPage = ({ id }) => (
    <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
            <h1 className="display-4">Error</h1>
            <p className="lead">An unknown error occurred. Error ID: {id}</p>
            <a href="/" className="btn btn-primary">Go to Home</a>
        </div>
    </div>
);

const ErrorPage = () => {
    const location = useLocation();
    const { id } = location.state || {};

    const renderErrorPage = () => {
        switch (id) {
            case 404:
                return <NotFoundPage />;
            case 500:
                return <InternalServerErrorPage />;
            case 401:
                return <UnauthorizedPage />;
            case 402:
                return <UnauthorizedPageForm />
            case 403:
                return <ForbiddenPage />;
            default:
                return <UnknownErrorPage id={id} />;
        }
    };

    return <>{id ? renderErrorPage() : <UnknownErrorPage id="Unknown" />}</>;
};

export default ErrorPage;
