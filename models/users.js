module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
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
        allowNull: true,
      },
      social_points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      historical_social_points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      }
    });

    Users.associate = function(models) {
      Users.hasMany(models.Requests);
      Users.hasMany(models.Responses);
      Users.hasMany(models.AvailableTimes);
      Users.belongsToMany(models.Services, {
        through: 'UsersServicesJT'
      });
    };
    return Users;
  };
  