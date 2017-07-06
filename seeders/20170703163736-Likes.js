'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Likes', [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        userid: 1,
        postid: 2
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        userid: 3,
        postid: 2
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        userid: 3,
        postid: 1
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        userid: 1,
        postid: 3
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        userid: 3,
        postid: 3
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        userid: 2,
        postid: 3
      }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
