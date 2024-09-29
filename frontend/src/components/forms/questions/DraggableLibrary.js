import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TextAreaQ from './TextAreaQ';
import RatingQ from './RatingQ';
import QWithImg from './QWithImg';
import QTrueOrFalse from './QTrueOrFalse';
import QWithColorPicker from './QWithColorPicker.js'
import QWithTextAndImgAnswer from './QWithTextAndImgAnswer.js';
import QWithImgAnswer from './QWithImgAnswer.js';
import QWithMultiAnswer from './QWithMultiAnswer.js';

const DraggableLibrary = () => {
    return (
        <Droppable droppableId="draggable-area" isDropDisabled={true}>
            {(provided) => (
                <div
                    className="d-flex justify-content-center flex-column"
                    ref={provided.innerRef}
                    {...provided.droppableProps} >
                    <Draggable draggableId="TextAreaQ" index={0}>
                        {(provided) => {
                            console.log("Rendering TextAreaQ draggable");
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mb-3"
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
                                    className="mb-3"
                                    style={{ ...provided.draggableProps.style }}
                                >
                                    <RatingQ inputValue="" setInputValue={() => { }} />
                                </div>
                            );
                        }}
                    </Draggable>
                    <Draggable draggableId="QWithImg" index={2}>
                        {(provided) => {
                            console.log("Rendering QWithImg draggable");
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mb-3"
                                    style={{ ...provided.draggableProps.style }}
                                >
                                    <QWithImg inputValue="" setInputValue={() => { }} />
                                </div>
                            );
                        }}
                    </Draggable>
                    <Draggable draggableId="QTrueOrFalse" index={3}>
                        {(provided) => {
                            console.log("Rendering QTrueOrFalse draggable");
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mb-3"
                                    style={{ ...provided.draggableProps.style }}
                                >
                                    <QTrueOrFalse inputValue="" setInputValue={() => { }} />
                                </div>
                            );
                        }}
                    </Draggable>
                    <Draggable draggableId="QWithColorPicker" index={4}>
                        {(provided) => {
                            console.log("Rendering QWithColorPicker draggable");
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mb-3"
                                    style={{ ...provided.draggableProps.style }}
                                >
                                    <QWithColorPicker inputValue="" setInputValue={() => { }} />
                                </div>
                            );
                        }}
                    </Draggable>
                    <Draggable draggableId="QWithTextAndImgAnswer" index={5}>
                        {(provided) => {
                            console.log("Rendering QWithTextAndImgAnswer draggable");
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mb-3"
                                    style={{ ...provided.draggableProps.style }}
                                >
                                    <QWithTextAndImgAnswer inputValue="" setInputValue={() => { }} />
                                </div>
                            );
                        }}
                    </Draggable>
                    <Draggable draggableId="QWithImgAnswer" index={6}>
                        {(provided) => {
                            console.log("Rendering QWithImgAnswer draggable");
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mb-3"
                                    style={{ ...provided.draggableProps.style }}
                                >
                                    <QWithImgAnswer inputValue="" setInputValue={() => { }} />
                                </div>
                            );
                        }}
                    </Draggable>
                    <Draggable draggableId="QWithMultiAnswer" index={7}>
                        {(provided) => {
                            console.log("Rendering QWithMultiAnswer draggable");
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mb-3"
                                    style={{ ...provided.draggableProps.style }}
                                >
                                    <QWithMultiAnswer inputValue="" setInputValue={() => { }} />
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
