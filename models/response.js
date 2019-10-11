module.exports = function(sequelize, DataTypes) {
    var Response = sequelize.define("Response", {
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
    return Response;
};
