import './Forms.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../api/axios';

const Form = (props) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(props.status);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionClick = (action) => {
        if (action === 'changeStatus') {
            setSelectedStatus(props.status);
            setShowChangeStatusModal(true);
        } else if (action === 'delete') {
            setShowDeleteModal(true);
        }
    };

    const confirmDelete = async () => {
        try {
            const response = await axios.delete(`/DeleteForm/${props.id}`);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting:', error);
        }
        setShowDeleteModal(false);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
    };

    const saveStatus = () => {
        console.log('Form ID:', props.id);
        console.log('Selected Status:', selectedStatus);
        // Here you would fetch to the backend
        setShowChangeStatusModal(false);
    };

    const cancelChangeStatus = () => {
        setShowChangeStatusModal(false);
    };

    return (
        <div>
            <div className="bg-white container p-3" style={{ maxWidth: "400px", borderRadius: "15px" }}>
                <div className="row d-flex justify-content-between align-items-center p-1 mb-2">
                    <div className='col'>
                        <p style={{ fontWeight: "bold" }}>{props.formName}</p>
                    </div>
                    <div className='col-3 d-flex justify-content-end flex-column'>
                        <div className="dropdown">
                            <button
                                className="btn"
                                type="button"
                                onClick={toggleDropdown}
                                aria-expanded={isDropdownOpen}
                                style={{ border: "none", background: "transparent" }}
                            >
                                <i className="bi bi-three-dots-vertical" />
                            </button>
                            <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} style={{ right: 0 }}>
                                <li>
                                    <button className="dropdown-item" onClick={() => handleOptionClick('changeStatus')}>Change Status</button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => handleOptionClick('delete')}>Delete</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="row d-flex justify-content-center p-1 mb-2">
                    <small style={{ fontSize: "0.7em", color: "grey" }}>
                        <span style={{ fontWeight: "bold" }}>Date created:</span> {props.date}
                    </small>
                </div>
                <div className="row">
                    <div className="col-8 d-flex align-items-center">
                        <button onClick={() => navigate(`/Responses/${props.id}`)} className="btn w-100 rounded-5 responsesButton">
                            View responses
                        </button>
                    </div>
                    <div className="col-4 d-flex align-items-center justify-content-end">
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center rounded-2" style={{ backgroundColor: props.color, color: props.color2, width: props.cardwidth }}>
                            <span>{props.status}</span>
                        </div>
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <div className="modal-overlay" style={{ zIndex: "10" }}>
                    <div className="modal-content">
                        <h5>Are you sure you want to delete this form?</h5>
                        <div className="d-flex justify-content-between mt-3">
                            <button className="btn btn-danger" onClick={confirmDelete}>Yes, Delete</button>
                            <button className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {showChangeStatusModal && (
                <div className="modal-overlay" style={{ zIndex: "10" }}>
                    <div className="modal-content">
                        <h5>Change Status</h5>
                        <div className="mt-3">
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="form-select"
                            >
                                <option value="Active">Active</option>
                                <option value="Paused">Paused</option>
                            </select>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <button className="btn btn-primary" onClick={saveStatus}>Save</button>
                            <button className="btn btn-secondary" onClick={cancelChangeStatus}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Form;
