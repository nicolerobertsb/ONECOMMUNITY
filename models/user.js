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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8]
        }
      },
      about_me: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      rating: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull: true,
        autoIncrement: true,
        unique: true
      },
      social_points: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        defaultValue: 0,
      },
      historical_social_points: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        defaultValue: 0,
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
  