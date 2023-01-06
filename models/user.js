const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    instrument: {
        type: String
    },
    token: {
        type: String
    },
    messages: {
        invoiceReminder:"",
        invoice:"",
        lateForLesson:"",
        absentFromLesson:""
    }
});

module.exports = mongoose.model("user", userSchema);