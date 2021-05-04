'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Answers', [
    {
      content: "It is fresh air, oxygen to be specific, which robs the flavor from loose-leaf teas. Store the teas in an airtight container away from moisture and direct sunlight.",
      userId: 2,
      questionId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: "No, fine tea should not be kept in the freezer. There are strong aromas and moisture in your freezer. Tea should be stored in a closed container, out of the light. Remember that tea is a blotter and will absorb strong smells!",
      userId: 2,
      questionId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: "It is quite difficult to gauge how much caffeine is in a cup of tea, because it depends on so many factors: the tea itself, how much is used in a cup, and how long it is brewed. But the general rule is a cup of green tea contains about one-third as much caffeine as a cup of coffee, 40-60 mg per cup.",
      userId: 2,
      questionId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: "Decaffeinated tea is tea from which the caffeine has been removed, through one of two possible decaffeination processes. Herbal tea, on the other hand, is not really tea at all, but is herbs brewed in the same way that tea is brewed. Herbals, sometimes referred to as tisanes, never had any caffeine to begin with.",
      userId: 2,
      questionId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: "Oolong tea is sometimes referred to as Brown Tea, halfway between a black and green tea. In many respects it is the most complicated tea to make, because the tea is only partially oxidized. That is like keeping a banana perfectly ripe when nature wants to keep moving it toward being overripe. However the reward for all that hard work is tea with great body, and the most intense, varied aroma and flavors.",
      userId: 2,
      questionId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: "All teas originate from the same species, the Camelia Sinensis. To make green tea, the fresh tea is briefly cooked using either steam or dry heat. This process fixes the green colors and fresh flavors. Black tea leaves are left outside and become limp (withered), then put into machines that roll the leaves and damage them. The damaged leaves change color to brown, then black. This natural process is called oxidation and is similar to the ripening of a banana (from yellow to brown and finally becoming black.) After all the tea is dried, it can be shipped great distances. The oxidation process changes the flavor of the tea (now black) and gives it more body.",
      userId: 2,
      questionId: 6,
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
    return queryInterface.bulkDelete('Answers', null, {});
  }
};
