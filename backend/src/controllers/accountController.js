import Account from '../models/account.js'

const createAccount = async (req, res) => {
    try {
        const user = new Account(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token: token });
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
}

const signInAccount = async (req, res) => {
    try {
        console.log(req.body)
        const user = await Account.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token: token });
    } catch (error) {
        res.status(400).send()
    }
}

const getAccountByEmail = async (req, res) => {
    console.log(req)
    try {
        const user = await Account.findOne({ email: req.params.email })
        if (!user) {
            return res.status(404).send({ error: "Email not found" })
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}
export default {
    createAccount,
    getAccountByEmail,
    signInAccount
}