const { Student, validate } = require('../models/student');
const validateObjectId = require('../utilities/validateObjectId');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const students = await Student.find().sort('name');
    res.send(students);
});

router.get('/:id', validateObjectId, async(req, res) => {
    const student = await Student.findById(req.params.id);
    if(!student) return res.status(404).send(`The student with the given ID was not found`);

    res.send(student);
});

router.delete('/:id', validateObjectId, async(req, res) => {
    const student = await Student.findByIdAndRemove(req.params.id);
    if (!student) return res.status(404).send('The student with the given ID was not found.');
  
    res.send(student);
})

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const student = new Student({ 
        name: req.body.name,
        surname: req.body.surname,
        courses: req.body.courses,
        age: req.body.age,
        isSuccessful: req.body.isSuccessful
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

router.put('/:id', validateObjectId, async(req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const student = await Student.findByIdAndUpdate(req.params.id, 
        { 
            name: req.body.name, 
            surname: req.body.surname,
            age: req.body.age
            courses: req.body.courses
        }, 
        { new: true }
    );

    if (!student) return res.status(404).send('The student with the given ID was not found.');
    
    res.send(student);
});

module.exports = router; 
