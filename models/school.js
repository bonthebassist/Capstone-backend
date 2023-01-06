const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
    tutor_id: {
        type: String,
        required: true
    },
    schoolName: {
        type: String,
        required: true
    },
    schoolAdmin: [],
    usefulLinks: [],
    schoolColor: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("school", schoolSchema);