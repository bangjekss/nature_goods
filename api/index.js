const express = require('express');
const { errorHandler } = require('./handlers');
// const { sequelize } = require('./models');
const { userRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).send('nature goods api'));
app.use('/user', userRouter);

app.use(errorHandler);
const API_PORT = process.env.API_PORT;
require('dotenv').config();

app.listen(API_PORT, async () => {
  // rebuild database based on models dir
  // await sequelize.sync({force: true});
  console.log(`running on ${API_PORT}`);
});
