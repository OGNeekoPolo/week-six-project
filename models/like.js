'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    amount: DataTypes.INTEGER
  }, {});


  Like.associate = function(models){
    Like.belongsTo(models.Post, {as: 'post', foreignKey: 'postid'});
    Like.belongsTo(models.Users, {as: 'user', foreignKey: 'userid'});

  };

  return Like;
};
