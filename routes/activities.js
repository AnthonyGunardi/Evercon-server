const route = require('express').Router();
const { ActivityController } = require('../controllers');
const authentication = require('../middlewares/userAuthentication');

route.post('/', ActivityController.createActivity);
route.get('/:UserId', ActivityController.findActivityByUser);

module.exports = route;