import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import TextAreaAnswer from './answers/TextAreaAnswer.js';
import QWithImgAnswer from "./answers/QWithImgAnswer.js";
import RatingQAnswer from "./answers/RatingQAnswer.js";
import QTrueOrFalseAnswer from "./answers/QTrueOrFalseAnswer.js";
import QWithColorPickerAnswer from "./answers/QWithColorPickerAnswer.js";
import QWithTextAndImgAnswer from './answers/QWithTextAndImgAnswer.js';
import QWithAnswerImg from "./answers/QWithAnswerImg.js";
import QWithMultipleAnswer from './answers/QWithMultipleAnswer.js';
import useAuth from '../../hooks/useAuth.js';
import { toast } from 'react-hot-toast';

const AnswerForm = () => {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [answers, setAnswers] = useState([]);
    const { auth } = useAuth();
    const navigate = useNavigate()


    const checkIfAnswered = async (id) => {
        try {
            const response = await axios.post('/isanswered', {
                formId: id,
                answeredById: auth.userInfo._id,
            });

            if (response.data.answered) {
                return 1;
            } else {
                toast.success('hello')
                const response = await axios.get(`/AnswerForm/${id}`);
                return response.data
            }
        } catch (error) {
            console.error('Error checking if form is answered:', error);
            toast.error('An error occurred. Please try again later.');
            return;
        }
    };

    useEffect(() => {
        const loadForm = async () => {
            const data = await checkIfAnswered(id);
            if (data === 1) {
                toast.error('You have already answered this form.');
                navigate('/error', { state: { id: 402 } });
                return;
            } else {
                setForm(data.form);
            }
            const initialAnswers = data.form.questions.map(question => {
                const baseAnswer = {
                    question: question.inputValue,
                    type: question.type,
                };

                switch (question.type.split('-')[0]) {
                    case 'TextAreaQ':
                        return {
                            ...baseAnswer,
                            answer: '',
                        };
                    case 'QWithImg':
                        return {
                            ...baseAnswer,
                            answer: '',
                            uploadedFileUrl: question.uploadedFileUrl,
                        };
                    case 'RatingQ':
                        return {
                            ...baseAnswer,
                            rating: 0,
                        };
                    case 'QTrueOrFalse':
                        return {
                            ...baseAnswer,
                            selectedOption: '',
                        };
                    case 'QWithColorPicker':
                        return {
                            ...baseAnswer,
                            selectedColors: [],
                        };
                    case 'QWithTextAndImgAns':
                        return {
                            ...baseAnswer,
                            answer: '',
                            uploadedFileUrl: '',
                        };
                    case 'QWithImgAnswer':
                        return {
                            ...baseAnswer,
                            uploadedFileUrl: '',
                        };
                    case 'QWithMultiAnswer':
                        return {
                            ...baseAnswer,
                            answers: [''],
                        };

                    default:
                        return {
                            ...baseAnswer,
                            answer: '',
                        };
                }
            });

            setAnswers(initialAnswers);
        };

        loadForm();
    }, [id]);

    const handleInputChange = (index, newValue) => {
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[index] = {
                ...updatedAnswers[index],
                answer: newValue,
            };
            return updatedAnswers;
        });
    };

    const handleRatingChange = (index, newRating) => {
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[index] = {
                ...updatedAnswers[index],
                rating: newRating,
            };
            return updatedAnswers;
        });
    };

    const handleOptionChange = (index, newOption) => {
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[index] = {
                ...updatedAnswers[index],
                selectedOption: newOption,
            };
            return updatedAnswers;
        });
    };

    const handleColorsChange = (index, newColors) => {
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[index] = {
                ...updatedAnswers[index],
                selectedColors: newColors,
            };
            return updatedAnswers;
        });
    };

    const handleFileUrlChange = (index, newFileUrl) => {
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[index] = {
                ...updatedAnswers[index],
                uploadedFileUrl: newFileUrl,
            };
            return updatedAnswers;
        });
    };

    const handleMultipleAnswersChange = (index, newAnswers) => {
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[index] = {
                ...updatedAnswers[index],
                answers: newAnswers,
            };
            return updatedAnswers;
        });
    };

    const renderAnswerComponent = (question, index) => {
        switch (question.type.split('-')[0]) {
            case 'TextAreaQ':
                return (
                    <TextAreaAnswer
                        key={index}
                        question={question.inputValue}
                        onAnswerChange={(newValue) => handleInputChange(index, newValue)}
                    />
                );
            case 'QWithImg':
                return (
                    <QWithImgAnswer
                        key={index}
                        question={question.inputValue}
                        uploadedFileUrl={question.uploadedFileUrl}
                        inputValue={answers[index]?.answer || ''}
                        setInputValue={(newValue) => handleInputChange(index, newValue)}
                    />
                );
            case 'RatingQ':
                return (
                    <RatingQAnswer
                        key={index}
                        question={question.inputValue}
                        rating={answers[index]?.rating || 0}
                        setRating={(newRating) => handleRatingChange(index, newRating)}
                    />
                );
            case 'QTrueOrFalse':
                return (
                    <QTrueOrFalseAnswer
                        key={index}
                        question={question.inputValue}
                        selectedOption={answers[index]?.selectedOption || ''}
                        onOptionChange={(newOption) => handleOptionChange(index, newOption)}
                    />
                );
            case 'QWithColorPicker':
                return (
                    <QWithColorPickerAnswer
                        key={index}
                        question={question.inputValue}
                        selectedColors={answers[index]?.selectedColors || []}
                        onColorsChange={(newColors) => handleColorsChange(index, newColors)}
                    />
                );
            case 'QWithTextAndImgAns':
                return (
                    <QWithTextAndImgAnswer
                        key={index}
                        question={question.inputValue}
                        answer={answers[index]?.answer || ''}
                        setAnswer={(newValue) => handleInputChange(index, newValue)}
                        uploadedFileUrl={answers[index]?.uploadedFileUrl || ''}
                        setUploadedFileUrl={(newUrl) => handleFileUrlChange(index, newUrl)}
                    />
                );
            case 'QWithImgAnswer':
                return (
                    <QWithAnswerImg
                        key={index}
                        question={question.inputValue}
                        uploadedFileUrl={answers[index]?.uploadedFileUrl || ''}
                        setUploadedFileUrl={(newUrl) => handleFileUrlChange(index, newUrl)}
                        readOnly={false}
                    />
                );
            case 'QWithMultiAnswer':
                return (
                    <QWithMultipleAnswer
                        key={index}
                        question={question.inputValue}
                        answers={answers[index]?.answers || ['']}
                        setAnswers={(newAnswers) => handleMultipleAnswersChange(index, newAnswers)}
                    />
                );
            default:
                return null;
        }
    };

    const handleFormSubmit = async () => {
        const submissionData = {
            formOwnerId: form.formOwnerId,
            formId: id,
            AnsweredBy: auth?.userInfo?._id,
            answers: answers.map((answer) => {
                const { question, type } = answer;
                const response = { question, type };

                if (type.startsWith('TextAreaQ')) {
                    response.answer = answer.answer || '';
                }

                if (type.startsWith('QWithImg')) {
                    response.answer = answer.answer || '';
                    response.uploadedFileUrl = answer.uploadedFileUrl || '';
                }

                if (type.startsWith('RatingQ')) {
                    response.answer = answer.rating;
                }

                if (type.startsWith('QTrueOrFalse')) {
                    response.answer = answer.selectedOption || '';
                }

                if (type.startsWith('QWithColorPicker')) {
                    response.answer = answer.selectedColors || [];
                }

                if (type.startsWith('QWithTextAndImgAns')) {
                    response.answer = answer.answer || '';
                    response.uploadedFileUrl = answer.uploadedFileUrl || '';
                }
                if (type.startsWith('QWithImg')) {
                    response.uploadedFileUrl = answer.uploadedFileUrl || '';
                }
                if (type.startsWith('QWithMultiAnswer')) {
                    response.answers = answer.answers || [];
                }
                return response;
            }),
        };

        console.log(submissionData);

        try {
            const response = await axios.post('/Answer', submissionData);
            toast.success('Answer saved')
        } catch (error) {
            toast.error("Error subitting form:", error.status)
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center rounded-3">
            <div className="col-6 bg rounded-3" style={{ backgroundColor: "#acacac87" }}>
                <div className="bg-white align-text-center rounded-3">
                    <h3 style={{ padding: "15px" }}>{form?.formName}</h3>
                    <hr />
                    <small style={{ display: "block", padding: "15px" }}>{form?.formDescription}</small>
                    <hr />
                </div>

                {form?.questions.map((question, index) => (
                    <div key={index}>
                        {renderAnswerComponent(question, index)}
                    </div>
                ))}

                <button onClick={handleFormSubmit} className="btn btn-primary m-3">Submit Answers</button>
            </div>
        </div>
    );
};

export default AnswerForm;
