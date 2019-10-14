module.exports = function(sequelize, DataTypes) {
    var Services = sequelize.define("Services", {
      service_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }, 
    });    

    Services.associate = function(models) {
      Services.belongsTo(models.ServiceCategories);
      Services.belongsToMany(models.Users, {
        through: 'UsersServicesJT'
      });
    };
    return Service;
  };
