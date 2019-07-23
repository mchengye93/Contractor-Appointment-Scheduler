
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    paymentId:
    { type:DataTypes.STRING,
      allowNull:false,
    },
    dateId:
    { type:DataTypes.INTEGER,
      allowNull:false,
    },
    fromUserId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    toUserId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    amount: {
      type:DataTypes.DECIMAL,
      allowNull:false,
    },
    timeStamp: {
      type:DataTypes.DATE,
      allowNull:false,
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false,
    }
  });
  return Payment;
};
