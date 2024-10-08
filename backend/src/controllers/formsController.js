import Form from '../models/form.js'

const createForm = async (req, res) => {

    const form = new Form(req.body);
    try {
        await form.save();
        res.status(200).send({ form });
    } catch (error) {
        res.status(402).send(error);
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

        questions.forEach(newQuestion => {
            const existingQuestion = form.questions.find(q => q.type === newQuestion.type);

            if (existingQuestion) {
                if (existingQuestion.inputValue !== newQuestion.inputValue) {
                    existingQuestion.inputValue = newQuestion.inputValue;
                    form.markModified('questions');
                }
            } else {
                form.questions.push(newQuestion);
            }

        });


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
        const total = await Form.countDocuments({ 
            formOwnerId: ownerId, 
            status: { $in: ['Active', 'Paused'] } 
        });
        const forms = await Form.find({ 
            formOwnerId: ownerId, 
            status: { $in: ['Active', 'Paused'] } 
        })
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

const deleteFormById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Form ID is required' });
    }

    try {
        const result = await Form.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json({ message: 'Form deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting form', error: err.message });
    }
};

const changeFormStatus = async (req, res) => {
    const { id } = req.params; 
    const { status } = req.body; 

  
    const validStatuses = ['Active', 'Paused', 'Disabled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status.' });
    }

    try {
        const form = await Form.findById(id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        form.status = status;

        await form.save();

        res.status(200).json({ message: 'Form status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating form status', error: error.message });
    }
};




export default {
    createForm,
    addQuestionsToForm,
    getFormsByOwnerId,
    getFormById,
    deleteFormById,
    changeFormStatus
}