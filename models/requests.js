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
        Requests.hasMany(models.Responses);
      };
    return Requests;
  };

