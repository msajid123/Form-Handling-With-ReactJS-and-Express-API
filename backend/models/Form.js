const mongoose = require('mongoose')

const formScheema = mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: 50
        },
        email: {
            type: String,
            unique: 1
        },
        password: {
            type: String,
            minLength: 8
        },
        address: {
            type: String
        },
        mobile: {
            type: String
        },
        degree: {
            type: String
        },
        hobbies: {
            type: Array,
            default: []
        },
        resume: {
            type: String
        },
        gender: {
            type: String
        }
    },
    {
        collection: 'form'
    }
)

const Form = mongoose.model('Form', formScheema)

module.exports = {Form}