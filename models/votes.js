'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    exerpt_id: DataTypes.STRING,
    is_funny: DataTypes.BOOLEAN,
    ip: DataTypes.STRING,
    date_added: DataTypes.DATE,
    date_updated: DataTypes.DATE
  }, {
    tableName: 'votes'
  });

  return Vote;
};
