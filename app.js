const express = require('express');
const app = express();

const userRouter = require('./routers/userRouter');

// Body parser
app.use(express.json());

// ROUTES
app.use('/users', userRouter);

module.exports = app;
