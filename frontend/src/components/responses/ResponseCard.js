import './ResponseCard.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';

const ResponseCard = (props) => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(props.status);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/DeleteAnswer`, {
                params: {
                    formId: props.ID,
                    formOwnerId: auth.userInfo._id
                }
            });
            console.log('Delete Success:', response.data);
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    const handleSave = () => {
        console.log(props.ID, selectedStatus);
        setShowModal(false);
    };

    return (
        <>
            <div className="w-100 d-flex justify-content-between align-items-center rounded-2 p-2 bg-white m-2"
                style={{ border: "1px solid #E9EFF4", height: "60px" }}>
                <div className="col-1 h-100">
                    <div className="d-flex justify-content-center align-items-center rounded-1 h-100 w-100"
                        style={{ backgroundColor: props.color, color: props.color2 }}>
                        <span style={{ fontWeight: "bold" }}>{props.status}</span>
                    </div>
                </div>

                <div className="col-2">
                    <p className="mb-0 text-black">{props.email}</p>
                </div>
                <div className="col-2">
                    <p className="mb-0 text-black">{props.ID}</p>
                </div>
                <div className="col-1">
                    <p className="mb-0 text-black">{props.date}</p>
                </div>
                <div className="col-2 d-flex justify-content-around">
                    <button className="btn rounded-circle" style={{ backgroundColor: "#ADABAB" }} onClick={() => setShowModal(true)}>
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn rounded-circle" style={{ backgroundColor: "#ADABAB" }} onClick={() => navigate(`/view/${props.ID}`)}>
                        <i className="bi bi-eye"></i>
                    </button>
                    <button className="btn rounded-circle" style={{ color: "red", backgroundColor: "rgba(255, 0, 0, 0.2)" }} onClick={handleDelete}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>

            {showModal && (
                <>
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Status</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <select className="form-select" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                        <option value="Active">Active</option>
                                        <option value="Paused">Paused</option>
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}
        </>
    );
};

export default ResponseCard;
