var User = require('./user');
var Service = require('./request');
module.exports = function(sequelize, DataTypes) {
    var Response = sequelize.define("Response", {
        responder_id :{
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
            autoIncrement: true,
            unique: true            
        },
        request_id :{
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
            autoIncrement: true,
            unique: true            
        },
        approved :{
            type: DataTypes.BOOLEAN,
            allowNull: false  
        },
        responder_rating :{
            type: DataTypes.INTEGER,
            primaryKey:true,
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
    User.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Post.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    Request.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Post.belongsTo(models.Request, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Response
};