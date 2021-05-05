'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        content: 'What is the best way to store loose-leaf teas?',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'Should tea be kept in the freezer?',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'How much caffeine is in green tea?',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'What is the difference between herbal tea and decaffeinated tea?',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'What is an Oolong?',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'What is green tea and black tea?',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
