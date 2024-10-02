import Form from '../models/form.js'

const createForm = async (req, res) => {

    const form = new Form(req.body);
    try {
        await form.save();
        res.status(200).send({ form });
    } catch (error) {
        res.status(400).send(error);
    }
};

const addQuestionsToForm = async (req, res) => {
    const { id } = req.params;
    const { questions } = req.body;

    try {
        const form = await Form.findById(id);
        if (!form) {
            return res.status(404).send({ message: 'Form not found' });
        }

        const existingQuestionTypes = new Set(form.questions.map(q => q.type));
        const uniqueQuestions = questions.filter(q => !existingQuestionTypes.has(q.type));
        form.questions = form.questions.concat(uniqueQuestions);

        await form.save();

        res.status(200).send({ form });
    } catch (error) {
        res.status(400).send(error);
    }
};

const getFormsByOwnerId = async (req, res) => {
    const { ownerId } = req.params;
    const { skip, limit } = req.query;

    try {
        const total = await Form.countDocuments({ formOwnerId: ownerId });
        const forms = await Form.find({ formOwnerId: ownerId })
            .skip(parseInt(skip))
            .limit(parseInt(limit));

        res.status(200).send({ forms, total });
    } catch (error) {
        res.status(400).send({ error: 'Error fetching forms', details: error });
    }
};

const getFormById = async (req, res) => {
    const { id } = req.params;

    try {
        const form = await Form.findById(id);
        if (!form) {
            return res.status(404).send({ message: 'Form not found' });
        }

        res.status(200).send({ form });
    } catch (error) {
        res.status(400).send({ error: 'Error fetching form', details: error });
    }
};


export default {
    createForm,
    addQuestionsToForm,
    getFormsByOwnerId,
    getFormById
}