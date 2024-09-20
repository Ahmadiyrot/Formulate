import Account from '../models/account.js'
import jwt from 'jsonwebtoken'

const createAccount = async (req, res) => {

    const user = new Account(req.body);

    try {
        await user.save();
        const { accessToken, refreshToken } = await user.generateAuthToken();
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(201).send({ user, token: accessToken, refreshToken });
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
}

const signInAccount = async (req, res) => {
    try {
        const user = await Account.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token: token });
    } catch (error) {
        res.status(400).send()
    }
}

const refreshAccount = async (req, res) => {
    const refreshToken = req.cookies.jwt;
    console.log(refreshToken)
    res.clearCookie('jwt', { httpOnly: true });
    if (!refreshToken) {
        return res.status(400).send({ error: 'Refresh token is required' });
    }
    try {

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        console.log(decoded)
        const user = await Account.findOne({ _id: decoded._id });
        if (!user) {
            throw new Error();
        }
        user.tokens = user.tokens.filter((token) => token.token !== refreshToken);
        await user.save();
        const accessToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "20s" });

        const newRefreshToken = jwt.sign(
            { _id: user._id.toString() },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '60m' }
        );
        user.tokens = user.tokens.concat({ token: newRefreshToken });
        await user.save();
        res.cookie('jwt', newRefreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.send({ accessToken, userName: user.userName, refreshToken: newRefreshToken, userInfo: user });
    } catch (error) {
        res.status(401).send({ error: 'Invalid refresh token' });
    }
}


export default {
    createAccount,
    signInAccount,
    refreshAccount
}