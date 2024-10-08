import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Form from "./Form";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const DraftTab = () => {
    const { auth } = useAuth();
    const ownerId = auth.userInfo._id;
    const [drafts, setDrafts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const draftsPerPage = 9;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDrafts = async () => {
            setLoading(true);
            try {
                const skip = (page - 1) * draftsPerPage;
                const response = await axios.get(`/GetDrafts/${ownerId}?skip=${skip}&limit=${draftsPerPage}`);
                console.log(response);
                if (response.data) {
                    setDrafts(response.data.forms);
                    setTotalPages(Math.ceil(response.data.total / draftsPerPage));
                    console.log('hello')
                } else {
                    setDrafts([]);
                }
            } catch (err) {
                setError(err.message);
                setDrafts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDrafts();
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
                            Create Draft
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>
                        </button>
                    </div>

                    <div className="d-flex flex-wrap justify-content-center">
                        {drafts.length > 0 ? (
                            drafts.map((draft) => (
                                <div key={draft._id} style={{ width: "300px", margin: "10px" }}>
                                    <Form
                                        formName={draft.formName}
                                        date={draft.createdAt}
                                        color={draft.status === 'Paused' ? '#FCEB9F' : '#D9F9E6'}
                                        status={draft.status}
                                        color2={draft.status === 'Paused' ? '#C8811A' : '#2F9461'}
                                        id={draft._id}
                                        deleted={false}
                                        button={false}
                                        addelements={true}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "200px" }}>
                                <p style={{ fontSize: "1.5em", fontWeight: "bold", color: "grey" }}>
                                    No drafts found
                                </p>
                                <button onClick={() => navigate('/CreateForm')} className="btn btn-primary mt-2 rounded-5">
                                    Create a New Draft
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
                <div className="col-3">
                    <div className="p-3 border bg-light">Small Column</div>
                </div>
            </div>
        </div>
    );
};

export default DraftTab;
