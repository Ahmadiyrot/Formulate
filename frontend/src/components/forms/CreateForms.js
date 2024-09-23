import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TextAreaQ from "./questions/TextAreaQ";

const CreateForms = () => {
    const [formElements, setFormElements] = useState([]);
    const [collectedValues, setCollectedValues] = useState([]); // To store the collected input values

    // Handle the drag end event to reorder elements within the drop area
    const handleOnDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) return; // Do nothing if dragged outside the droppable area

        // Reorder elements if they are dragged within the droppable area
        if (source.droppableId === destination.droppableId && destination.droppableId === 'droppable-area') {
            const reorderedElements = Array.from(formElements);
            const [movedElement] = reorderedElements.splice(source.index, 1); // Remove from source index
            reorderedElements.splice(destination.index, 0, movedElement); // Insert at destination index

            setFormElements(reorderedElements);
        } else if (destination.droppableId === 'droppable-area') {
            // Add a new TextAreaQ component with a unique state for inputValue to the drop zone
            setFormElements(prev => [
                ...prev,
                {
                    id: `TextAreaQ-${Date.now()}`,  // Assign an ID with "TextAreaQ" prefix
                    type: 'TextAreaQ',
                    inputValue: '', // Unique inputValue for each instance
                }
            ]);
        }
    };

    // Handle input value change for a specific form element
    const handleInputChange = (id, newValue) => {
        setFormElements(prev =>
            prev.map(element =>
                element.id === id ? { ...element, inputValue: newValue } : element
            )
        );
    };

    // Handle removal of an element from the formElements list
    const handleRemoveElement = (id) => {
        setFormElements(prev => prev.filter(element => element.id !== id));
    };

    // Function to render form elements based on type
    const renderFormElement = (element) => {
        switch (element.type) {
            case 'TextAreaQ':
                return (
                    <TextAreaQ
                        inputValue={element.inputValue}
                        setInputValue={(value) => handleInputChange(element.id, value)}
                    />
                );
            default:
                return null;
        }
    };

    // Function to collect and display input values
    const handleCollectInputValues = () => {
        const values = formElements.map(element => ({
            id: element.id,  // Now this will have a meaningful ID like "TextAreaQ-<timestamp>"
            value: element.inputValue
        }));

        setCollectedValues(values); // Set the collected values in state
        console.log(values); // Log the values (optional)
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="container-fluid d-flex flex-column">
                <div className="row d-flex align-items-start">

                    <Droppable droppableId="droppable-area">
                        {(provided) => (
                            <div
                                className="col-8 bg-dark-subtle"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{ minHeight: '500px', padding: '20px' }}
                            >
                                {formElements.map((element, index) => (
                                    <Draggable key={element.id} draggableId={element.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{ ...provided.draggableProps.style, marginBottom: '20px', position: 'relative', display: 'flex', flexDirection: 'column' }}
                                            >
                                                {renderFormElement(element)}

                                                <button
                                                    onClick={() => handleRemoveElement(element.id)}
                                                    style={{
                                                        backgroundColor: 'red',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        padding: '5px 10px',
                                                        cursor: 'pointer',
                                                        width: '100px'
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <div className="col-4 h-100">
                        <Droppable droppableId="draggable-area" isDropDisabled={true}>
                            {(provided) => (
                                <div className="d-flex justify-content-center flex-column w-100" style={{ height: "500px", overflowY: "scroll" }} ref={provided.innerRef} {...provided.droppableProps}>
                                    <Draggable draggableId="TextAreaQ" index={0}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{ ...provided.draggableProps.style }}
                                            >
                                                <TextAreaQ inputValue="" setInputValue={() => { }} /> 
                                                
                                            </div>
                                        )}
                                    </Draggable>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>

                {/* Button to collect input values */}
                <button
                    onClick={handleCollectInputValues}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Get Input Values
                </button>

                {/* Display collected input values */}
                <div className="mt-4">
                    {collectedValues.length > 0 && (
                        <div style={{color:'white'}}>
                            <h4>Collected Input Values:</h4>
                            <ul>
                                {collectedValues.map((item, index) => (
                                    <li key={item.id}>Element {index + 1}: {item.value}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </DragDropContext>
    );
};

export default CreateForms;
