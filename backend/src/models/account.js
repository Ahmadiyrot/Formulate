import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongooseUniqueValidator from "mongoose-unique-validator";

const accountSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email must be valid');
            }
        },
        lowercase: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Password cannot contain "password"');
            }
        }
    },
    country: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true
});


accountSchema.plugin(mongooseUniqueValidator, { message: '{PATH} must be unique' });


accountSchema.statics.findByCredentials = async (email, password) => {
    const user = await Account.findOne({ email });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    return user;
};


accountSchema.methods.generateAuthToken = async function () {
    const user = this;
    const accessToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '20m' }); 
    const refreshToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_REFRESH_SECRET, { expiresIn: '60m' });
    user.tokens = user.tokens.concat({ token: refreshToken });
    await user.save();
    return { accessToken, refreshToken };
};


accountSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});


accountSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.country;
    delete userObject.gender;
    return userObject;
};


const Account = mongoose.model('Account', accountSchema);

export default Account;
