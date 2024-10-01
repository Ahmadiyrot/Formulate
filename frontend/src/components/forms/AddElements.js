import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import DraggableLibrary from './questions/DraggableLibrary.js';
import DroppableFormArea from './questions/DroppableFormArea.js';
import TextAreaQ from './questions/TextAreaQ.js';
import RatingQ from './questions/RatingQ.js';
import QWithImg from './questions/QWithImg.js';
import QTrueOrFalse from './questions/QTrueOrFalse.js';
import QWithColorPicker from './questions/QWithColorPicker.js'
import QWithTextAndImgAnswer from './questions/QWithTextAndImgAnswer.js';
import QWithImgAnswer from './questions/QWithImgAnswer.js';
import QWithMultiAnswer from './questions/QWithMultiAnswer.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { storage } from '../../firebaseConfig.js';
import { ref, uploadBytes } from 'firebase/storage';
import { getDownloadURL } from "firebase/storage";
import axios from '../../api/axios.js';



const AddElements = () => {
    const [formElements, setFormElements] = useState([]);
    const [finalFormData, setFinalFormData] = useState({})
    const { id } = useParams();
    console.log(id)


    const handleOnDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && destination.droppableId === 'droppable-area') {
            const reorderedElements = Array.from(formElements);
            const [movedElement] = reorderedElements.splice(source.index, 1);
            reorderedElements.splice(destination.index, 0, movedElement);
            setFormElements(reorderedElements);
        } else if (destination.droppableId === 'droppable-area') {
            const draggableId = result.draggableId;

            if (draggableId === 'TextAreaQ') {
                setFormElements(prev => [
                    ...prev,
                    { id: `TextAreaQ-${Date.now()}`, type: 'TextAreaQ', inputValue: '' }
                ]);
            } else if (draggableId === 'RatingQ') {
                setFormElements(prev => [
                    ...prev,
                    { id: `RatingQ-${Date.now()}`, type: 'RatingQ', inputValue: '' }
                ]);
            } else if (draggableId === 'QWithImg') {
                setFormElements(prev => [
                    ...prev,
                    { id: `QWithImg-${Date.now()}`, type: 'QWithImg', inputValue: '', uploadedFile: null }
                ]);
            } else if (draggableId === 'QTrueOrFalse') {
                setFormElements(prev => [
                    ...prev,
                    { id: `QTrueOrFalse-${Date.now()}`, type: 'QTrueOrFalse', inputValue: '', uploadedFile: null }
                ]);
            } else if (draggableId === 'QWithColorPicker') {
                setFormElements(prev => [
                    ...prev,
                    { id: `QWithColorPicker-${Date.now()}`, type: 'QWithColorPicker', inputValue: '', uploadedFile: null }
                ]);
            } else if (draggableId === 'QWithTextAndImgAnswer') {
                setFormElements(prev => [
                    ...prev,
                    { id: `QWithTextAndImgAnswer-${Date.now()}`, type: 'QWithTextAndImgAnswer', inputValue: '', uploadedFile: null }
                ]);
            } else if (draggableId === 'QWithImgAnswer') {
                setFormElements(prev => [
                    ...prev,
                    { id: `QWithImgAnswer-${Date.now()}`, type: 'QWithImgAnswer', inputValue: '', uploadedFile: null }
                ]);
            } else if (draggableId === 'QWithMultiAnswer') {
                setFormElements(prev => [
                    ...prev,
                    { id: `QWithMultiAnswer-${Date.now()}`, type: 'QWithMultiAnswer', inputValue: '', uploadedFile: null }
                ]);
            }
        }
    };

    const handleRemoveElement = (id) => {
        setFormElements(prev => prev.filter(element => element.id !== id));
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
                        uploadedFile={element.uploadedFile} // Pass uploaded file
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
            case 'QWithTextAndImgAnswer':
                return (
                    <QWithTextAndImgAnswer
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
                    />
                );
            default:
                return null;
        }
    };

    const handleInputChange = (id, newValue) => {
        setFormElements(prev =>
            prev.map(element =>
                element.id === id ? { ...element, inputValue: newValue } : element
            )
        );
    };

    const handleFileChange = (id, newFile) => {
        setFormElements(prev =>
            prev.map(element =>
                element.id === id ? { ...element, uploadedFile: newFile } : element
            )
        );
    };

    const handleFileUpload = async (file) => {
        if (!file) return;

        const fileRef = ref(storage, `${id}/${file.name}`);
        await uploadBytes(fileRef, file);
        try {
            const downloadURL = await getDownloadURL(fileRef);  // Get the download URL
            return downloadURL;  // Return the download URL
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleFormSubmit = async () => {
        const mappedQuestions = await Promise.all(
            formElements.map(async (element) => {
                console.log(element)
                const uploadedFileUrl = await handleFileUpload(element.uploadedFile);
                return {
                    type: element.id,
                    inputValue: element.inputValue,
                    ...(uploadedFileUrl && { uploadedFileUrl })
                };
            })
        );

        const newData = { questions: mappedQuestions };
        console.log(newData); // dont forget about the concatinat where it adds the element that is in the form and it will add it again if you submit it again

        try {
            const response = await axios.patch(`/AddQuestions/${id}`, newData); // Use 'id' here
            console.log("Form updated successfully:", response.data);
        } catch (error) {
            console.error("Error updating form:", error);
        }
    };




    return (
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
                    <div className="col-6 d-flex justify-content-center align-content-center flex-wrap" style={{ height: "90vh" }}>
                        <div className='overflow-x-hidden p-1 rounded-2'
                            style={{
                                width: "70%",
                                height: "85vh",
                                backgroundColor: "#acacac87",
                                borderStyle: "dashed",
                                borderColor: "#acacac87",
                                overflowY: "scroll",
                                position: "relative"
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
                    >
                        Submit Form
                    </button>
                </div>
            </div>
        </DragDropContext>

    );
};

export default AddElements;
