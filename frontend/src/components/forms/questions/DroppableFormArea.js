import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const DroppableFormArea = ({ formElements, handleRemoveElement, renderFormElement }) => {
    return (
        <Droppable droppableId="droppable-area">
            {(provided) => (
                <div
                    className="col-8 bg-dark-subtle"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ minHeight: '500px', padding: '20px', minWidth: '700px' }}
                >
                    {formElements.map((element, index) => {
                        console.log('Rendering element:', element);

                        return (
                            <Draggable key={element.id} draggableId={element.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            ...provided.draggableProps.style,
                                            marginBottom: '20px',
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
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
                        );
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default DroppableFormArea;
