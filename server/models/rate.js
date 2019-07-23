module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define('Rate', {
    dateId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    fromUserId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    toUserId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    review:{
      type:DataTypes.STRING,
      allowNull: false,
    }

  });
  return Rate;
};
