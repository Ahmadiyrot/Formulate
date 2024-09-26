import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DraggableLibrary from './questions/DraggableLibrary';
import DroppableFormArea from './questions/DroppableFormArea';
import TextAreaQ from './questions/TextAreaQ';
import RatingQ from './questions/RatingQ';
import MultiAnswerQ from './questions/MultiAnswerQ';

const CreateForms = () => {
    const [formElements, setFormElements] = useState([]);

    const handleOnDragEnd = (result) => {
        console.log("Drag event:", result);
        const { destination, source } = result;

        if (!destination) {
            console.log("Dropped outside the droppable area.");
            return;
        }

        console.log("Dropped in:", destination.droppableId);
        console.log("Source:", source); // Log the entire source object
        console.log("Source draggableId:", result.draggableId); // Use result.draggableId instead

        if (source.droppableId === destination.droppableId && destination.droppableId === 'droppable-area') {
            const reorderedElements = Array.from(formElements);
            const [movedElement] = reorderedElements.splice(source.index, 1);
            reorderedElements.splice(destination.index, 0, movedElement);
            setFormElements(reorderedElements);
        } else if (destination.droppableId === 'droppable-area') {
            const draggableId = result.draggableId; // Get the draggableId directly from the result

            if (draggableId === 'TextAreaQ') {
                console.log("Adding TextAreaQ element to the form");
                setFormElements(prev => [
                    ...prev,
                    { id: `TextAreaQ-${Date.now()}`, type: 'TextAreaQ', inputValue: '' }
                ]);
            } else if (draggableId === 'RatingQ') {
                console.log("Adding RatingQ element to the form");
                setFormElements(prev => [
                    ...prev,
                    { id: `RatingQ-${Date.now()}`, type: 'RatingQ', inputValue: '' }
                ]);
            } else if (draggableId === 'MultiAnswerQ') {
                console.log("Adding MultiRatingQ element to the form");
                setFormElements(prev => [
                    ...prev,
                    { id: `MultiRatingQ-${Date.now()}`, type: 'MultiAnswerQ', inputValue: '' }
                ]);
            } else {
                console.log("Unknown draggableId during drop.");
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
                        setInputValue={(value) => handleInputChange(element.id, value, 'inputValue')}
                    />
                );
            case 'RatingQ':
                return (
                    <RatingQ
                        inputValue={element.inputValue}
                        setInputValue={(value) => handleInputChange(element.id, value, 'inputValue')}
                    />
                );
            case 'MultiAnswerQ':
                return (
                    <MultiAnswerQ
                        inputValue={element.inputValue}
                        setInputValue={(value) => handleInputChange(element.id, value)}
                        dropzoneEnabled={true} 
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

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="container-fluid d-flex flex-column">
                <div className="row d-flex align-items-start">
                    <DroppableFormArea
                        formElements={formElements}
                        handleRemoveElement={handleRemoveElement}
                        renderFormElement={renderFormElement}
                    />
                    <div className="col-4 h-100">
                        <DraggableLibrary />
                    </div>
                </div>
            </div>
        </DragDropContext>
    );
};

export default CreateForms;
