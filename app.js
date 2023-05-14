const express = require('express');
const app = express();
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth')
require('dotenv').config();


app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/users', authRouter);
app.use('/api/contacts', contactsRouter);
app.use((req, res) => {
    res.status(404).json({ message: 'not found' });
});
app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message: message });
});

module.exports = app;