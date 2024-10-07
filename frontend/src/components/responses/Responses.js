import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResponseCard from './ResponseCard';
import axios from '../../api/axios';


const Responses = () => {
    const { id } = useParams();
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchResponses = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/responses/${id}`);
                setResponses(res.data);
                console.log(res.data)
            } catch (err) {
                setError(err.response ? err.response.data.error : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResponses();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container-fluid col-8">
            <div className='text-white row d-flex justify-content-end'>
                <span className='col-2' style={{ marginRight: "25px" }}>Status</span>
                <span className='col-3' style={{ marginRight: "15px" }}>From</span>
                <span className='col-2' style={{ marginRight: "10px" }}>ID</span>
                <span className='col-2' style={{ marginRight: "10px" }}>Date Created</span>
                <span className='col-2 d-flex justify-content-between' style={{ marginRight: "5px" }}>
                    <span>Edit</span>
                    <span>View</span>
                    <span>Delete</span>
                </span>
            </div>
            {responses.map((response) => (
                <ResponseCard
                    key={response._id}
                    color="#D9F9E6"
                    color2="#2F9461"
                    status="active"
                    email={response.AnsweredBy.email}
                    ID={response._id}
                    date={response.createdAt}
                />
            ))}
        </div>
    );
};

export default Responses;
