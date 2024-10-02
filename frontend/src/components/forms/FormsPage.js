import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Form from "./Form";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const FormsPage = () => {
    const { auth } = useAuth();
    const ownerId = auth.userInfo._id; // Get the ownerId from logged-in user's info
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // Current page number
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const formsPerPage = 9; // Show 9 forms per page
    const navigate = useNavigate();

    useEffect(() => {
        const fetchForms = async () => {
            setLoading(true);
            try {
                const skip = (page - 1) * formsPerPage;
                const response = await axios.get(`/forms/${ownerId}?skip=${skip}&limit=${formsPerPage}`);

                if (response.data.forms) {
                    setForms(response.data.forms);
                    setTotalPages(Math.ceil(response.data.total / formsPerPage));
                } else {
                    setForms([]);
                }
            } catch (err) {
                setError(err.message);
                setForms([]);
            } finally {
                setLoading(false);
            }
        };

        fetchForms();
    }, [page, ownerId]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-9">
                    <div className="row d-flex justify-content-center">
                        <button className="create-form-button" onClick={() => navigate('/createform')}>
                            Create Form
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>
                        </button>
                    </div>

                    <div className="d-flex flex-wrap justify-content-center">
                        {forms.length > 0 ? (
                            forms.map((form) => (
                                <div key={form._id} style={{ width: "300px", margin: "10px" }}>
                                    <Form
                                        formName={form.formName}
                                        date={form.createdAt}
                                        color={form.status === 'paused' ? '#FDE9E9' : '#D9F9E6'}
                                        status={form.status}
                                        color2={form.status === 'paused' ? '#CD3636' : '#2F9461'}
                                        id={form._id}
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

                    {/* Pagination Component */}
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
                <div className="col-3">
                    <div className="p-3 border bg-light">Small Column</div>
                </div>
            </div>
        </div>
    );
};

export default FormsPage;
