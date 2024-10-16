import React, { useState } from 'react';
import './Forms.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { Modal, Button, Dropdown, DropdownButton } from 'react-bootstrap';

const Form = (props) => {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
    const [showPinModal, setShowPinModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(props.status);
    const [isPinned, setIsPinned] = useState(props.pinned);

    const handleOptionSelect = (eventKey) => {
        if (eventKey === 'changeStatus') {
            setSelectedStatus(props.status);
            setShowChangeStatusModal(true);
        } else if (eventKey === 'delete') {
            setShowDeleteModal(true);
        } else if (eventKey === 'pin') {
            setShowPinModal(true);
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.patch(`/ChangeFormStatus/${props.id}`, {
                status: "Disabled"
            });
            window.location.reload();
        } catch (error) {
            console.error('Error deleting:', error);
        }
        setShowDeleteModal(false);
    };

    const saveStatus = async () => {
        try {
            await axios.patch(`/ChangeFormStatus/${props.id}`, {
                status: selectedStatus
            });
            window.location.reload();
        } catch (error) {
            console.error('Error saving status:', error);
        }
        setShowChangeStatusModal(false);
    };

    const confirmPin = async () => {
        try {
            await axios.patch(`/ChangePinStatus/${props.id}`, {
                pinned: !isPinned
            });
            setIsPinned(!isPinned);
        } catch (error) {
            console.error('Error updating pin status:', error);
        }
        setShowPinModal(false);
    };

    const handleAddQuestions = () => {
        navigate(`/AddElements/${props.id}`);
    };

    return (
        <div>
            <div className="bg-white container p-3" style={{ maxWidth: "400px", borderRadius: "15px" }}>
                <div className="row d-flex justify-content-between align-items-center p-1 mb-2">
                    <div className='col'>
                        <p style={{ fontWeight: "bold" }}>{props.formName}</p>
                    </div>

                    {!props.deleted && (
                        <div className='col-3 d-flex justify-content-end flex-column'>
                            <DropdownButton
                                align="end"
                                variant="light"
                                onSelect={handleOptionSelect}
                                title=''
                            >
                                <Dropdown.Item eventKey="changeStatus">Change Status</Dropdown.Item>
                                <Dropdown.Item eventKey="delete">Delete</Dropdown.Item>
                                <Dropdown.Item eventKey="pin">{isPinned ? 'Unpin' : 'Pin'}</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    )}
                </div>

                <div className="row d-flex justify-content-center p-1 mb-2">
                    <small style={{ fontSize: "0.7em", color: "grey" }}>
                        <span style={{ fontWeight: "bold" }}>Date created:</span> {props.date}
                    </small>
                </div>

                <div className="row">
                    <div className="col-8 d-flex align-items-center">
                        {props.addelements ? (
                            <Button onClick={handleAddQuestions} className="w-100 rounded-5 responsesButton">
                                Add questions
                            </Button>
                        ) : props.button ? (
                            <Button onClick={() => navigate(`/Responses/${props.id}`)} className="w-100 rounded-5 responsesButton">
                                View responses
                            </Button>
                        ) : (
                            <Button onClick={() => console.log('Retrieve action triggered', props.id)} className="w-100 rounded-5 responsesButton">
                                Retrieve
                            </Button>
                        )}
                    </div>
                    <div className="col-4 d-flex align-items-center justify-content-end">
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center rounded-2" style={{ backgroundColor: props.color, color: props.color2, width: props.cardwidth }}>
                            <span>{props.status}</span>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this form?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showChangeStatusModal} onHide={() => setShowChangeStatusModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="form-select"
                    >
                        <option value="Active">Active</option>
                        <option value="Paused">Paused</option>
                        <option value="Disabled">Disabled</option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowChangeStatusModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={saveStatus}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showPinModal} onHide={() => setShowPinModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isPinned ? 'Unpin' : 'Pin'} Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to {isPinned ? 'unpin' : 'pin'} this form?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPinModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmPin}>
                        Yes, {isPinned ? 'Unpin' : 'Pin'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Form;
