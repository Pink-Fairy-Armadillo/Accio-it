/* eslint-disable function-paren-newline */
const express = require('express');

const accioController = require('../controllers/accioController'); // middlewares
const userController = require('../controllers/userController');

const router = express.Router();

// send back userId as cookie
router.post('/addUser', accioController.addUser, (req, res) => {
  res.status(200).json(res.locals.userId);
});

// send back userId in response, if password does not match, client will receive 400
router.post('/verifyUser', accioController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.userId);
});

// get all items for user
router.get('/allItems/:userId', accioController.getAllItems, (req, res) => {
  res.status(200).json(res.locals.allItems);
});

// user adds an item
router.post('/addItem', accioController.addItem, (req, res) => {
  res.status(200).json({ message: 'success adding item to db' });
});

// user searches an item
router.get(
  '/getItem/:userId/:item_name',
  accioController.getItem,
  (req, res) => {
    res.status(200).json(res.locals.itemInfo);
  }
);

// user updates an item, data in req.body
router.patch('/updateItem', accioController.updateItem, (req, res) => {
  res.status(200).json({ message: 'success updating the item' });
});

// user deletes an item
router.delete(
  '/delete/:userId/:item_name',
  accioController.deleteItem,
  (req, res) => {
    res.status(200).json({ message: 'success deleting the item' });
  }
);

// get a list of all locations for user
router.get('/locations/:userId', accioController.getLocations, (req, res) => {
  res.status(200).json(res.locals.locations);
});

// get a list of all containers for user
router.get('/containers/:userId', accioController.getContainers, (req, res) => {
  res.status(200).json(res.locals.containers);
});

router.post('/addUser', userController.addUser, (req, res) => {
  res.status(200);
});

module.exports = router;
