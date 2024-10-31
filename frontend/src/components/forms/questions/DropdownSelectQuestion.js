import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';

const DropdownSelectQuestion = ({
    inputValue,
    setInputValue,
    options,
    setOptions,
    isPreview
}) => {
    const [showModal, setShowModal] = useState(false);
    const [newOption, setNewOption] = useState('');

    const handleCloseModal = () => {
        setShowModal(false);
        setNewOption('');
    };
    const handleShowModal = () => setShowModal(true);

    const handleAddOption = () => {
        const trimmedOption = newOption.trim();
        if (trimmedOption && options.length < 4) {
            setOptions([...options, trimmedOption]);
            handleCloseModal();
        }
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
    };

    const handleClearQuestion = () => {
        setInputValue('');
    };

    if (isPreview) {
        return (
            <div
                className="w-100 mt-2 mb-2 d-flex flex-column row-gap-2 rounded-3"
                style={{
                    backgroundColor: '#fff',
                    padding: '15px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                }}
            >
                <div className="mb-3">
                    <strong>{inputValue || 'Dropdown Select Question'}</strong>
                </div>

                <ul className="list-group">
                    {options.length > 0 ? (
                        options.map((option, index) => (
                            <li key={index} className="list-group-item">
                                {option || `Option ${index + 1}`}
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item text-muted">No options added</li>
                    )}
                </ul>
            </div>
        );
    }

    return (
        <div
            className="w-100 mt-2 mb-2 d-flex flex-column row-gap-2 rounded-3"
            style={{
                backgroundColor: '#fff',
                padding: '15px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }}
        >
            <div className="position-relative mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your question here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                {inputValue && (
                    <FaTimes
                        className="position-absolute text-muted"
                        style={{
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer'
                        }}
                        onClick={handleClearQuestion}
                        title="Clear Question"
                    />
                )}
            </div>

            <ul className="list-group mb-3">
                {options.map((option, index) => (
                    <li
                        key={index}
                        className="list-group-item d-flex align-items-center justify-content-between"
                    >
                        <Form.Control
                            type="text"
                            className="me-2"
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => {
                                const updatedOptions = options.map((opt, i) =>
                                    i === index ? e.target.value : opt
                                );
                                setOptions(updatedOptions);
                            }}
                            style={{ height: '40px', resize: 'none' }}
                            maxLength={100} 
                        />
                        <FaTimes
                            className="text-danger"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleRemoveOption(index)}
                            title="Remove Option"
                        />
                    </li>
                ))}
            </ul>

            {options.length < 4 && (
                <button
                    type="button"
                    className="btn btn-outline-primary align-self-start"
                    onClick={handleShowModal}
                    disabled={options.some((option) => option.trim() === '')}
                    title="Add a new option"
                >
                    Add Option
                </button>
            )}

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Option</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNewOption">
                            <Form.Label>Option Text</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={`Enter option ${options.length + 1}`}
                                value={newOption}
                                onChange={(e) => setNewOption(e.target.value)}
                                maxLength={100} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleAddOption}
                        disabled={newOption.trim() === ''}
                    >
                        Add Option
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DropdownSelectQuestion;
