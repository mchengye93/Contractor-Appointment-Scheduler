'use strict';
module.exports = (sequelize, DataTypes) => {
  var appointment = sequelize.define('appointment', {
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER

  });
    appointment.associate = (models) => {
      appointment.belongsTo(models.User, {
        foreignKey: 'clientId',
        onDelete: 'CASCADE',
      });
    };

  return appointment;
};
