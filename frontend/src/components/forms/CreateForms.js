import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DraggableLibrary from './questions/DraggableLibrary';
import DroppableFormArea from './questions/DroppableFormArea';
import TextAreaQ from './questions/TextAreaQ';
import RatingQ from './questions/RatingQ';
import QWithImg from './questions/QWithImg';
import QTrueOrFalse from './questions/QTrueOrFalse';
import QWithColorPicker from './questions/QWithColorPicker.js'
import QWithTextAndImgAnswer from './questions/QWithTextAndImgAnswer.js';
import QWithImgAnswer from './questions/QWithImgAnswer.js';
import QWithMultiAnswer from './questions/QWithMultiAnswer.js';


const CreateForms = () => {
    const [formElements, setFormElements] = useState([]);

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

    const handleFormSubmit = () => {

        console.log('Collected form data:', formElements);
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

                <button onClick={handleFormSubmit} className="btn btn-primary mt-3">
                    Submit Form
                </button>
            </div>
        </DragDropContext>

    );
};

export default CreateForms;
