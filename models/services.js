module.exports = function(sequelize, DataTypes) {
    var Service = sequelize.define("Service", {
      service_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }, 
    });    

    Service.associate = function(models) {
        Author.hasMany(models.Request, {
          onDelete: "cascade"
        });
      };
    return Service;
  };