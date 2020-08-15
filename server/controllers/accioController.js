const db = require('../models/accioModels');
// db now equals: pool.query(text, params, callback)

const accioController = {};

accioController.getAllItems = async (req, res, next) => {
  try {
    const string = 'SELECT item.* FROM item';
    const data = await db.query(string);
    res.locals.allItems = data.rows; // store in res.locals
    next();
  } catch (error) {
    console.log('error happened in getAllItems');
    next(error);
  }
};

accioController.getRoom = async (req, res, next) => {
  try {
    const { roomName } = req.query;
    const string = `SELECT room.* FROM room ON roomName = ${roomName}`;
    const data = await db.query(string);
    res.locals.room = data.rows; // store in res.locals
    next();
  } catch (error) {
    console.log('error happened in getRoom');
    next(error);
  }
};

accioController.getContainer = async (req, res, next) => {
  try {
    const { containerName } = req.query;
    const string = `SELECT container.* FROM container ON containerName = ${containerName}`;
    const data = await db.query(string);
    res.locals.container = data.rows; // store in res.locals
    next();
  } catch (error) {
    console.log('error happened in getContainer');
    next(error);
  }
};

accioController.getItem = async (req, res, next) => {
  try {
    const { itemName } = req.query;
    const string = `SELECT item.* FROM item ON itemName = ${itemName}`;
    const data = await db.query(string);
    res.locals.item = data.rows; // store in res.locals
    next();
  } catch (error) {
    console.log('error happened in getItem');
    next(error);
  }
};

accioController.addItem = async (req, res, next) => {
  const { name, room, container } = req.body;
  try {
    const query = {
      text: `
      INSERT INTO item (name, room, containe)
      VALUES ($1, $2, $3)
      `,
      values: [name, room, container],
    };
    const response = await db.query(query);
    // console.log('response from addItem is: ', response);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = accioController;
