import Account from '../models/account.js'

const createAccount = async (req, res) => {

    console.log(req.body)
    const user = new Account(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(201).send({ user, token: token });
    } catch (error) {
        res.status(400).send(error);
    }
}
export default {
    createAccount
}