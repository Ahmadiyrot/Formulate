import React, { useState } from 'react';
import './Forms.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { Modal, Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';

const FormComp = (props) => {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
    const [showPinModal, setShowPinModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(props.status);
    const [isPinned, setIsPinned] = useState(props.pinned);
    const [shareLink, setShareLink] = useState('');

    const handleOptionSelect = (eventKey) => {
        if (eventKey === 'changeStatus') {
            setSelectedStatus(props.status);
            setShowChangeStatusModal(true);
        } else if (eventKey === 'delete') {
            setShowDeleteModal(true);
        } else if (eventKey === 'pin') {
            setShowPinModal(true);
        } else if (eventKey === 'share') {
            const link = `${window.location.origin}/AnswerForm/${props.id}`;
            setShareLink(link);
            setShowShareModal(true);
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

    const handleRetrieveForm = async (id) => {
        try {
            const response = await axios.patch(`/RetrieveForm/${id}`);
            toast.success("Form Retrieved Successfully");
            await new Promise(resolve => setTimeout(resolve, 2000));
            window.location.reload();
        } catch (error) {
            console.error('Error retrieving the form:', error.response?.data || error.message);
        }
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
                                <Dropdown.Item eventKey="share">Share</Dropdown.Item>
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
                            <Button onClick={() => handleRetrieveForm(props.id)} className="w-100 rounded-5 responsesButton">
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

            {/* Delete Confirmation Modal */}
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

            {/* Change Status Modal */}
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

            {/* Pin/Unpin Modal */}
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

            {/* Share Modal */}
            <Modal show={showShareModal} onHide={() => setShowShareModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Share Your Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>You can share your form using the links below:</p>
                    <Form.Group className="mb-3">
                        <Form.Label>Form Link:</Form.Label>
                        <div className="input-group">
                            <Form.Control type="text" value={shareLink} readOnly />
                            <Button
                                variant="outline-secondary"
                                onClick={() => {
                                    navigator.clipboard.writeText(shareLink);
                                    toast.success('Link copied to clipboard!');
                                }}
                            >
                                {/* Clipboard Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                                </svg>
                            </Button>
                        </div>
                    </Form.Group>
                    <div className="d-flex justify-content-around">
                        {/* WhatsApp Share */}
                        <button className="whatsapp-btn"
                            style={{ backgroundColor: "#00d757" }}
                            variant="success"
                            onClick={() => {
                                const whatsappURL = `https://wa.me/?text=${encodeURIComponent(shareLink)}`;
                                window.open(whatsappURL, '_blank');
                            }}
                        >
                            <div className="whatsapp-sign">
                                <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                </svg>
                            </div>
                        </button>


                        {/* Email Share */}
                        <button
                            className="whatsapp-btn text-black"
                            style={{ backgroundColor: "#000" }}
                            variant="primary"
                            onClick={() => {
                                const subject = encodeURIComponent('Check out this form');
                                const body = encodeURIComponent(`I would like you to answer this form: ${shareLink}`);
                                const mailtoURL = `mailto:?subject=${subject}&body=${body}`;
                                window.open(mailtoURL, '_blank');
                            }}
                        >
                            <div className="whatsapp-sign" style={{ color: "white" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="52 42 88 66">
                                    <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
                                    <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
                                    <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
                                    <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
                                    <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowShareModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FormComp;
