module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
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
    return User;
};
