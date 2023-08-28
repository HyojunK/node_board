const express = require('express');
const app = express();

const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');
const commentRouter = require('./routers/commentRouter');

// Body parser
app.use(express.json());

// ROUTES
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

module.exports = app;
