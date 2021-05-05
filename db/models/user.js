'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER },
    username: DataTypes.STRING(20),
    email: DataTypes.STRING(50),
    hashedPassword: DataTypes.STRING.BINARY
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Question, { foreignKey: 'userId' });
  };
  return User;
};
