import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import TextAreaAnswer from './answers/TextAreaAnswer.js';
import QWithImgAnswer from "./answers/QWithImgAnswer.js";

const AnswerForm = () => {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [answers, setAnswers] = useState([]);

    const fetchFormById = async (id) => {
        const response = await axios.get(`/AnswerForm/${id}`);
        return response.data;
    };

    useEffect(() => {
        const loadForm = async () => {
            const data = await fetchFormById(id);
            setForm(data.form);
            setAnswers(data.form.questions.map(question => ({
                question: question.inputValue,
                answer: '',
                type: question.type // Assuming question.type exists
            })));
        };

        loadForm();
    }, [id]);

    const handleInputChange = (index, newValue) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index].answer = newValue; // Update only the answer
        setAnswers(updatedAnswers);
    };

    const renderAnswerComponent = (question, index) => {
        console.log(question)
        switch (question.type.split('-')[0]) {
            case 'TextAreaQ':
                return (
                    <TextAreaAnswer
                        key={index}
                        question={question.question}
                        onAnswerChange={(newValue) => handleInputChange(index, newValue)}
                    />
                );
            case 'QWithImg':
                return (
                    <QWithImgAnswer
                        key={index}
                        question={question.question}
                        uploadedFileUrl={question.uploadedFileUrl} // Adjust this according to your data structure
                        inputValue={question.answer} // Assuming you're tracking the answer in the question object
                        setInputValue={(newValue) => handleInputChange(index, newValue)} // Change handler
                    />

                );
            // Add more cases for different question types
            default:
                return null; // Handle unknown types gracefully
        }
    };

    const handleFormSubmit = async () => {
        const formData = {
            formId: id,
            answers: answers.map(({ question, answer, type }) => ({
                question,
                answer,
                type
            })),
        };
        console.log(formData);

        try {
            const response = await axios.post('/submitAnswers', formData);
            console.log("Form submitted successfully:", response.data);
        } catch (error) {
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

                {/* Render the appropriate answer component based on question type */}
                {form?.questions.map((question, index) => renderAnswerComponent(question, index))}

                <button onClick={handleFormSubmit} className="btn btn-primary m-3">Submit Answers</button>
            </div>
        </div>
    );
};

export default AnswerForm;
