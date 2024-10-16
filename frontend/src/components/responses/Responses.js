import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResponseCard from './ResponseCard';
import axios from '../../api/axios';
import './Responses.css'

const Responses = () => {
    const { id } = useParams();
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(''); // For dropdown

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/responses/${id}`);
                console.log(res.data);
                setResponses(res.data);
            } catch (err) {
                setError(err.response ? err.response.data.error : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResponses();
    }, [id]);

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container-fluid col-8 pt-5">
            <h3 style={{ color: "#FFBF00", fontWeight: "bold" }}>
                {responses.length > 0 ? responses[0]?.formId?.formName : 'Form'}
            </h3>

            <div className="row justify-content-between align-items-center mt-3 mb-4">
                <div className="col-auto">
                    <div className="custom-dropdown ms-4">
                        <select value={selectedStatus} onChange={handleStatusChange} className="status-dropdown">
                            <option value="" hidden>
                                Status
                            </option>
                            <option value="Active">Active</option>
                            <option value="Paused">Paused</option>
                        </select>
                    </div>
                </div>

            </div>

            {responses.map((response) => (
                <ResponseCard
                    key={response._id}
                    color={response.status === 'Paused' ? '#FCEB9F' : '#D9F9E6'}
                    color2={response.status === 'Paused' ? '#C8811A' : '#2F9461'}
                    status={response.status}
                    email={response.AnsweredBy.email}
                    ID={response._id}
                    date={response.createdAt}
                />
            ))}
        </div>

    );
};

export default Responses;
