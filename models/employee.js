const mongoose = require('mongoose')


const empSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        maxlength: 100
    },
    last_name: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        maxlength: 25
    },
    salary: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model("employee", empSchema)