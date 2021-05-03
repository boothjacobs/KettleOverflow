'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = queryInterface.bulkInsert('Users', [
      {
        username: 'testUser',
        email: 'testUser@gmail.com',
        hashed_password: 'Test123!',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    return users;
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users');
  }
};
