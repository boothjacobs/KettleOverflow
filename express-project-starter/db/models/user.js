'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER },
    username: DataTypes.STRING(20),
    email: DataTypes.STRING(50),
    hashed_password: DataTypes.STRING.BINARY
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};