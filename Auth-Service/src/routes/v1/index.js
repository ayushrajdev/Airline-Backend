const { Router } = require('express');
const userRouter = require('./user.route.js');


const v1Router = Router();

v1Router.use('/users', userRouter);

module.exports = v1Router;
