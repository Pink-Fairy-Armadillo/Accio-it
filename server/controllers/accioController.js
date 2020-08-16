const db = require('../models/accioModels');
// db now equals: pool.query(text, params, callback)

const accioController = {};

accioController.addUser = async (req, res, next) => {
  try {
    const { email, password, preferred_name } = req.body;
    const query = {
      text: `
      INSERT INTO users (email, password, preferred_name)
      VALUES ($1, $2, $3)
      `,
      values: [email, password, preferred_name],
    };

    await db.query(query);
    const string = `SELECT * FROM users WHERE email = '${email}';`;
    const data = await db.query(string);
    console.log('userId is: ', data.rows[0].id);
    console.log('password is: ', data.rows[0].password);
    res.locals.userId = data.rows[0].id;

    const tableStr = `create table collection_${res.locals.userId} (
      id BIGSERIAL NOT NULL PRIMARY KEY,
      item_name VARCHAR(30),
      container VARCHAR(30),
      location VARCHAR(30),
      description TEXT,
      last_use DATE,
      price INT
    );`;
    await db.query(tableStr);
    next();
  } catch (error) {
    console.log('error happened in addUser: ', error);
    next(error);
  }
};

accioController.verifyUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const string = `SELECT * FROM users WHERE email = '${email}';`;
    const data = await db.query(string);
    console.log('userId is: ', data.rows[0].id);
    console.log('password is: ', data.rows[0].password);
    const passwordInDb = data.rows[0].password;
    if (passwordInDb === password) {
      res.locals.userId = { userId: data.rows[0].id };
      next();
    } else {
      console.log('password does not match');
      res.status(400).send('username does not exist or wrong password');
    }
  } catch (error) {
    console.log('error happened in verifyUser');
    res.status(400).send('username does not exist or wrong password');
    // next(error);
  }
};

accioController.getAllItems = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const string = `SELECT * FROM collection_${userId}`;
    const data = await db.query(string);
    res.locals.allItems = data.rows;
    next();
  } catch (error) {
    console.log('error happened in getAllItems');
    next(error);
  }
};

accioController.addItem = async (req, res, next) => {
  try {
    const {
      userId,
      item_name,
      container,
      location,
      description,
      last_use,
      price,
    } = req.body;
    // make sure if last_use is passed in, it is in date format '2020-08-21'

    const query = {
      text: `
      INSERT INTO collection_${userId} (item_name, container, location, description, last_use, price)
      VALUES ($1, $2, $3, $4, $5, $6)
      ;`,
      values: [item_name, location, container, description, last_use, price],
    };
    await db.query(query);
    // console.log('response from addItem is: ', response);
    next();
  } catch (err) {
    next(err);
  }
};

accioController.getItem = async (req, res, next) => {
  try {
    const { userId, item_name } = req.params;
    const string = `SELECT * FROM collection_${userId} WHERE item_name = '${item_name}';`;
    const data = await db.query(string);
    res.locals.itemInfo = data.rows;
    next();
  } catch (error) {
    console.log('error happened in getItem');
    next(error);
  }
};

accioController.updateItem = async (req, res, next) => {
  try {
    console.log(req.body);
    const { userId, item_name } = req.body;
    const infoArr = Object.keys(req.body);
    console.log(infoArr);
    for (let eachKey of infoArr) {
      if (eachKey !== 'userId' && eachKey !== 'item_name') {
        const string = `UPDATE collection_${userId} 
        SET ${eachKey} = '${req.body[eachKey]}'
        WHERE item_name = '${item_name}';`;
        await db.query(string);
      }
    }
    next();
  } catch (error) {
    console.log('error happened in updateItem');
    next(error);
  }
};

accioController.deleteItem = async (req, res, next) => {
  try {
    const { userId, item_name } = req.params;
    const string = `DELETE FROM collection_${userId} WHERE item_name = '${item_name}';`;
    await db.query(string);
    next();
  } catch (error) {
    console.log('error happened in deleteItem');
    next(error);
  }
};

accioController.getLocations = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const string = `SELECT * FROM collection_${userId};`;
    const data = await db.query(string);
    const itemsArr = data.rows;

    const locationsSet = new Set();
    for (let itemObj of itemsArr) {
      locationsSet.add(itemObj.location);
    }

    const locationsArr = Array.from([...locationsSet]);
    res.locals.locations = locationsArr;
    next();
  } catch (error) {
    console.log('error happened in getLocations');
    next(error);
  }
};

accioController.getContainers = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const string = `SELECT * FROM collection_${userId};`;
    const data = await db.query(string);
    const itemsArr = data.rows;

    const containersSet = new Set();
    for (let itemObj of itemsArr) {
      containersSet.add(itemObj.container);
    }

    const containersArr = Array.from([...containersSet]);
    res.locals.containers = containersArr;
    next();
  } catch (error) {
    console.log('error happened in getContainers');
    next(error);
  }
};

module.exports = accioController;
