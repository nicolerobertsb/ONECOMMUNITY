module.exports = function(sequelize, DataTypes) {
    var Responses = sequelize.define("Responses", {
        approved :{
            type: DataTypes.BOOLEAN,
            defaultValue: false  
        },
        responder_rating :{
            type: DataTypes.INTEGER,
            allowNull: true,        
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
    });
    Responses.associate = function(models) {
      Responses.belongsTo(models.Requests);
      Responses.belongsTo(models.Users);
    };
    return Responses
};