import FormAnswer from "../models/formAnswer.js";
import mongoose from 'mongoose';

const createFormAnswer = async (req, res) => {
    const formAnswer = new FormAnswer(req.body);
    try {
        await formAnswer.save();
        res.status(200).send({ formAnswer });
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteFormAnswer = async (req, res) => {
    const { formId, formOwnerId } = req.query;
    try {

        const form = await FormAnswer.findOne({ _id: formId });

        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }

        if (form.formOwnerId.toString() !== formOwnerId) {
            return res.status(403).json({ error: 'You do not have permission to delete this form' });
        }

        await FormAnswer.deleteOne({ _id: formId });

        res.status(200).json({ message: 'Form answer deleted successfully' });
    } catch (error) {
        console.error('Error deleting form:', error);
        res.status(500).json({ error: 'Error deleting form answer' });
    }
};

const getFormAnswers = async (req, res) => {
    const { formId } = req.params;
    const { status, limit = 10, page = 1 } = req.query;

    if (!mongoose.Types.ObjectId.isValid(formId)) {
        return res.status(400).send({ error: "Invalid form ID" });
    }

    try {
        const query = { formId: formId };
        if (status) {
            query.status = status;
        }

        const skip = (page - 1) * limit;

        const formAnswers = await FormAnswer.find(query)
            .populate('AnsweredBy', 'email')
            .populate('formId', 'formName')
            .skip(skip)
            .limit(parseInt(limit));

        const totalAnswers = await FormAnswer.countDocuments(query);

        if (formAnswers.length === 0) {
            return res.status(404).send({ error: "No form answers found or you are not authorized to view them" });
        }

        res.status(200).send({
            responses: formAnswers,
            total: totalAnswers,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};



const isAnswered = async (req, res) => {
    const { formId, AnsweredById } = req.body;

    try {
        const response = await FormAnswer.findOne({ formId: formId, answeredBy: AnsweredById });

        if (response) {

            return res.json({ answered: true });
        } else {
            return res.json({ answered: false });
        }
    } catch (error) {
        console.error('Error checking if form is answered:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
const getAnswerById = async (req, res) => {
    const { answerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(400).send({ error: "Invalid answer ID" });
    }

    try {
        const formAnswer = await FormAnswer.findById(answerId)
            .populate('AnsweredBy', 'email')
            .populate('formId', 'formName');

        if (!formAnswer) {
            return res.status(404).send({ error: "Form answer not found" });
        }

        res.status(200).send(formAnswer);
    } catch (error) {
        console.error('Error fetching form answer:', error);
        res.status(500).send({ error: "Internal server error" });
    }
};

const chnageAnswerStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid answer ID" });
    }

    try {
        const formAnswer = await FormAnswer.findById(id);

        if (!formAnswer) {
            return res.status(404).send({ error: "Form answer not found" });
        }

        formAnswer.status = status;

        await formAnswer.save();

        res.status(200).send({ message: "Status updated successfully", formAnswer });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).send({ error: "Internal server error" });
    }
};



export default {
    createFormAnswer,
    deleteFormAnswer,
    getFormAnswers,
    isAnswered,
    getAnswerById,
    chnageAnswerStatus
}