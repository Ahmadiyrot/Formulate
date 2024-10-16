import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const DroppableFormArea = ({ formElements, handleRemoveElement, renderFormElement }) => {
    return (
        <Droppable droppableId="droppable-area">
            {(provided) => (
                <div
                    className="col-6 "
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                        minHeight: '500px',
                        padding: '20px',
                        minWidth: '700px',
                        borderRadius: '8px',
                        backgroundColor: '#dee2e6',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        marginTop:"20px"
                    }}
                >
                    {formElements.map((element, index) => {

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
                                            padding: '15px',
                                            borderRadius: '8px',
                                            backgroundColor: '#ffffff',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            transition: 'box-shadow 0.3s ease-in-out',
                                        }}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)')
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)')
                                        }
                                    >
                                        {renderFormElement(element)}

                                        <button
                                            onClick={() => handleRemoveElement(element.id)}
                                            style={{
                                                backgroundColor: '#dc3545',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                padding: '6px 12px',
                                                cursor: 'pointer',
                                                alignSelf: 'flex-end',
                                                transition: 'background-color 0.3s ease',
                                            }}
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.backgroundColor = '#c82333')
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.backgroundColor = '#dc3545')
                                            }
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
