module.exports = function(sequelize, DataTypes) {
    var Services = sequelize.define("Services", {
    //   text: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     validate: {
    //       len: [1, 140]
    //     }
    //   },
    //   complete: {
    //     type: DataTypes.BOOLEAN,
    //     defaultValue: false
    //   }
    });
    return Services;
};
