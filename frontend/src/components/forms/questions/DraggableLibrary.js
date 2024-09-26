import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TextAreaQ from './TextAreaQ';
import RatingQ from './RatingQ';
import MultiAnswerQ from './MultiAnswerQ';

const DraggableLibrary = () => {
    return (
        <Droppable droppableId="draggable-area" isDropDisabled={true}>
            {(provided) => (
                <div
                    className="d-flex justify-content-center flex-column w-100 "
                    style={{ height: "500px", overflowY: "scroll" }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <Draggable draggableId="TextAreaQ" index={0}>
                        {(provided) => {
                            console.log("Rendering TextAreaQ draggable");
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className='pt-5 mt-5'
                                    style={{ ...provided.draggableProps.style }}
                                >
                                    <TextAreaQ inputValue="" setInputValue={() => { }} />
                                </div>
                            );
                        }}
                    </Draggable>

                    <Draggable draggableId="RatingQ" index={1}>
                        {(provided) => {
                            console.log("Rendering RatingQ draggable");
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className='b-3'
                                    style={{ ...provided.draggableProps.style }}
                                >
                                    <RatingQ inputValue="" setInputValue={() => { }} />
                                </div>
                            );
                        }}
                    </Draggable>
                    <Draggable draggableId="MultiAnswerQ" index={2}>
                        {(provided) => {
                            console.log("Rendering MultiAnswerQ draggable");
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className='b-3'
                                    style={{ ...provided.draggableProps.style }}
                                >
                                    <MultiAnswerQ inputValue="" setInputValue={() => { }} />
                                </div>
                            );
                        }}
                    </Draggable>
                    

                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default DraggableLibrary;
