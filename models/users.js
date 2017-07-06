'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true,

      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,
        notEmpty: true,
        len: [6, 12]
      }
    },
    loggedin: DataTypes.BOOLEAN
  }, {});

  Users.associate = function(models){
    Users.hasMany(models.Like, {as: 'like', foreignKey: 'userid'});
    Users.hasMany(models.Post, {as: 'post', foreignKey: 'userid'});
  };

  return Users;
};
