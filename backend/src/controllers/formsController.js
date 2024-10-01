import Form from '../models/form.js'

const createForm = async (req, res) => {
    console.log(req);
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

        // Create a set to track existing question types in the form
        const existingQuestionTypes = new Set(form.questions.map(q => q.type));

        // Filter new questions to only include those with unique types
        const uniqueQuestions = questions.filter(q => !existingQuestionTypes.has(q.type));

        // Add the unique questions to the form                    
        form.questions = form.questions.concat(uniqueQuestions);

        await form.save();

        res.status(200).send({ form });
    } catch (error) {
        res.status(400).send(error);
    }
};

export default {
    createForm,
    addQuestionsToForm
}