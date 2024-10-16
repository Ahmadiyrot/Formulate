import mongoose from "mongoose";
import moment from "moment";

const formAnswerSchema = new mongoose.Schema({
    AnsweredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true
    },
    formOwnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Paused"],
        default: "Active"
    },
    answers: {
        type: [Object],
        default: []
    }
}, {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
});

formAnswerSchema.path('createdAt').get(function (value) {
    return moment(value).format('YYYY-MM-DD');
});

formAnswerSchema.path('updatedAt').get(function (value) {
    return moment(value).format('YYYY-MM-DD');
});

const FormAnswer = mongoose.model('FormAnswer', formAnswerSchema);

export default FormAnswer;
