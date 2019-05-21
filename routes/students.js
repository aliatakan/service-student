const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

mongoose.connect('mongodb://localhost/mongo-exercise', { useNewUrlParser: true })
    .then(() => console.log('Mongo connection is OK!'))
    .catch(err => console.log('Mongo connection is FAILED', err));

const studentSchema = new mongoose.Schema({
    id: Number,
    name: String,
    surname: String,
    courses: [String],
    age: Number,
    idate: Date,
    isSuccessful: Boolean
});

const Students = mongoose.model('student', studentSchema);

router.get('/', async(req, res) => {
    const students = await Students.find();
    res.send(students);
});

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    if(isNaN(id * 0)) return res.status(400).send('Id must be number');
    
    const student = await Students.findOne({ id: parseInt(id) });
    if(!student) return res.status(404).send(`System could not find any student with id=${req.params.id}`);

    res.send(student);
});

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    if(isNaN(id * 0)) return res.status(400).send('Id must be number');

    const student = await Students.findOneAndDelete( { id: parseInt(id) });
    if (!student) return res.status(404).send('The student with the given ID was not found.');
  
    res.send(student);
})

module.exports = router; 
