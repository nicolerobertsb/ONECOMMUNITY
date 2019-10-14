module.exports = function(sequelize, DataTypes) {
    var Request = sequelize.define("Request", {
      // recipient_id: {
      //   type: DataTypes.INTEGER,
      //   primaryKey:true,
      //   allowNull: false,
      //   autoIncrement: true,
      //   unique: true
      // },
      // services_id: {
      //   type: DataTypes.INTEGER,
      //   primaryKey:true,
      //   allowNull: false,
      //   autoIncrement: true,
      //   unique: true
      // },
      finalized: {
        type: DataTypes.BOOLEAN,
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
    Users.associate = function(models) {
        Users.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
      Requests.associate = function(models) {
        Requests.belongsTo(models.Users);
        Requests.belongsTo(models.Services);
        Requests.hasMany(models.Responses);
      };
    return Request;
  };

