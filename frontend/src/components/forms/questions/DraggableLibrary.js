import React, { useEffect, useRef } from 'react';
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
    const sectionsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        sectionsRef.current.forEach(section => {
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            sectionsRef.current.forEach(section => {
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, []);

    const assignRef = (el, index) => {
        sectionsRef.current[index] = el;
    };

    return (
        <Droppable droppableId="draggable-area" isDropDisabled={true}>
            {(provided) => (
                <div
                    className="d-flex justify-content-center flex-column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <Draggable draggableId="TextAreaQ" index={0}>
                        {(provided) => (
                            <div
                                ref={(el) => {
                                    provided.innerRef(el);
                                    assignRef(el, 0);
                                }}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-2 fade-in"
                                style={{ ...provided.draggableProps.style }}
                            >
                                <TextAreaQ inputValue="" setInputValue={() => { }} />
                            </div>
                        )}
                    </Draggable>

                    <Draggable draggableId="RatingQ" index={1}>
                        {(provided) => (
                            <div
                                ref={(el) => {
                                    provided.innerRef(el);
                                    assignRef(el, 1);
                                }}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-2 fade-in"
                                style={{ ...provided.draggableProps.style }}
                            >
                                <RatingQ inputValue="" setInputValue={() => { }} />
                            </div>
                        )}
                    </Draggable>

                    <Draggable draggableId="QWithImg" index={2}>
                        {(provided) => (
                            <div
                                ref={(el) => {
                                    provided.innerRef(el);
                                    assignRef(el, 2);
                                }}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-2 fade-in"
                                style={{ ...provided.draggableProps.style }}
                            >
                                <QWithImg inputValue="" setInputValue={() => { }} />
                            </div>
                        )}
                    </Draggable>

                    <Draggable draggableId="QTrueOrFalse" index={3}>
                        {(provided) => (
                            <div
                                ref={(el) => {
                                    provided.innerRef(el);
                                    assignRef(el, 3);
                                }}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-2 fade-in"
                                style={{ ...provided.draggableProps.style }}
                            >
                                <QTrueOrFalse inputValue="" setInputValue={() => { }} />
                            </div>
                        )}
                    </Draggable>

                    <Draggable draggableId="QWithColorPicker" index={4}>
                        {(provided) => (
                            <div
                                ref={(el) => {
                                    provided.innerRef(el);
                                    assignRef(el, 4);
                                }}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-2 fade-in"
                                style={{ ...provided.draggableProps.style }}
                            >
                                <QWithColorPicker inputValue="" setInputValue={() => { }} />
                            </div>
                        )}
                    </Draggable>

                    <Draggable draggableId="QWithTextAndImgAnswer" index={5}>
                        {(provided) => (
                            <div
                                ref={(el) => {
                                    provided.innerRef(el);
                                    assignRef(el, 5);
                                }}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-2 fade-in"
                                style={{ ...provided.draggableProps.style }}
                            >
                                <QWithTextAndImgAnswer inputValue="" setInputValue={() => { }} />
                            </div>
                        )}
                    </Draggable>

                    <Draggable draggableId="QWithImgAnswer" index={6}>
                        {(provided) => (
                            <div
                                ref={(el) => {
                                    provided.innerRef(el);
                                    assignRef(el, 6);
                                }}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-2 fade-in"
                                style={{ ...provided.draggableProps.style }}
                            >
                                <QWithImgAnswer inputValue="" setInputValue={() => { }} />
                            </div>
                        )}
                    </Draggable>

                    <Draggable draggableId="QWithMultiAnswer" index={7}>
                        {(provided) => (
                            <div
                                ref={(el) => {
                                    provided.innerRef(el);
                                    assignRef(el, 7);
                                }}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-2 fade-in"
                                style={{ ...provided.draggableProps.style }}
                            >
                                <QWithMultiAnswer inputValue="" setInputValue={() => { }} />
                            </div>
                        )}
                    </Draggable>

                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default DraggableLibrary;
