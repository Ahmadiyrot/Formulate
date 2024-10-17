import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResponseCard from './ResponseCard';
import axios from '../../api/axios';
import './Responses.css';
import Pagination from '../forms/Pagination.js';
import NothingFound from "../../img/NothingFound.svg";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Responses = () => {
    const { id } = useParams();
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const responsesPerPage = 8;

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                setLoading(true);
                setError(null);

                const params = {
                    page: currentPage,
                    limit: responsesPerPage,
                };
                if (selectedStatus) {
                    params.status = selectedStatus;
                }
                const res = await axios.get(`/responses/${id}`, { params });
                console.log(res.data);
                setResponses(res.data.responses);
                setTotalPages(Math.ceil(res.data.total / responsesPerPage));
            } catch (err) {
                setError(err.response ? err.response.data.error : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResponses();
    }, [id, selectedStatus, currentPage]);

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (loading) {
        return (
            <div className="container-fluid col-8 pt-5">
                <Skeleton height={40} width={300} /> 

                <div className="row justify-content-between align-items-center mt-3 mb-4">
                    <div className="col-auto">
                        <Skeleton width={120} height={30} /> 
                    </div>
                </div>

                <div className="d-flex flex-column align-items-center">
                    {Array.from({ length: responsesPerPage }).map((_, index) => (
                        <div className="container-fluid w-100 p-2 bg-white m-2 rounded-2"
                            style={{ border: "1px solid #E9EFF4" }}>
                            <div className="row align-items-center justify-content-center">

                                <div className="col-12 col-sm-6 col-md-2 mb-2 mb-md-0 d-flex justify-content-center align-items-center p-2"
                                    style={{ borderRadius: '8px', width: '65px' }}>
                                    <Skeleton height={25} width={50} /> 
                                </div>

                                <div className="col-12 col-sm-6 col-md-3 mb-2 mb-md-0 text-center text-md-left">
                                    <Skeleton height={25} width={'100%'} />
                                </div>

                                <div className="col-12 col-sm-6 col-md-3 mb-2 mb-md-0 text-center text-md-left">
                                    <Skeleton height={25} width={'100%'} /> 
                                </div>

                                <div className="col-12 col-sm-6 col-md-2 mb-2 mb-md-0 text-center text-md-left">
                                    <Skeleton height={25} width={'100%'} /> 
                                </div>

                                <div className="col-12 col-md-2 d-flex justify-content-center justify-content-md-around p-1">
                                    <Skeleton circle={true} height={40} width={40} /> 
                                    <Skeleton circle={true} height={40} width={40} /> 
                                    <Skeleton circle={true} height={40} width={40} /> 
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) return (
        <div className="container d-flex justify-content-center align-items-center vh-100 text-white">
            <div className="text-center">
                <img
                    src={NothingFound}
                    alt="NothingFound"
                    className="img-fluid mb-4"
                    style={{ maxWidth: '300px' }}
                />
                <h1 className="display-4" style={{ fontWeight: "600" }}> Ups!... no responses found</h1>
                <p className="lead" style={{ fontWeight: "600" }}>Please try another form</p>

                <button
                    className='takemeback'
                    onClick={() => navigate(-1)}
                >
                    <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024">
                        <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
                    </svg>
                    <span>Back</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="container-fluid col-8 pt-5">
            <h3 style={{ color: "#FFBF00", fontWeight: "bold" }}>
                {responses.length > 0 ? responses[0]?.formId?.formName : 'Form'}
            </h3>

            <div className="row justify-content-between align-items-center mt-3 mb-4">
                <div className="col-auto">
                    <div className="custom-dropdown ms-4">
                        <select value={selectedStatus} onChange={handleStatusChange} className="status-dropdown-style">
                            <option value="" hidden>
                                Status
                            </option>
                            <option value="">All</option>
                            <option value="Active">Active</option>
                            <option value="Paused">Paused</option>
                        </select>
                    </div>
                </div>
            </div>

            {responses.length > 0 ? (
                responses.map((response) => (
                    <ResponseCard
                        key={response._id}
                        color={response.status === 'Paused' ? '#FCEB9F' : '#D9F9E6'}
                        color2={response.status === 'Paused' ? '#C8811A' : '#2F9461'}
                        status={response.status}
                        email={response.AnsweredBy.email}
                        ID={response._id}
                        date={response.createdAt}
                    />
                ))
            ) : (
                <div className="text-center">
                    <img
                        src={NothingFound}
                        alt="NothingFound"
                        className="img-fluid mb-4"
                        style={{ maxWidth: '300px' }}
                    />
                    <h1 className="display-4" style={{ fontWeight: "600" }}> No responses match the selected status</h1>
                    <p className="lead" style={{ fontWeight: "600" }}>Please try a different status or form</p>

                    <button
                        className='takemeback'
                        onClick={() => navigate(-1)}
                    >
                        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024">
                            <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
                        </svg>
                        <span>Back</span>
                    </button>
                </div>
            )}

            <div className="d-flex justify-content-center mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default Responses;
