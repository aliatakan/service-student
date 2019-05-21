const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

mongoose.connect('mongodb://localhost/mongo-exercise', { useNewUrlParser: true })
    .then(() => console.log('Mongo connection is OK!'))
    .catch(err => console.log('Mongo connection is FAILED', err));

const studentSchema = new mongoose.Schema({
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
    res.send(req.params.id);
});

module.exports = router;