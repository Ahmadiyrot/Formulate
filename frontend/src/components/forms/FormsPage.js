import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Form from "./Form";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import FilterCard from "../responses/FilterCard";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FormsPage = () => {
    const { auth } = useAuth();
    const ownerId = auth.userInfo._id;
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const formsPerPage = 9;
    const navigate = useNavigate();

    const [filterData, setFilterData] = useState({
        SearchQuery: null,
        Date: null,
        Status: null,
        Pinned: null,
    });

    const handleFilterApply = (newFilterData) => {
        setFilterData(newFilterData);
        setPage(1);
    };

    useEffect(() => {
        const fetchForms = async () => {
            setLoading(true);
            try {
                const skip = (page - 1) * formsPerPage;

                const params = {
                    skip,
                    limit: formsPerPage,
                };

                if (filterData.SearchQuery) {
                    params.search = filterData.SearchQuery;
                }

                if (filterData.Date) {
                    params.date = filterData.Date;
                }

                if (filterData.Status) {
                    params.status = filterData.Status;
                }

                if (filterData.Pinned) {
                    params.pinned = filterData.Pinned;
                }
                const response = await axios.get(`/forms/${ownerId}`, { params });

                if (response.data.forms) {
                    setForms(response.data.forms);
                    setTotalPages(Math.ceil(response.data.total / formsPerPage));
                } else {
                    setForms([]);
                    setTotalPages(1);
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setForms([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };
        fetchForms();
    }, [page, ownerId, filterData]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-10">
                    <div className="row d-flex justify-content-center">
                        <button className="create-form-button" onClick={() => navigate('/createform')}>
                            Create Form
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>
                        </button>
                    </div>

                    <div className="d-flex flex-wrap justify-content-center">
                        {loading ? (

                            Array.from({ length: formsPerPage }).map((_, index) => (
                                <div key={index} style={{ width: "300px", margin: "10px" }}>
                                    <div className="bg-white container p-3" style={{ maxWidth: "400px", borderRadius: "15px" }}>
                                        <div className="row d-flex justify-content-between align-items-center p-1 mb-2">
                                            <Skeleton width={150} height={20} />
                                            <div className="text-end"><Skeleton width={50} height={50} /></div>
                                        </div>

                                        <div className="row d-flex justify-content-center p-1 mb-2">
                                            <Skeleton width={200} height={15} />
                                        </div>

                                        <div className="row">
                                            <div className="col-8 d-flex align-items-center">
                                                <Skeleton height={40} width={120} />
                                            </div>
                                            <div className="col-4 d-flex align-items-center justify-content-end">
                                                <Skeleton height={30} width={50} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : forms.length > 0 ? (
                            forms.map((form) => (
                                <div key={form._id} style={{ width: "300px", margin: "10px" }}>
                                    <Form
                                        formName={form.formName}
                                        date={form.createdAt}
                                        color={form.status === 'Paused' ? '#FCEB9F' : '#D9F9E6'}
                                        status={form.status}
                                        color2={form.status === 'Paused' ? '#C8811A' : '#2F9461'}
                                        id={form._id}
                                        deleted={false}
                                        button={true}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "200px" }}>
                                <p style={{ fontSize: "1.5em", fontWeight: "bold", color: "grey" }}>
                                    No forms found
                                </p>
                                <button onClick={() => navigate('/CreateForm')} className="btn btn-primary mt-2 rounded-5">
                                    Create a New Form
                                </button>
                            </div>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4">
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
                <div className="col-2">
                    <FilterCard onApply={handleFilterApply} />
                </div>
            </div>
        </div>
    );
};

export default FormsPage;
