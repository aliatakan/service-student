const students = require('./routes/students');
const express = require('express');
const app = express();

app.use(express.json());
app.get('/', (req, res) => { res.send('Hello world\n') });
app.use('/api/students', students);

app.listen(3000, () => console.log('Server started!'));