const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('sys', 'root', 'blockchain', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
