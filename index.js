const students = require('./routes/students');
const express = require('express');

const app = express();

require('config');
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

app.use(express.json());
app.use('/api/students', students);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;