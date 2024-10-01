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

export default {
    createForm
}