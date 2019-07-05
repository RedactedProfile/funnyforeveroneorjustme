'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exerpt = sequelize.define('Exerpt', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    content: DataTypes.STRING,
    ip: DataTypes.STRING,
    date_added: DataTypes.DATE
  }, {
    tableName: 'exerpts'
  });

  return Exerpt;
};
