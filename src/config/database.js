const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sql12728682', 'sql12728682', '1vHwlBIldE', {
  host: 'sql12.freesqldatabase.com',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;