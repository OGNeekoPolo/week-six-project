'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    amount: DataTypes.INTEGER
  }, {});

  Like.associate = function(models){
    Like.belongsTo(models.Users, {as: 'user', foreignKey: 'userid'});
  };
  Like.associate = function(models){
    Like.belongsTo(models.Post, {as: 'post', foreignKey: 'postid'});
  };

  return Like;
};
