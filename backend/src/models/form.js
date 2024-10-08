import mongoose from "mongoose";
import moment from "moment";

const formSchema = new mongoose.Schema({
    formName: {
        type: String,
        required: true
    },
    formDescription: {
        type: String,
        default: ""
    },
    formOwnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Paused", "Disabled"],
        default: "active"
    },
    questions: [{
        type: Object,
        default: {}
    }],
}, {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
});


formSchema.path('createdAt').get(function (value) {
    return moment(value).format('YYYY-MM-DD');
});

const Form = mongoose.model('Form', formSchema);

export default Form;
