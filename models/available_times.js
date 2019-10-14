module.exports = function(sequelize, DataTypes) {
    var AvailableTimes = sequelize.define("AvailableTimes", {
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
    return AvailableTimes;
}