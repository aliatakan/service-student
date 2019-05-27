const students = require('./routes/students');
const express = require('express');

const app = express();

require('config');
require('./startup/db')();
require('./startup/config')();

app.use(express.json());
app.use('/api/students', students);

//app.get('/', (req, res) => { res.send('Hello world\n') });
const server = app.listen(3000, () => console.log('Server started!'));

module.exports = server;