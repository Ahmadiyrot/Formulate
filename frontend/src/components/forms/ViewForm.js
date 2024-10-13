import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import TextAreaAnswer from './answers/TextAreaAnswer.js';
import RatingQAnswer from './answers/RatingQAnswer.js';
import QWithMultipleAnswer from './answers/QWithMultipleAnswer.js';
import QWithImgAnswer from './answers/QWithImgAnswer.js';
import QWithAnswerImg from './answers/QWithAnswerImg.js';
import QTrueOrFalseAnswer from './answers/QTrueOrFalseAnswer.js';
import QWithColorPickerAnswer from './answers/QWithColorPickerAnswer.js';
import QWithTextAndImgAnswer from './answers/QWithTextAndImgAnswer.js'

const ViewForm = () => {
    const { ID } = useParams();
    const [formAnswer, setFormAnswer] = useState(null);
    const [error, setError] = useState(null);

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
        <div className="container-fluid w-50 d-flex justify-content-center rounded-3 flex-column text-white">
            <h1 className='text-center'>Form Answer Details</h1>
            <p className='text-center'><strong>Answered By:</strong> {formAnswer.AnsweredBy.email}</p>
            <p className='text-center'><strong>Status:</strong> {formAnswer.status}</p>




            {formAnswer.answers.map((answer, index) => {
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
                            setAnswer={() => { }}
                            uploadedFileUrl={answer.uploadedFileUrl}
                            setUploadedFileUrl={() => { }}
                            readOnly={true}
                        />
                    );
                } else {
                    return (
                        <p key={index}>Unsupported question type: {questionType}</p>
                    );
                }
            })}

        </div>
    );
};

export default ViewForm;
