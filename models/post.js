'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    body: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true
      }
    }
  }, {});

  Post.associate = function(models){
    Post.belongsTo(models.Users, {as: 'user', foreignKey: 'userid'});
    Post.hasMany(models.Like, {as: 'like', foreignKey: 'postid'});
  };
  return Post;
};
