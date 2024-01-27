const { User, Activity, Currency } = require('../models');
const AccessToken = require('../helpers/accessToken');

class UserController {
  static async register(req, res, next) {
    const userData = {
      username: req.body.username,
      password: req.body.password
    };
    try {
      const user = await User.findOne({ where: { username: userData.username } });
      if (!Boolean(user)) {
        const newUser = await User.create(userData);
        const { id, username, role } = newUser;
        const newCurrency = await Currency.create({ balance: 0, UserId: id});
        res.status(201).json({ id, username, role, balance: newCurrency.balance, message: 'User is created' });
      } else {
        res.status(400).json({ message: 'User already exist' });
      }
    }
    catch (err) {
      next(err)
    };
  };

  static async registerAdmin(req, res, next) {
    const userData = {
      username: req.body.username,
      password: req.body.password,
      role: 'admin'
    };
    try {
      const user = await User.findOne({ where: { username: userData.username } });
      if (!Boolean(user)) {
        const newUser = await User.create(userData);
        const { id, username, role } = newUser;
        res.status(201).json({ id, username, role, message: 'User is created' });
      } else {
        res.status(401).json({ message: 'User already exist' });
      }
    }
    catch(err) {
      next(err)
    };
  };

  static async login(req, res, next) {
    const userData = {
      username: req.body.username,
      password: req.body.password,
    };
    try {
      const user = await User.findOne({
        where: {
          username: userData.username,
          password: userData.password
        }
      });
      if (!user) {
        res.status(401).json({ message: 'Wrong Username or Password' });
      } else {
          const payload = {
            id: user.id,
            username: user.username,
            role: user.role
          };
          const accessToken = AccessToken.generate(payload);
          res.status(200).json({ id: user.id, username: user.username, accessToken });      
      }
    }
    catch (err) {
      next(err);
    }
  };

  static async findAllUser(req, res, next) {
    const role = req.query.role || 'participant';
    try {
      const users = await User.findAll({
        where: { role }, 
        include: {
          model: Currency,
          attributes:['balance', 'updatedAt']
        }
      });
      if (!users || users.length == 0) {
        res.status(404).json({ message: 'User is not found'})
      } else {
          res.status(200).json(users);
      }
    }
    catch (err) {
      next(err);
    }
  }

  static async findUserById(req, res, next) {
    const id = req.params.id
    try {
      const user = await User.findOne({
        where: { id },
        include: [{
          model: Activity,
          attributes:['description', 'type', 'value']
        },
        {
          model: Currency,
          attributes:['balance', 'updatedAt']
        }]
      });
      if (!user) {
        res.status(404).json({ message: 'User is not found' })
      } else {
          res.status(200).json(user);
      }
    }
    catch (err) {
      next(err);
    }
  }
};

module.exports = UserController;