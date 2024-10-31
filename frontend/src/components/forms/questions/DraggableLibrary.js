import React, { useEffect, useRef, useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TextAreaQ from './TextAreaQ';
import RatingQ from './RatingQ';
import QWithImg from './QWithImg';
import QTrueOrFalse from './QTrueOrFalse';
import QWithColorPicker from './QWithColorPicker.js';
import QWithTextAndImgAns from './QWithTextAndImgAns.js';
import QWithImgAnswer from './QWithImgAnswer.js';
import QWithMultiAnswer from './QWithMultiAnswer.js';
import PickAnswerQuestion from './PickAnswerQuestion.js';
import DropdownSelectQuestion from './DropdownSelectQuestion.js';

const DraggableLibrary = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const sectionsRef = useRef([]);

    const draggableItems = [
        {
            id: 'TextAreaQ',
            name: 'Text Area Question',
            component: <TextAreaQ inputValue="" setInputValue={() => { }} />,
        },
        {
            id: 'RatingQ',
            name: 'Linear scale',
            component: <RatingQ inputValue="" setInputValue={() => { }} />,
        },
        {
            id: 'QWithImg',
            name: 'Question with a file attachment',
            component: <QWithImg inputValue="" setInputValue={() => { }} />,
        },
        {
            id: 'QTrueOrFalse',
            name: 'Yes or No',
            component: <QTrueOrFalse inputValue="" setInputValue={() => { }} />,
        },
        {
            id: 'QWithColorPicker',
            name: 'Question with Color Picker',
            component: <QWithColorPicker inputValue="" setInputValue={() => { }} />,
        },
        {
            id: 'QWithTextAndImgAns',
            name: 'Question with Text or Image Answer',
            component: <QWithTextAndImgAns inputValue="" setInputValue={() => { }} />,
        },
        {
            id: 'QWithImgAnswer',
            name: 'Question with File Answer',
            component: <QWithImgAnswer inputValue="" setInputValue={() => { }} />,
        },
        {
            id: 'QWithMultiAnswer',
            name: 'Question with Multiple Answers',
            component: <QWithMultiAnswer inputValue="" setInputValue={() => { }} />,
        },
        {
            id: 'PickAnswerQuestion',
            name: 'Pick an answer',
            component: <PickAnswerQuestion inputValue="" setInputValue={() => { }} />,
        },
        {
            id: 'DropdownSelectQuestion', 
            name: 'Dropdown Select Question',
            component: <DropdownSelectQuestion inputValue="" setInputValue={() => { }} options={['']} setOptions={() => { }} isPreview={true} />,
        },
    ];

    const filteredItems = draggableItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
    }, [filteredItems]);

    const assignRef = (el, index) => {
        sectionsRef.current[index] = el;
    };

    return (
        <div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search components..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <Droppable droppableId="draggable-area" isDropDisabled={true}>
                {(provided) => (
                    <div
                        className="d-flex justify-content-center flex-column"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {filteredItems.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={(el) => {
                                            provided.innerRef(el);
                                            assignRef(el, index);
                                        }}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="mb-2 fade-in"
                                        style={{ ...provided.draggableProps.style }}
                                    >
                                        <div className="text-black d-flex justify-content-center">
                                            <strong>{item.name}</strong>
                                        </div>
                                        {item.component}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default DraggableLibrary;
