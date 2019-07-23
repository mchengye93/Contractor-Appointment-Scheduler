module.exports = (sequelize, DataTypes) => {
  const DateItem = sequelize.define('DateItem', {
    startdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    enddate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    clientid: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: -1,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    clientGotRated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0,
    },
    userGotRated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0,
    },
    msg: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: "",
    },
  });
  DateItem.associate = (models) => {
    DateItem.belongsTo(models.User, {
      foreignKey: 'dateId',
      onDelete: 'CASCADE',
    });
  };
  return DateItem;
};
