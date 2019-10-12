module.exports = function(sequelize, DataTypes) {
    var UserServicesJT = sequelize.define("user_services_jt", {
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
    return UserServicesJT;
};
