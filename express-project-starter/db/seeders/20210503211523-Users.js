'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Users', [
     {
     username: "TeaLover",
     email: "lovesTea@email.com",
     hashedPassword: "$2a$10$ucpzJCTuTRfMnA45xaES7eGtdyMgMHbtl0OSYlxxwQII4dpGC2yu6",
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
    username: "ElectricKettle",
    email: "brewer@email.com",
    hashedPassword: "$2a$10$l1//vRtY03yY8DRx0HOOnOQandgZTphhkJXeSNoE0RrhjERRtvbIm",
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
   return queryInterface.bulkDelete('Users', null, {});
  }
};
