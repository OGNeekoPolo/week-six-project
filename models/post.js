'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {});


  Post.assocaite = function(models){
    Post.belongsTo(models.Users, {as: 'users', foreignKey: 'userid'});
  };
  return Post;
};
