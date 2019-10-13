module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      about_me: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    });

    User.associate = function(models) {
      Author.hasMany(models.Request, {
        onDelete: "cascade"
      });
    };
    User.associate = function(models) {
      Author.hasMany(models.Response, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };
  