import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Form from "./Form";
import axios from "../../api/axios";
import Pagination from "./Pagination";

const DeletedTab = () => {
    const { auth } = useAuth();
    const ownerId = auth.userInfo._id;
    const [drafts, setDrafts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const draftsPerPage = 9;

    useEffect(() => {
        const fetchDrafts = async () => {
            setLoading(true);
            try {
                const skip = (page - 1) * draftsPerPage;
                const response = await axios.get(`/GetDeleted/${ownerId}?skip=${skip}&limit=${draftsPerPage}`);
                if (response.data.drafts) {
                    setDrafts(response.data.drafts);
                    setTotalPages(Math.ceil(response.data.total / draftsPerPage));
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
                    <div className="d-flex flex-wrap justify-content-center">
                        {drafts.length > 0 ? (
                            drafts.map((form) => (
                                <div key={form._id} style={{ width: "300px", margin: "10px" }}>
                                    <Form
                                        formName={form.formName}
                                        date={form.createdAt}
                                        color="#FDE9E9"
                                        status={form.status}
                                        color2="#CD3636"
                                        id={form._id}
                                        deleted={true}
                                        button={false}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "200px" }}>
                                <p style={{ fontSize: "1.5em", fontWeight: "bold", color: "grey" }}>
                                    No drafts found
                                </p>
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

export default DeletedTab;
