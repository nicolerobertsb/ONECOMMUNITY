module.exports = function(sequelize, DataTypes) {
    var Available_times = sequelize.define("Available_times", {
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
}