const express = require('express');
const app = express();

const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');

// Body parser
app.use(express.json());

// ROUTES
app.use('/users', userRouter);
app.use('/posts', postRouter);

module.exports = app;
