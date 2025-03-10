import Account from '../models/account.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';



const sendVerificationCode = async (req, res) => {
    const { email, code, userName } = req.body;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    if (!email || !code || !userName) {
        return res.status(400).send({ error: 'Email, code, and userName are required.' });
    }

    const templatePath = path.join(__dirname, '../Emails', 'EmailTemplate.html');

    let source;
    try {
        source = fs.readFileSync(templatePath, 'utf8');
    } catch (err) {
        console.error('Error reading email template:', err);
        return res.status(500).send({ error: 'Could not read email template' });
    }

    const template = handlebars.compile(source);

    const replacements = {
        userName: userName,
        code: code,
    };

    const htmlToSend = template(replacements);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_ACCOUNT_PASSWORD,
        },
    });

    let mailOptions = {
        from: `"Formulate" <${process.env.EMAIL_ACCOUNT}>`,
        to: email,
        subject: 'Verify your email address',
        html: htmlToSend,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        res.status(200).send({ status: 'Verification code sent' });
    } catch (error) {
        console.error('Error sending verification email:', error);
        res.status(500).send({ error: 'Could not send verification email' });
    }
};

const createAccount = async (req, res) => {

    const user = new Account(req.body);

    try {
        await user.save();
        const { accessToken, refreshToken } = await user.generateAuthToken();
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        res.status(201).send({ user, token: accessToken, refreshToken });
    } catch (error) {
        res.status(400).send(error);
    }
}

const signInAccount = async (req, res) => {
    try {
        const user = await Account.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken();
        res.cookie('flag', true);
        res.status(200).send({ user, token: token });
    } catch (error) {
        res.status(400).send()
    }
}

const refreshAccount = async (req, res) => {
    const refreshToken = req.cookies.jwt;

    res.clearCookie('jwt', { httpOnly: true });
    res.clearCookie('flag');
    if (!refreshToken) {
        return res.status(400).send({ error: 'Refresh token is required' });
    }
    try {

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
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
        res.cookie('flag', true);
        res.send({ accessToken, userName: user.userName, refreshToken: newRefreshToken, userInfo: user });
    } catch (error) {
        res.status(401).send({ error: 'Invalid refresh token' });
    }
}
const getAccountByUserName = async (req, res) => {
    try {
        const user = await Account.findOne({ userName: req.params.userName })
        if (!user) {
            return res.status(404).send(false)
        }
        res.status(200).send(true)
    } catch (error) {
        res.status(500).send(error)
    }
}

const sendEmail = async (req, res) => {
    try {
        sendMail(req.body.email, req.body.content, req.body.type)
        res.status(200).send({ status: true })
    } catch (error) {
        res.status(500).send({ status: false })
    }
}


export default {
    createAccount,
    signInAccount,
    refreshAccount,
    getAccountByUserName,
    sendEmail,
    sendVerificationCode
}