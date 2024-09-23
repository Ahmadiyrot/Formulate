import mongoose from "mongoose";

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
        enum: ["active", "paused"],
        default: "active"
    },
    questions: [{
        type: Object,
        default: {}
    }]
});

const Forms = mongoose.model('Forms', formSchema);

export default Forms;
