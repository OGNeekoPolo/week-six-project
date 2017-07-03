'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return [
        queryInterface.addColumn(
          'Likes',
          'userid',
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id'
            }
          }
        ),
        queryInterface.addColumn(
          'Likes',
          'postid',
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Posts',
              key: 'id'
            }
          }
        )
      ];
  },

  down: function (queryInterface, Sequelize) {

    return [
      queryInterface.removeColumn('Likes', 'userid'),
      queryInterface.removeColumn('Likes', 'postid')
    ];
  }
};
