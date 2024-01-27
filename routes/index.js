const route = require('express').Router();
const userRoute = require('./users');
const activityRoute = require('./activities');

route.use('/v1/users', userRoute);
route.use('/v1/activities', activityRoute);

module.exports = route;