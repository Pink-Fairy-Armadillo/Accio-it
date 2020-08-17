const db = require('../models/accioModels');
// db now equals: pool.query(text, params, callback)

const userController = {};

userController.addUser = async (req, res, next) => {
  try {
    console.log(req.body);
    return next();
  } catch (error) {
    return next('Error in userContrller.addUser:', error);
  }
};

module.exports = userController;
