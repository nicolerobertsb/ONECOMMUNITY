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
    Services.hasMany(models.ProvidedServices);
    Services.hasMany(models.Requests);
  };
  return Services;
};