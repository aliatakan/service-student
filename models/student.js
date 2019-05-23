const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Student = mongoose.model('student', new mongoose.Schema({
    name: { type: String, minlength: 3, required: true },
    surname: { type: String, minlength: 3, required: true },
    age: { type: Number, message: "deneme" },
    //courses: [String],
    isSuccessful: { type: Boolean, default: true },
    courses: [String]
}));


function validateStudent(student){
    const schema = {
        name: Joi.string().min(3).required(),
        surname: Joi.string().min(3).required(),
        age: Joi.number().min(5).max(15).required(),
        courses: Joi.array().required()
    }

    return Joi.validate(student, schema);
}

exports.Student = Student;
exports.validate = validateStudent;