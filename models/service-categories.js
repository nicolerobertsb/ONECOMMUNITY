module.exports = function(sequelize, DataTypes) {
    var ServiceCategories = sequelize.define("ServiceCategories", {
        service_category_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }          
        }
    });
    ServiceCategories.associate = function (models) {
        ServiceCategories.hasMany(models.Services);
        ServiceCategories.hasMany(models.Requests);
        ServiceCategories.hasMany(models.ProvidedServices);
    };   
    return ServiceCategories; 
}