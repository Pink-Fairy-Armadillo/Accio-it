/* eslint-disable function-paren-newline */

const path = require('path');
const express = require('express');

const app = express();

const apiRouter = require('./routes/api');

const PORT = 3000;

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle requests for static files if we have
// app.use('/assets', express.static(path.resolve(__dirname, '../client/assets')));

// route handlers
app.use('/api', apiRouter);

// if (process.env.NODE_ENV === 'production') {
//   // statically serve everything in the build folder on the route '/build'
//   app.use('/build', express.static(path.join(__dirname, '../build')));
//   // respond with main app serve index.html on the route '/'
//   app.get('/', (req, res) => {
//     res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
//   });
// }

// catch-all route handler for any requests to unknown route
app.use((req, res) => res.sendStatus(404));

// express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log('errorObj.log is: ', errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
