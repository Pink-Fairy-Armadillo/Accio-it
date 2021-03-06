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
    res.locals.preferred_name = data.rows[0].preferred_name;

    // res.locals.userId = { userId: data.rows[0].id };
    // res.locals.preferred_name = { preferred_name: data.rows[0].preferred_name };

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
      res.locals.userId = data.rows[0].id;
      res.locals.preferred_name = data.rows[0].preferred_name;
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

accioController.resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;

    const string = `UPDATE users 
    SET password = '${newPassword}'
    WHERE email = '${email}';`;
    await db.query(string);
    next();
  } catch (error) {
    console.log('error happened in resetPassword');
    res.status(400).send('sorry, we are unable to reset your password now');
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
    // console.log(req.body);
    const { userId, item_name } = req.body;
    const infoArr = Object.keys(req.body);
    // console.log(infoArr);
    for (const eachKey of infoArr) {
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

    // const string = `SELECT DISTINCT location FROM collection_${userId} ORDER BY location ASC;`;
    // const data = await db.query(string);
    // const locationsArr = data.rows.map((obj) => obj.location);
    // res.locals.locations = locationsArr;

    const string = `SELECT * FROM collection_${userId}`;
    const data = await db.query(string);
    const dataArr = data.rows;

    const responseObj = {};

    for (const itemObj of dataArr) {
      const { location } = itemObj;
      if (!responseObj[location]) {
        responseObj[location] = { location: itemObj.location, containers: [itemObj.container], items: [itemObj.item_name] };
      } else {
        if (!responseObj[location].containers.includes(itemObj.container)) {
          responseObj[location].containers.push(itemObj.container);
        }
        responseObj[location].items.push(itemObj.item_name);
      }
    }
    
    const responseArr = Object.values(responseObj);
    // { location: String, containers: Array, items: Array }
    res.locals.locations = responseArr;
    next();
  } catch (error) {
    console.log('error happened in getLocations');
    next(error);
  }
};

accioController.getContainers = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const string = `SELECT DISTINCT container FROM collection_${userId} ORDER BY container ASC;`;
    const data = await db.query(string);
    const containersArr = data.rows.map((obj) => obj.container);

    res.locals.containers = containersArr;
    next();
  } catch (error) {
    console.log('error happened in getContainers');
    next(error);
  }
};

module.exports = accioController;
