module.exports = function(sequelize, DataTypes) {
    var Requests = sequelize.define("Requests", {
      finalized: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      detail: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }          
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }          
      },
      hide_address: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }          
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }          
      },
      zipcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },      
      requester_rating: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      bounty_points: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      start_date: {
          type: DataTypes.DATE,
          allowNull: true
      },
      end_date: {
          type: DataTypes.DATE,
          allowNull: true
      }
    });
      Requests.associate = function(models) {
        Requests.belongsTo(models.Users);
        Requests.belongsTo(models.Services);
        Requests.belongsTo(models.ServiceCategories);
        Requests.hasMany(models.Responses);
      };
    return Requests;
  };

