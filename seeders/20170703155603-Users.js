'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'OGNeekoPolo',
        email: 'nktrabue@gamil.com',
        password: 'number45',
        loggedin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'BritDaSkywalker',
        email: 'bndufinetz@gmail.com',
        password: 'rico1212',
        loggedin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'ClaytonBigsby9',
        email: 'bishop9891@gamil.com',
        password: 'btbcool91',
        loggedin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', {
      where: {
        id: {
          $contains: [1, 2, 3]
        }
      }
    });
  }
};
