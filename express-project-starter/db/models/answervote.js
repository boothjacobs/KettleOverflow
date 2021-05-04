'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnswerVote = sequelize.define('AnswerVote', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    upVote: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {});
  AnswerVote.associate = function(models) {
    // associations can be defined here
    AnswerVote.belongsTo(models.User, { foreignKey: 'userId' });
    AnswerVote.belongsTo(models.Answer, { foreignKey: 'answerId' });
  };
  return AnswerVote;
};