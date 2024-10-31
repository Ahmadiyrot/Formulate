import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import TextAreaAnswer from './answers/TextAreaAnswer.js';
import RatingQAnswer from './answers/RatingQAnswer.js';
import QWithMultipleAnswer from './answers/QWithMultipleAnswer.js';
import QWithImgAnswer from './answers/QWithImgAnswer.js';
import QWithAnswerImg from './answers/QWithAnswerImg.js';
import QTrueOrFalseAnswer from './answers/QTrueOrFalseAnswer.js';
import QWithColorPickerAnswer from './answers/QWithColorPickerAnswer.js';
import QWithTextAndImgAnswer from './answers/QWithTextAndImgAnswer.js';
import PickAnswerView from './answers/PickAnswerView.js'; 
import DropdownSelectView from './answers/DropdownSelectView.js'; 

const ViewForm = () => {
    const { ID } = useParams();
    const [formAnswer, setFormAnswer] = useState(null);
    const [error, setError] = useState(null);
    const formattedDate = formAnswer?.createdAt ? format(new Date(formAnswer.createdAt), 'P') : 'Date not available';

    useEffect(() => {
        const fetchFormAnswer = async () => {
            try {
                const response = await axios.get(`/Answer/${ID}`);
                setFormAnswer(response.data);
                console.log(response.data);
            } catch (err) {
                console.error('Error fetching form answer:', err);
                setError(err.message);
            }
        };

        if (ID) {
            fetchFormAnswer();
        }
    }, [ID]);

    return (
        <div
            className="container-fluid w-50 d-flex justify-content-center align-items-center flex-column rounded-3 text-black p-3"
            style={{ backgroundColor: '#C0C0C0' }}
        >
            <div className="row w-100">
                <h3 className="text-center w-100">Form Details</h3>
            </div>
            <div className="row w-100 bg-white rounded-3 p-3">
                <div className="col">
                    <h2 className="ps-2 pb-2">{formAnswer?.formId?.formName}</h2>
                    <p className="ps-2">
                        <strong>Answered By: {formAnswer?.AnsweredBy?.email}</strong>
                    </p>
                    <div className="d-flex justify-content-start ps-2">
                        <span className="me-4 align-content-center" style={{ fontWeight: 'bolder' }}>
                            Status:
                        </span>
                        <div
                            className="d-flex justify-content-center rounded-2"
                            style={{
                                backgroundColor: formAnswer?.status === 'Paused' ? '#FCEB9F' : '#D9F9E6',
                                color: formAnswer?.status === 'Paused' ? '#C8811A' : '#2F9461',
                                width: '65px',
                                padding: '5px',
                            }}
                        >
                            <span>{formAnswer?.status}</span>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <p className="ps-2 text-end">
                        <strong>Date Answered:</strong> {formattedDate}
                    </p>
                </div>
            </div>

            {formAnswer?.answers.map((answer, index) => {
                const idParts = answer.type.split('-');
                const questionType = idParts[0];

                if (questionType === 'TextAreaQ') {
                    return (
                        <TextAreaAnswer
                            key={index}
                            question={answer.question}
                            answer={answer.answer}
                            readOnly={true}
                        />
                    );
                } else if (questionType === 'RatingQ') {
                    return (
                        <RatingQAnswer
                            key={index}
                            question={answer.question}
                            rating={answer.answer}
                            readOnly={true}
                        />
                    );
                } else if (questionType === 'QWithMultiAnswer') {
                    return (
                        <QWithMultipleAnswer
                            key={index}
                            question={answer.question}
                            selectedAnswers={answer.answers}
                            readOnly={true}
                        />
                    );
                } else if (questionType === 'QWithImgAnswer') {
                    return (
                        <QWithAnswerImg
                            key={index}
                            question={answer.question}
                            uploadedFileUrl={answer.uploadedFileUrl}
                            inputValue={answer.inputValue || ''}
                            readOnly={true}
                        />
                    );
                } else if (questionType === 'QWithImg') {
                    return (
                        <QWithImgAnswer
                            key={index}
                            question={answer.question}
                            uploadedFileUrl={answer.uploadedFileUrl}
                            inputValue={answer.answer || ''}
                            readOnly={true}
                        />
                    );
                } else if (questionType === 'QTrueOrFalse') {
                    return (
                        <QTrueOrFalseAnswer
                            key={index}
                            question={answer.question}
                            selectedOption={answer.answer}
                            readOnly={true}
                        />
                    );
                } else if (questionType === 'QWithColorPicker') {
                    return (
                        <QWithColorPickerAnswer
                            key={index}
                            question={answer.question}
                            selectedColors={answer.answer || []}
                            readOnly={true}
                        />
                    );
                } else if (questionType === 'QWithTextAndImgAns') {
                    return (
                        <QWithTextAndImgAnswer
                            key={index}
                            question={answer.question}
                            answer={answer.answer}
                            setAnswer={() => {}}
                            uploadedFileUrl={answer.uploadedFileUrl}
                            setUploadedFileUrl={() => {}}
                            readOnly={true}
                        />
                    );
                } else if (questionType === 'DropdownSelectQuestion') {
                    return (
                        <DropdownSelectView
                            key={index}
                            question={answer.question}
                            selectedOption={answer.answer}
                        />
                    );
                } else if (questionType === 'PickAnswerQuestion') {
                    return (
                        <PickAnswerView
                            key={index}
                            question={answer.question}
                            selectedOption={answer.answer}
                        />
                    );
                } else {
                    return <p key={index}>Unsupported question type: {questionType}</p>;
                }
            })}
        </div>
    );
};

export default ViewForm;
