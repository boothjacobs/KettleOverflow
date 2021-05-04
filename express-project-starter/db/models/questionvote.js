'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuestionVote = sequelize.define('QuestionVote', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    upVote: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});
  QuestionVote.associate = function(models) {
    // associations can be defined here
    QuestionVote.belongsTo(models.User, { foreignKey: 'userId' });
    QuestionVote.belongsTo(models.Question, { foreignKey: 'questionId' });
  };
  return QuestionVote;
};