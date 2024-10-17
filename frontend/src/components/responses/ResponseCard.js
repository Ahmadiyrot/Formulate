import React, { useState, useEffect } from 'react';
import './ResponseCard.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { Modal, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ResponseCard = (props) => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(props.status);

    const handleDelete = async () => {
        try {
            await axios.delete(`/DeleteAnswer`, {
                params: {
                    formId: props.ID,
                    formOwnerId: auth.userInfo._id
                }
            });
            toast.success('Deleted successfully');
        } catch (error) {
            console.error('Error deleting:', error);
            toast.error('Failed to delete');
        }
    };

    const handleSave = () => {
        axios.patch(`/ChangeStatus/${props.ID}`, { status: selectedStatus })
            .then(response => {
                toast.success('Status updated successfully');
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error updating status:', error);
                toast.error('Failed to update status');
            });
    };

    const renderTooltip = (props, message) => (
        <Tooltip id="button-tooltip" {...props}>
            {message}
        </Tooltip>
    );

    return (
        <>
            <div className="container-fluid w-100 p-2 bg-white m-2 rounded-2"
                style={{ border: "1px solid #E9EFF4" }}>
                <div className="row align-items-center justify-content-center">

                    <div className="col-12 col-sm-6 col-md-2 mb-2 mb-md-0 d-flex justify-content-center align-items-center p-2"
                        style={{ backgroundColor: props.color, color: props.color2, borderRadius: '8px', width: '65px' }}>
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={(overlayProps) => renderTooltip(overlayProps, "Status of the answer")}
                        >
                            <span style={{ fontWeight: "bold" }}>{props.status}</span>
                        </OverlayTrigger>
                    </div>

                    <div className="col-12 col-sm-6 col-md-3 mb-2 mb-md-0 text-center text-md-left">
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={(overlayProps) => renderTooltip(overlayProps, "Person who answered")}
                        >
                            <p className="mb-0 text-black">{props.email}</p>
                        </OverlayTrigger>
                    </div>

                    <div className="col-12 col-sm-6 col-md-3 mb-2 mb-md-0 text-center text-md-left">
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={(overlayProps) => renderTooltip(overlayProps, "ID of the answer")}
                        >
                            <p className="mb-0 text-black">{props.ID}</p>
                        </OverlayTrigger>
                    </div>

                    <div className="col-12 col-sm-6 col-md-2 mb-2 mb-md-0 text-center text-md-left">
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={(overlayProps) => renderTooltip(overlayProps, "Date created")}
                        >
                            <p className="mb-0 text-black">{props.date}</p>
                        </OverlayTrigger>
                    </div>

                    <div className="col-12 col-md-2 d-flex justify-content-center justify-content-md-around p-1">
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={(overlayProps) => renderTooltip(overlayProps, "Edit Status")}
                        >
                            <Button variant="light" className="rounded-circle m-1" onClick={() => setShowModal(true)}>
                                <i className="bi bi-pencil"></i>
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={(overlayProps) => renderTooltip(overlayProps, "View Answer")}
                        >
                            <Button variant="light" className="rounded-circle m-1" onClick={() => navigate(`/view/${props.ID}`)}>
                                <i className="bi bi-eye"></i>
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={(overlayProps) => renderTooltip(overlayProps, "Delete Answer")}
                        >
                            <Button variant="danger" className="rounded-circle m-1" onClick={handleDelete}>
                                <i className="bi bi-trash"></i>
                            </Button>
                        </OverlayTrigger>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <select className="form-select" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                        <option value="Active">Active</option>
                        <option value="Paused">Paused</option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ResponseCard;
