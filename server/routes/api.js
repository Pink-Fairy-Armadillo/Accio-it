/* eslint-disable function-paren-newline */
const express = require('express');

const accioController = require('../controllers/accioController'); // middlewares

const router = express.Router();

router.get('/', accioController.getAllItems, (req, res) =>
  res.status(200).json(res.locals.allItems)
);

router.get('/room/:name', accioController.getRoom, (req, res) =>
  res.status(200).json(res.locals.room)
);

router.get('/container/:containerName', accioController.getContainer, (req, res) =>
  res.status(200).json(res.locals.container)
);

router.get('/item/:itemName', accioController.getItem, (req, res) =>
  res.status(200).json(res.locals.item)
);

router.post('/item', accioController.addItem, (req, res) =>
  res.status(200).json({'success adding item to db'})
);

module.exports = router;