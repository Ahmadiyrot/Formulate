import Form from '../models/form.js'

const createForm = async (req, res) => { // this will create a form from a title desc and status with no qustions

    const form = new Form(req.body);
    try {
        await form.save();
        res.status(200).send({ form });
    } catch (error) {
        res.status(402).send(error);
    }
};

const addQuestionsToForm = async (req, res) => { // this will add qustions to the form that was already created
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
    const { skip = 0, limit = 10, search, date, pinned } = req.query;

    let filter = {
        formOwnerId: ownerId,
        status: { $in: ['Active', 'Paused'] },
        questions: { $ne: [] }
    };

    if (search) {
        console.log("Entered search filter");
        filter.formName = { $regex: search, $options: 'i' };
    }

    if (date) {
        console.log("Entered date filter");
        const [month, day, year] = date.split('/');
        const parsedDate = new Date(`${year}-${month}-${day}`);
        const nextDay = new Date(parsedDate);
        nextDay.setDate(parsedDate.getDate() + 1);
        filter.createdAt = {
            $gte: parsedDate,
            $lt: nextDay,
        };
    }

    if (pinned !== undefined) {
        console.log("Entered pinned filter");
        filter.pinned = pinned === 'true';
    }

    try {
        const total = await Form.countDocuments(filter);

        const forms = await Form.find(filter)
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        res.status(200).json({ forms, total });
    } catch (error) {
        console.error('Error fetching forms:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};




const getFormById = async (req, res) => { // this will get the form by the object id 
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

const deleteFormById = async (req, res) => { // this will delete the form by id 
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

const changeFormStatus = async (req, res) => { // this will change the status of the form 
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

const getDeletedByUserId = async (req, res) => {
    const { Id } = req.params;
    const { skip, limit } = req.query;

    try {
        const total = await Form.countDocuments({
            formOwnerId: Id,
            status: 'Disabled'
        });

        const drafts = await Form.find({
            formOwnerId: Id,
            status: 'Disabled'
        })
            .skip(parseInt(skip))
            .limit(parseInt(limit));

        res.status(200).send({ drafts, total });
    } catch (error) {
        res.status(400).send({ error: 'Error fetching drafts', details: error });
    }
};

const getDraftsByUserId = async (req, res) => {
    const { id } = req.params;
    const { skip, limit } = req.query;

    try {
        const total = await Form.countDocuments({
            formOwnerId: id,
            status: { $in: ['Active', 'Paused'] },
            questions: { $eq: [] }
        });
        const forms = await Form.find({
            formOwnerId: id,
            status: { $in: ['Active', 'Paused'] },
            questions: { $eq: [] }
        })
            .skip(parseInt(skip))
            .limit(parseInt(limit));

        res.status(200).send({ forms, total });
    } catch (error) {
        res.status(400).send({ error: 'Error fetching forms', details: error });
    }
};

const changePinStatus = async (req, res) => {
    const { id } = req.params;
    const { pinned } = req.body;

    try {
        const form = await Form.findById(id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        form.pinned = pinned;

        const updatedForm = await form.save();
        return res.status(200).json({ message: 'Pin status updated', form: updatedForm });
    } catch (error) {
        console.error('Error updating pin status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




export default {
    createForm,
    addQuestionsToForm,
    getFormsByOwnerId,
    getFormById,
    deleteFormById,
    changeFormStatus,
    getDeletedByUserId,
    getDraftsByUserId,
    changePinStatus
}