module.exports = function(sequelize, DataTypes) {
    var ProvidedServices = sequelize.define("ProvidedServices", {
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    ProvidedServices.associate = function (models) {
        ProvidedServices.belongsTo(models.Services);
        ProvidedServices.belongsTo(models.Users);
    };

    return ProvidedServices;
}