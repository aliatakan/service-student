const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

mongoose.connect('mongodb://localhost/mongo-exercise', { useNewUrlParser: true })
    .then(() => console.log('Mongo connection is OK!'))
    .catch(err => console.log('Mongo connection is FAILED', err));

const studentSchema = new mongoose.Schema({
    name: { type: String, minlength: 3, required: true },
    surname: { type: String, minlength: 3, required: true }
});

const Students = mongoose.model('student', studentSchema);

router.get('/', async(req, res) => {
    const students = await Students.find();
    res.send(students);
});

router.get('/:id', async(req, res) => {
    if(!req.params.id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).send('Invalid ID');

    const student = await Students.findById(req.params.id);
    if(!student) return res.status(404).send(`The student with the given ID was not found`);

    res.send(student);
});

router.delete('/:id', async(req, res) => {
    if(!req.params.id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).send('Invalid ID');

    const student = await Students.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).send('The student with the given ID was not found.');
  
    res.send(student);
})

router.post('/', async(req, res) => {
    const { error } = validateStudent(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const student = new Students({ 
        name: req.body.name,
        surname: req.body.surname,
        courses: req.body.courses,
        age: req.body.age
    });

    try{
        const result = await student.save();
        console.log(result);
        res.send(result);
    }
    catch(ex){
        for(field in ex.errors)
            console.log(ex.errors[field].message);
    }
})

router.put('/:id', async(req, res) => {
    const { error } = validateStudent(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const student = await Students.findByIdAndUpdate(req.params.id, 
        { name: req.body.name, surname: req.body.surname }, 
        { new: true }
    );

    if (!student) return res.status(404).send('The student with the given ID was not found.');
    
    res.send(student);
});

function validateStudent(student){
    const schema = {
        name: Joi.string().min(3).required(),
        surname: Joi.string().min(3).required()
    }

    return Joi.validate(student, schema);
}

module.exports = router; 
