module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('DateItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      startdate: {
		  type: Sequelize.DATE,
		  allowNull: false,
	  },
	  enddate: {
		  type: Sequelize.DATE,
		  allowNull: false,
		},
      clientid: {
        allowNull: false,
        type: Sequelize.INTEGER,
		defaultValue: -1,
      },
	  msg: {
        allowNull: true,
        type: Sequelize.STRING,
		defaultValue: "",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      isPaid: {
  		  type: Sequelize.BOOLEAN,
  		  allowNull: false,
        defaultValue:false,
      },
      clientGotRated: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0,
      },
      userGotRated: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0,
      },
      dateId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'dateId',
        },
      },
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('DateItems'),
};
