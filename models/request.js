var User = require('./user');
var Service = require('./service');
module.exports = function(sequelize, DataTypes) {
    var Request = sequelize.define("Request", {
      recipient_id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull: false,
        autoIncrement: true,
        unique: true
      },
      services_id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull: false,
        autoIncrement: true,
        unique: true
      },
      volunteer_id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull: false,
        autoIncrement: true,
        unique: true
      },
      detail: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }          
      },
      start_date: {
          type: DataTypes.DATE,
          allowNull: false
      },
      end_date: {
          type: DataTypes.DATE,
          allowNull: false
      }
    });
    User.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Post.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    Service.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Post.belongsTo(models.Service, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Request;
  };

