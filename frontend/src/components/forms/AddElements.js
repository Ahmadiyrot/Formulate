import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useParams, useNavigate } from 'react-router-dom';
import DraggableLibrary from './questions/DraggableLibrary.js';
import DroppableFormArea from './questions/DroppableFormArea.js';
import TextAreaQ from './questions/TextAreaQ.js';
import RatingQ from './questions/RatingQ.js';
import QWithImg from './questions/QWithImg.js';
import QTrueOrFalse from './questions/QTrueOrFalse.js';
import QWithColorPicker from './questions/QWithColorPicker.js';
import QWithTextAndImgAns from './questions/QWithTextAndImgAns.js';
import QWithImgAnswer from './questions/QWithImgAnswer.js';
import QWithMultiAnswer from './questions/QWithMultiAnswer.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { storage } from '../../firebaseConfig.js';
import { ref, uploadBytes } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import axios from '../../api/axios.js';
import { toast } from 'react-hot-toast';
import './Forms.css';
import DropdownSelectQuestion from './questions/DropdownSelectQuestion.js';

import { Modal, Button, Form } from 'react-bootstrap';
import PickAnswerQuestion from './questions/PickAnswerQuestion.js';

const AddElements = () => {
    const [formElements, setFormElements] = useState([]);
    const [finalFormData, setFinalFormData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [shareLink, setShareLink] = useState('');

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleOnDragEnd = (result) => {
        setIsDisabled(false);
        const { destination, source } = result;

        if (!destination) {
            return;
        }
        if (
            source.droppableId === destination.droppableId &&
            destination.droppableId === 'droppable-area'
        ) {
            const reorderedElements = Array.from(formElements);
            const [movedElement] = reorderedElements.splice(source.index, 1);
            reorderedElements.splice(destination.index, 0, movedElement);
            setFormElements(reorderedElements);
        } else if (destination.droppableId === 'droppable-area') {
            const draggableId = result.draggableId;
            if (draggableId === 'TextAreaQ') {
                setFormElements((prev) => [
                    ...prev,
                    { id: `TextAreaQ-${Date.now()}`, type: 'TextAreaQ', inputValue: '' },
                ]);
            } else if (draggableId === 'RatingQ') {
                setFormElements((prev) => [
                    ...prev,
                    { id: `RatingQ-${Date.now()}`, type: 'RatingQ', inputValue: '' },
                ]);
            } else if (draggableId === 'QWithImg') {
                setFormElements((prev) => [
                    ...prev,
                    {
                        id: `QWithImg-${Date.now()}`,
                        type: 'QWithImg',
                        inputValue: '',
                        uploadedFile: null,
                    },
                ]);
            } else if (draggableId === 'QTrueOrFalse') {
                setFormElements((prev) => [
                    ...prev,
                    { id: `QTrueOrFalse-${Date.now()}`, type: 'QTrueOrFalse', inputValue: '' },
                ]);
            } else if (draggableId === 'QWithColorPicker') {
                setFormElements((prev) => [
                    ...prev,
                    { id: `QWithColorPicker-${Date.now()}`, type: 'QWithColorPicker', inputValue: '' },
                ]);
            } else if (draggableId === 'QWithTextAndImgAns') {
                setFormElements((prev) => [
                    ...prev,
                    { id: `QWithTextAndImgAns-${Date.now()}`, type: 'QWithTextAndImgAns', inputValue: '' },
                ]);
            } else if (draggableId === 'QWithImgAnswer') {
                setFormElements((prev) => [
                    ...prev,
                    { id: `QWithImgAnswer-${Date.now()}`, type: 'QWithImgAnswer', inputValue: '' },
                ]);
            } else if (draggableId === 'QWithMultiAnswer') {
                setFormElements((prev) => [
                    ...prev,
                    { id: `QWithMultiAnswer-${Date.now()}`, type: 'QWithMultiAnswer', inputValue: '' },
                ]);
            } else if (draggableId === 'PickAnswerQuestion') {
                setFormElements((prev) => [
                    ...prev,
                    {
                        id: `PickAnswerQuestion-${Date.now()}`,
                        type: 'PickAnswerQuestion',
                        inputValue: '',
                        answers: [''],
                    },
                ]);
            } else if (draggableId === 'DropdownSelectQuestion') { 
                setFormElements((prev) => [
                    ...prev,
                    {
                        id: `DropdownSelectQuestion-${Date.now()}`,
                        type: 'DropdownSelectQuestion',
                        inputValue: '',
                        options: [],
                    },
                ]);
            }
        }
    };

    const handleRemoveElement = (id) => {
        setFormElements((prev) => prev.filter((element) => element.id !== id));
    };

    const handleInputChange = (id, newValue) => {
        setIsDisabled(false);
        setFormElements((prev) =>
            prev.map((element) =>
                element.id === id ? { ...element, inputValue: newValue } : element
            )
        );
    };

    const handleAnswersChange = (id, newAnswers) => {
        setFormElements((prev) =>
            prev.map((element) =>
                element.id === id ? { ...element, answers: newAnswers } : element
            )
        );
    };

    const handleFileChange = (id, newFile) => {
        setFormElements((prev) =>
            prev.map((element) =>
                element.id === id ? { ...element, uploadedFile: newFile } : element
            )
        );
    };

    const handleOptionsChange = (id, newOptions) => {
        setFormElements((prev) =>
            prev.map((element) =>
                element.id === id ? { ...element, options: newOptions } : element
            )
        );
    };

    const renderFormElement = (element) => {
        switch (element.type) {
            case 'TextAreaQ':
                return (
                    <TextAreaQ
                        inputValue={element.inputValue}
                        setInputValue={(value) => handleInputChange(element.id, value)}
                    />
                );
            case 'RatingQ':
                return (
                    <RatingQ
                        inputValue={element.inputValue}
                        setInputValue={(value) => handleInputChange(element.id, value)}
                    />
                );
            case 'QWithImg':
                return (
                    <QWithImg
                        inputValue={element.inputValue}
                        setInputValue={(value) => handleInputChange(element.id, value)}
                        uploadedFile={element.uploadedFile}
                        setUploadedFile={(file) => handleFileChange(element.id, file)}
                        dropzoneEnabled={true}
                    />
                );
            case 'QTrueOrFalse':
                return (
                    <QTrueOrFalse
                        inputValue={element.inputValue}
                        setInputValue={(value) => handleInputChange(element.id, value)}
                    />
                );
            case 'QWithColorPicker':
                return (
                    <QWithColorPicker
                        inputValue={element.inputValue}
                        setInputValue={(value) => handleInputChange(element.id, value)}
                    />
                );
            case 'QWithTextAndImgAns':
                return (
                    <QWithTextAndImgAns
                        inputValue={element.inputValue}
                        setInputValue={(value) => handleInputChange(element.id, value)}
                    />
                );
            case 'QWithImgAnswer':
                return (
                    <QWithImgAnswer
                        inputValue={element.inputValue}
                        setInputValue={(value) => handleInputChange(element.id, value)}
                    />
                );
            case 'QWithMultiAnswer':
                return (
                    <QWithMultiAnswer
                        inputValue={element.inputValue}
                        setInputValue={(value) => handleInputChange(element.id, value)}
                        readOnly={false}
                    />
                );
            case 'PickAnswerQuestion':
                return (
                    <PickAnswerQuestion
                        inputValue={element.inputValue}
                        setInputValue={(value) => handleInputChange(element.id, value)}
                        answers={element.answers}
                        setAnswers={(newAnswers) => handleAnswersChange(element.id, newAnswers)}
                    />
                );
            case 'DropdownSelectQuestion':
                return (
                    <DropdownSelectQuestion
                        inputValue={element.inputValue}
                        setInputValue={(value) => handleInputChange(element.id, value)}
                        options={element.options || []}
                        setOptions={(newOptions) => handleOptionsChange(element.id, newOptions)}
                        isPreview={false}
                    />
                );
            default:
                return null;
        }
    };

    const handleFileUpload = async (file) => {
        if (!file) return;

        const fileRef = ref(storage, `${id}/${file.name}`);
        await uploadBytes(fileRef, file);
        try {
            const downloadURL = await getDownloadURL(fileRef);
            return downloadURL;
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleFormSubmit = async () => {
        const mappedQuestions = await Promise.all(
            formElements.map(async (element) => {
                const uploadedFileUrl = await handleFileUpload(element.uploadedFile);
                const questionData = {
                    type: element.type,
                    inputValue: element.inputValue,
                    ...(element.options && { options: element.options }),
                    ...(element.answers && { answers: element.answers }),
                    ...(uploadedFileUrl && { uploadedFileUrl }),
                };
                return questionData;
            })
        );

        const newData = { questions: mappedQuestions };

        try {
            const response = await axios.patch(`/AddQuestions/${id}`, newData);
            toast.success('Form was updated successfully');
            setIsDisabled(true);

            const websiteURL = window.location.origin;
            const formId = response.data.form._id;
            const link = `${websiteURL}/AnswerForm/${formId}`;
            setShareLink(link);

            setShowModal(true);
        } catch (error) {
            console.error('Error updating form:', error);
            toast.error(
                'Error updating form: ' + (error.response?.data?.message || error.message)
            );
        }
    };

    return (
        <>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className="container-fluid d-flex flex-column">
                    <div className="row d-flex justify-content-center">
                        <div className="col-6 d-flex justify-content-center">
                            <DroppableFormArea
                                formElements={formElements}
                                handleRemoveElement={handleRemoveElement}
                                renderFormElement={renderFormElement}
                            />
                        </div>
                        <div
                            className="col-6 d-flex justify-content-center align-content-center flex-wrap"
                            style={{ height: '90vh' }}
                        >
                            <div
                                className="overflow-x-hidden p-1 rounded-2"
                                style={{
                                    width: '70%',
                                    height: '85vh',
                                    backgroundColor: '#acacac87',
                                    borderStyle: 'dashed',
                                    borderColor: '#acacac87',
                                    overflowY: 'scroll',
                                    position: 'relative',
                                }}
                            >
                                <DraggableLibrary />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex mt-4 justify-content-center">
                        <button
                            onClick={handleFormSubmit}
                            className="btn btn-primary m-3"
                            style={{ padding: '10px 20px' }}
                            disabled={isDisabled}
                        >
                            Submit Form
                        </button>
                    </div>
                </div>
            </DragDropContext>

            <Modal show={showModal} onHide={handleCloseModal} centered>
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-clipboard"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                                </svg>
                            </Button>
                        </div>
                    </Form.Group>
                    <div className="d-flex justify-content-around">
                        <button
                            className="whatsapp-btn"
                            style={{ backgroundColor: '#00d757' }}
                            onClick={() => {
                                const whatsappURL = `https://wa.me/?text=${encodeURIComponent(
                                    shareLink
                                )}`;
                                window.open(whatsappURL, '_blank');
                            }}
                        >
                            <div className="whatsapp-sign">
                                <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                </svg>
                            </div>
                        </button>

                        <button
                            className="whatsapp-btn text-black"
                            style={{ backgroundColor: '#000' }}
                            onClick={() => {
                                const subject = encodeURIComponent('Check out this form');
                                const body = encodeURIComponent(
                                    `I would like you to answer this form: ${shareLink}`
                                );
                                const mailtoURL = `mailto:?subject=${subject}&body=${body}`;
                                window.open(mailtoURL, '_blank');
                            }}
                        >
                            <div className="whatsapp-sign" style={{ color: 'white' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="52 42 88 66">
                                    <path
                                        fill="#4285f4"
                                        d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"
                                    />
                                    <path
                                        fill="#34a853"
                                        d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"
                                    />
                                    <path
                                        fill="#fbbc04"
                                        d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"
                                    />
                                    <path
                                        fill="#ea4335"
                                        d="M72 74V48l24 18 24-18v26L96 92"
                                    />
                                    <path
                                        fill="#c5221f"
                                        d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"
                                    />
                                </svg>
                            </div>
                        </button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="btn btn-danger"
                        onClick={() => {
                            setShowModal(false);
                            navigate('/tabspage');
                        }}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddElements;
