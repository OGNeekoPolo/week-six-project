'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Posts', [
      {
        title: 'Today Was A Good Day',
        body: 'Just waking up in the morning gotta thank God. I dont know but today seems kinda odd. No barking from the dogs, no smog. And momma cooked a breakfast with no hog!!',
        createdAt: new Date(),
        updatedAt: new Date(),
        userid: 2
      },
      {
        title: 'Gin And Juice',
        body: 'With so much drama in the L-B-C, Its kinda hard bein Snoop D-O-double-G. But I, somehow, some way. Keep comin up with funky ass shit like every single day',
        createdAt: new Date(),
        updatedAt: new Date(),
        userid: 1
      },
      {
        title: 'Keep Ya Head Up',
        body: 'Some say the blacker the berry, the sweeter the juice. I say the darker the flesh, then the deeper the roots',
        createdAt: new Date(),
        updatedAt: new Date(),
        userid: 3
      }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts');
  }
};
