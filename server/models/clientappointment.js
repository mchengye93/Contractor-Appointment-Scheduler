'use strict';
module.exports = function(sequelize, DataTypes) {
  var ClientAppointment = sequelize.define('ClientAppointment', {
    clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
    startdate: {
        type: DataTypes.DATE,
        allowNull: false,
     },
     enddate: {
        type: DataTypes.DATE,
        allowNull: false,
     },
     appointmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dateId: {
         type: DataTypes.INTEGER,
         allowNull: false,
    },
  }, {
    classMethods: {
      associate: function(models) {
        ClientAppointment.belongsTo(models.User, {
          foreignKey: 'clientId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return ClientAppointment;
};