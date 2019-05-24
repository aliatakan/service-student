const mongoose = require('mongoose');
const students = require('./routes/students');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/mongo-exercise', { useNewUrlParser: true })
    .then(() => console.log('Mongo connection is OK!'))
    .catch(err => console.log('Mongo connection is FAILED', err));

app.use(express.json());
app.get('/', (req, res) => { res.send('Hello world\n') });
app.use('/api/students', students);

app.listen(3000, () => console.log('Server started!'));